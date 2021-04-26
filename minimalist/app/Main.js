///<reference types="arcgis-js-api" />
/*
  Copyright 2019 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/
define(["require", "exports", "tslib", "./utils/esriWidgetUtils", "ApplicationBase/support/itemUtils", "ApplicationBase/support/domHelper", "./telemetry/telemetry", "./ConfigurationSettings", "esri/core/Handles", "./ui/Layout", "./ui/MobilePanel", "./ui/Alert", "./ui/Panel", "esri/core/promiseUtils", "esri/core/watchUtils", "esri/geometry/support/jsonUtils", "esri/core/urlUtils", "esri/widgets/Search"], function (require, exports, tslib_1, esriWidgetUtils_1, itemUtils_1, domHelper_1, telemetry_1, ConfigurationSettings_1, Handles_1, Layout_1, MobilePanel_1, Alert_1, Panel_1, promiseUtils_1, watchUtils_1, jsonUtils_1, urlUtils_1, Search_1) {
    "use strict";
    telemetry_1 = tslib_1.__importDefault(telemetry_1);
    ConfigurationSettings_1 = tslib_1.__importDefault(ConfigurationSettings_1);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    Layout_1 = tslib_1.__importDefault(Layout_1);
    MobilePanel_1 = tslib_1.__importDefault(MobilePanel_1);
    Alert_1 = tslib_1.__importDefault(Alert_1);
    Panel_1 = tslib_1.__importDefault(Panel_1);
    Search_1 = tslib_1.__importDefault(Search_1);
    var Minimalist = /** @class */ (function () {
        function Minimalist() {
            this._handles = null;
            this._appConfig = null;
            this._mobilePanel = null;
            this._panel = null;
            this._telemetry = null;
            this.view = null;
            this._defaultViewRotation = 0;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        Minimalist.prototype.init = function (base) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var config, results, webMapItems, item, layout, layoutHandle;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    if (!base) {
                        console.error("ApplicationBase is not defined");
                        return [2 /*return*/];
                    }
                    this._handles = new Handles_1.default();
                    domHelper_1.setPageLocale(base.locale);
                    domHelper_1.setPageDirection(base.direction);
                    this._base = base;
                    config = base.config, results = base.results;
                    this._appConfig = new ConfigurationSettings_1.default(config);
                    this._handleTelemetry();
                    webMapItems = results.webMapItems;
                    if (config.legend && !this._appConfig.legendPanel) {
                        this._appConfig.legendPanel = config.legend;
                    }
                    this.handleThemeUpdates();
                    item = null;
                    webMapItems.forEach(function (response) {
                        var _a, _b, _c;
                        if (((_a = response === null || response === void 0 ? void 0 : response.value) === null || _a === void 0 ? void 0 : _a.id) === ((_b = _this._appConfig) === null || _b === void 0 ? void 0 : _b.webmap)) {
                            item = response.value;
                        }
                        else if (((_c = _this._appConfig) === null || _c === void 0 ? void 0 : _c.webmap) === "default") {
                            item = response.value;
                        }
                    });
                    if (!item) {
                        // show error page 
                        document.location.href = "../../shared/unavailable/index.html?appid=" + ((_a = config === null || config === void 0 ? void 0 : config.appid) !== null && _a !== void 0 ? _a : null);
                        return [2 /*return*/];
                    }
                    this._appConfig.title = this._appConfig.title
                        ? this._appConfig.title
                        : itemUtils_1.getItemTitle(item);
                    this._handles.add(watchUtils_1.init(this._appConfig, "title", domHelper_1.setPageTitle), "configuration");
                    layout = new Layout_1.default({
                        applicationBase: base,
                        applicationConfig: this._appConfig,
                        item: item,
                        container: document.getElementById("appContainer")
                    });
                    layoutHandle = layout.watch("view", function () {
                        layoutHandle.remove();
                        var view = layout.view;
                        _this.view = view;
                        _this._defaultViewRotation = _this.view.rotation || 0;
                        var find = config.find, marker = config.marker;
                        if (_this._isHoverMobile()) {
                            _this._appConfig.popupHover = false;
                        }
                        _this._handlePopupBehavior(view);
                        itemUtils_1.findQuery(find, view);
                        itemUtils_1.goToMarker(marker, view);
                        // Add widgets and side panel 
                        var widgetProps = { view: view, config: _this._appConfig, portal: base.portal, telemetry: _this._telemetry };
                        // "configure" handles are cleared if we are outside of the config experience
                        _this._handles.add([
                            watchUtils_1.init(_this._appConfig, "customUrlParam, customURLParamName", function (newValue, oldValue, propertyName) {
                                var _a, _b, _c;
                                var customUrlParam = (_b = (_a = _this._appConfig.customUrlParam) === null || _a === void 0 ? void 0 : _a.layers) === null || _b === void 0 ? void 0 : _b[0];
                                var fieldName = (_c = customUrlParam === null || customUrlParam === void 0 ? void 0 : customUrlParam.fields) === null || _c === void 0 ? void 0 : _c[0];
                                var customUrlParamName = _this._appConfig.customURLParamName;
                                if (!customUrlParam || !customUrlParamName || !fieldName) {
                                    return;
                                }
                                var layer = view.map.findLayerById(customUrlParam.id);
                                var layerSearchSource = {
                                    layer: layer,
                                    searchFields: customUrlParam.fields,
                                    outFields: ["*"],
                                    exactMatch: true,
                                    displayField: fieldName
                                };
                                var href = _this._appConfig
                                    .withinConfigurationExperience
                                    ? document.referrer
                                    : document.location.href;
                                var searchResults = urlUtils_1.urlToObject(href);
                                var searchTerm = null;
                                if (searchResults === null || searchResults === void 0 ? void 0 : searchResults.query) {
                                    if (customUrlParamName in searchResults.query) {
                                        searchTerm = searchResults.query[customUrlParamName];
                                    }
                                }
                                if (layer) {
                                    var search = new Search_1.default({
                                        view: view,
                                        resultGraphicEnabled: false,
                                        searchAllEnabled: false,
                                        includeDefaultSources: false,
                                        suggestionsEnabled: false,
                                        sources: [layerSearchSource],
                                        searchTerm: searchTerm
                                    });
                                    search.search();
                                }
                            }),
                            watchUtils_1.init(_this._appConfig, "disableScroll", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addOverlay(widgetProps);
                            }), watchUtils_1.init(_this._appConfig, "extentSelectorConfig, extentSelector", function () {
                                var _a, _b;
                                if (((_a = _this._appConfig) === null || _a === void 0 ? void 0 : _a.extentSelectorConfig) && ((_b = _this._appConfig) === null || _b === void 0 ? void 0 : _b.extentSelector)) {
                                    var constraints = _this._appConfig.extentSelectorConfig.constraints;
                                    var geometry = constraints === null || constraints === void 0 ? void 0 : constraints.geometry;
                                    if (geometry) {
                                        var extent = jsonUtils_1.fromJSON(geometry);
                                        if (extent && ((extent === null || extent === void 0 ? void 0 : extent.type) === "extent" || (extent === null || extent === void 0 ? void 0 : extent.type) === "polygon")) {
                                            constraints.geometry = extent;
                                            _this.view.goTo(extent, false).catch(function () { });
                                        }
                                    }
                                    else {
                                        constraints.geometry = null;
                                    }
                                    _this.view.constraints = constraints;
                                    _this._setMapViewRotation();
                                }
                                else {
                                    if (_this.view) {
                                        _this.view.rotation = _this._defaultViewRotation;
                                        _this.view.constraints.geometry = null;
                                        _this.view.constraints.minZoom = -1;
                                        _this.view.constraints.maxZoom = -1;
                                        _this.view.constraints.minScale = 0;
                                        _this.view.constraints.maxScale = 0;
                                    }
                                    layout === null || layout === void 0 ? void 0 : layout.viewModel.resetExtent();
                                }
                            }),
                            watchUtils_1.init(_this._appConfig, "mapZoom, mapZoomPosition", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addZoom(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "home, homePosition", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addHome(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "scalebar, scalebarPosition", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addScaleBar(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "bookmarks,bookmarksEditable, bookmarkThumbnail, bookmarksPosition", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addBookmarks(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "search, searchOpenAtStart, extentSelector, extentSelectorConfig, searchPosition,searchConfiguration", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addSearch(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "basemapToggle, basemapTogglePosition, basemapSelector, nextBasemap", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addBasemap(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "share, shareIncludeSocial, theme, header", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addShare(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "screenshot, screenshotPosition", function (newValue, oldValue, propertyName) {
                                esriWidgetUtils_1.addScreenshot(tslib_1.__assign(tslib_1.__assign({}, widgetProps), { propertyName: propertyName }));
                            }),
                        ], "configuration");
                        var shell = layout.calciteShell;
                        _this._handles.add(watchUtils_1.whenDefinedOnce(view, "widthBreakpoint", function (value) {
                            _this.createPanel(view, value, shell);
                            _this._breakpointHandle = watchUtils_1.watch(view, "widthBreakpoint", function (value) {
                                _this.createPanel(view, value, shell);
                                if ((shell === null || shell === void 0 ? void 0 : shell.contains(_this._mobilePanel)) && (shell === null || shell === void 0 ? void 0 : shell.contains(_this._panel))) {
                                    _this._breakpointHandle.remove();
                                }
                            });
                        }));
                        // cleanup when outside config panel 
                        _this._cleanUpHandles();
                    });
                    return [2 /*return*/];
                });
            });
        };
        Minimalist.prototype._openPopup = function (view, e) {
            view.popup.open({
                updateLocationEnabled: false,
                location: view.toMap(e),
                fetchFeatures: true
            });
        };
        Minimalist.prototype._isHoverMobile = function () {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
        };
        Minimalist.prototype._handlePopupBehavior = function (view) {
            var _this = this;
            var handle = null;
            var clickHandle = null;
            this._handles.add(watchUtils_1.init(this._appConfig, ["popupHover", "popupPanel"], function (value, oldVal, propertyName) {
                var _a = _this._appConfig, popupHover = _a.popupHover, popupPanel = _a.popupPanel;
                view.popup.autoCloseEnabled = true;
                if (propertyName === "popupHover" && popupHover === true && popupPanel === false) {
                    // setup popup on hover 
                    handle && handle.remove();
                    clickHandle && clickHandle.remove();
                    // create the handle 
                    view.popup.spinnerEnabled = false;
                    view.popup.autoOpenEnabled = false;
                    view.popup.defaultPopupTemplateEnabled = true;
                    var lastHitTest_1;
                    var click_1 = false;
                    handle = view.on("pointer-move", promiseUtils_1.debounce(function (e) {
                        if (lastHitTest_1)
                            clearTimeout(lastHitTest_1);
                        // if they click let's open popup and stop hover 
                        clickHandle = view.on("click", function () {
                            view.popup.autoOpenEnabled = true;
                            click_1 = true;
                            watchUtils_1.whenFalseOnce(view.popup, "visible", function () {
                                view.popup.autoOpenEnabled = false;
                                click_1 = false;
                            });
                        });
                        lastHitTest_1 = setTimeout(function () {
                            if (!click_1)
                                _this._openPopup(view, e);
                        }, 100);
                    }));
                }
                else if (popupPanel === true || popupHover === false) {
                    // disconnect click 
                    handle && handle.remove();
                    clickHandle && clickHandle.remove();
                    if (popupHover === false) {
                        if (view.popup)
                            view.popup.autoOpenEnabled = true;
                    }
                }
            }), "configuration");
        };
        Minimalist.prototype.createPanel = function (view, breakpoint, shell) {
            var props = {
                applicationConfig: this._appConfig,
                applicationBase: this._base,
                view: view
            };
            var width = (view === null || view === void 0 ? void 0 : view.width) || 701;
            if (width <= 700 && !this._mobilePanel) {
                this._mobilePanel = new MobilePanel_1.default(tslib_1.__assign(tslib_1.__assign({}, props), { container: document.createElement("div") })).container;
                if (!(shell === null || shell === void 0 ? void 0 : shell.contains(this._mobilePanel)))
                    shell.appendChild(this._mobilePanel);
                this._mobilePanel.classList.add("mobile-shell-panel");
            }
            else if (!this._panel) {
                this._panel = new Panel_1.default(tslib_1.__assign(tslib_1.__assign({}, props), { container: document.createElement("calcite-shell-panel") })).container;
                if (!(shell === null || shell === void 0 ? void 0 : shell.contains(this._panel)))
                    shell === null || shell === void 0 ? void 0 : shell.appendChild(this._panel);
                this._panel.classList.add("desktop-shell-panel");
            }
        };
        Minimalist.prototype.updateAppTheme = function (theme) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var style;
                return tslib_1.__generator(this, function (_a) {
                    style = document.getElementById("esri-stylesheet");
                    style.href = style.href.indexOf("light") !== -1 ? style.href.replace(/light/g, theme) : style.href.replace(/dark/g, theme);
                    return [2 /*return*/];
                });
            });
        };
        Minimalist.prototype.handleThemeUpdates = function () {
            var _this = this;
            // Check for a preferred color scheme and then
            // monitor updates to that color scheme and the
            // configuration panel updates.
            // Also todo on app name info going to GA
            if (!this._appConfig.theme) {
                this._appConfig.theme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";
            }
            this._handles.add(watchUtils_1.init(this._appConfig, "theme", this.updateAppTheme), "configuration");
            this._handles.add(watchUtils_1.init(this._appConfig, "customCSS", function (newValue, oldValue, propertyName) {
                _this._handleCustomCSS();
            }));
        };
        Minimalist.prototype.createTelemetry = function () {
            var _a, _b, _c;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var portal, appName, _d;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            portal = this._base.portal;
                            appName = (_b = (_a = this._base.config) === null || _a === void 0 ? void 0 : _a.telemetry) === null || _b === void 0 ? void 0 : _b.name;
                            _d = this;
                            return [4 /*yield*/, telemetry_1.default.init({ portal: portal, config: this._appConfig, appName: appName })];
                        case 1:
                            _d._telemetry = _e.sent();
                            (_c = this._telemetry) === null || _c === void 0 ? void 0 : _c.logPageView();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Minimalist.prototype._handleTelemetry = function () {
            var _this = this;
            // Wait until both are defined
            promiseUtils_1.eachAlways([watchUtils_1.whenDefinedOnce(this._appConfig, "googleAnalytics"),
                watchUtils_1.whenDefinedOnce(this._appConfig, "googleAnalyticsKey"),
                watchUtils_1.whenDefinedOnce(this._appConfig, "googleAnalyticsConsentMsg"),
                watchUtils_1.whenDefinedOnce(this._appConfig, "googleAnalyticsConsent")]).then(function () {
                var alertContainer = document.createElement("container");
                document.body.appendChild(alertContainer);
                new Alert_1.default({ config: _this._appConfig, container: alertContainer });
                _this.createTelemetry();
                _this._handles.add([
                    watchUtils_1.watch(_this._appConfig, ["googleAnalytics", "googleAnalyticsConsent", "googleAnalyticsConsentMsg", "googleAnalyticsKey"], function (newValue, oldValue, propertyName) {
                        _this.createTelemetry();
                    })
                ]);
            });
        };
        Minimalist.prototype._handleCustomCSS = function () {
            var customCSSStyleSheet = document.getElementById("customCSS");
            if (customCSSStyleSheet) {
                customCSSStyleSheet.remove();
            }
            var styles = document.createElement("style");
            styles.id = "customCSS";
            styles.type = "text/css";
            var styleTextNode = document.createTextNode(this._appConfig.customCSS);
            styles.appendChild(styleTextNode);
            document.head.appendChild(styles);
        };
        Minimalist.prototype._cleanUpHandles = function () {
            // if we aren't in the config experience remove all handlers after load
            if (!this._appConfig.withinConfigurationExperience) {
                this._handles.remove("configuration");
            }
        };
        Minimalist.prototype._setMapViewRotation = function () {
            var _a, _b, _c, _d, _e;
            var view = this.view;
            var mapRotation = (_d = (_c = (_b = (_a = this._appConfig) === null || _a === void 0 ? void 0 : _a.extentSelectorConfig) === null || _b === void 0 ? void 0 : _b.mapRotation) !== null && _c !== void 0 ? _c : this._defaultViewRotation) !== null && _d !== void 0 ? _d : null;
            if (!((_e = view === null || view === void 0 ? void 0 : view.constraints) === null || _e === void 0 ? void 0 : _e.rotationEnabled)) { // if rotation is disabled
                view.constraints.rotationEnabled = true; // set rotation to enabled
                view.rotation = mapRotation; // set rotation value
                view.constraints.rotationEnabled = false; // set rotation back to disabled
            }
            else {
                if (view)
                    view.rotation = mapRotation;
            }
        };
        return Minimalist;
    }());
    return Minimalist;
});
