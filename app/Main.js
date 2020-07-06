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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./utils/esriWidgetUtils", "./application-base-js/support/itemUtils", "./application-base-js/support/domHelper", "./ConfigurationSettings", "esri/core/Handles", "./ui/Layout", "./ui/MobilePanel", "./ui/Panel", "esri/core/promiseUtils", "esri/core/watchUtils"], function (require, exports, esriWidgetUtils_1, itemUtils_1, domHelper_1, ConfigurationSettings_1, Handles_1, Layout_1, MobilePanel_1, Panel_1, promiseUtils_1, watchUtils_1) {
    "use strict";
    ConfigurationSettings_1 = __importDefault(ConfigurationSettings_1);
    Handles_1 = __importDefault(Handles_1);
    Layout_1 = __importDefault(Layout_1);
    MobilePanel_1 = __importDefault(MobilePanel_1);
    Panel_1 = __importDefault(Panel_1);
    var CalciteWebpackConfigApp = /** @class */ (function () {
        function CalciteWebpackConfigApp() {
            this._handles = null;
            this._appConfig = null;
            this._mobilePanel = null;
            this._panel = null;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        CalciteWebpackConfigApp.prototype.init = function (base) {
            return __awaiter(this, void 0, void 0, function () {
                var config, results, webMapItems, item, layout;
                var _this = this;
                return __generator(this, function (_a) {
                    if (!base) {
                        console.error("ApplicationBase is not defined");
                        return [2 /*return*/];
                    }
                    this._handles = new Handles_1.default();
                    domHelper_1.setPageLocale(base.locale);
                    domHelper_1.setPageDirection(base.direction);
                    this._base = base;
                    config = base.config, results = base.results;
                    webMapItems = results.webMapItems;
                    this._appConfig = new ConfigurationSettings_1.default(config);
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
                    if (item) {
                        this._appConfig.title = this._appConfig.title
                            ? this._appConfig.title
                            : itemUtils_1.getItemTitle(item);
                        this._handles.add(watchUtils_1.init(this._appConfig, "title", domHelper_1.setPageTitle), "configuration");
                    }
                    layout = new Layout_1.default({
                        applicationBase: base,
                        applicationConfig: this._appConfig,
                        item: item,
                        container: document.getElementById("appContainer")
                    });
                    layout.watch("view", function () {
                        var view = layout.view;
                        var find = config.find, marker = config.marker;
                        _this._handlePopupBehavior(view);
                        _this.createPanel(view);
                        itemUtils_1.findQuery(find, view);
                        itemUtils_1.goToMarker(marker, view);
                        // Add widgets and side panel 
                        var widgetProps = { view: view, config: _this._appConfig, portal: base.portal };
                        // "configure" handles are cleared if we are outside of the config experience
                        _this._handles.add([
                            watchUtils_1.init(_this._appConfig, "disableScroll", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addOverlay(widgetProps);
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
                            watchUtils_1.init(_this._appConfig, "bookmarks,bookmarksEditable, bookmarksPosition", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addBookmarks(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "search, searchOpenAtStart, searchPosition,searchConfiguration", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addSearch(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "basemapToggle, basemapTogglePosition, nextBasemap", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addBasemap(widgetProps);
                            }),
                            watchUtils_1.init(_this._appConfig, "share, shareIncludeSocial, theme, header", function (newValue, oldValue, propertyName) {
                                widgetProps.propertyName = propertyName;
                                esriWidgetUtils_1.addShare(widgetProps);
                            })
                        ], "configuration");
                        // These handles are needed inside and outside the config panel
                        _this._handles.add(watchUtils_1.init(view, "widthBreakpoint", promiseUtils_1.debounce(function () {
                            _this.updatePanel(view, layout.calciteShell);
                        })));
                        // cleanup when outside config panel 
                        _this._cleanUpHandles();
                    });
                    return [2 /*return*/];
                });
            });
        };
        CalciteWebpackConfigApp.prototype._handlePopupBehavior = function (view) {
            var _this = this;
            view.popup.autoCloseEnabled = true;
            var handle = null;
            this._handles.add(watchUtils_1.init(this._appConfig, ["popupHover", "popupPanel"], function (value, oldVal, propertyName) {
                var _a = _this._appConfig, popupHover = _a.popupHover, popupPanel = _a.popupPanel;
                if (propertyName === "popupHover" && popupHover === true && popupPanel === false) {
                    // setup popup on hover 
                    handle && handle.remove();
                    var lastHitTest_1;
                    // create the handle 
                    handle = view.on("pointer-move", promiseUtils_1.debounce(function (e) {
                        if (lastHitTest_1)
                            clearTimeout(lastHitTest_1);
                        lastHitTest_1 = setTimeout(function () {
                            view.popup.fetchFeatures(e).then(function (response) {
                                var location = view.toMap(e);
                                response.allGraphicsPromise.then(function (graphics) {
                                    if (graphics && graphics.length && graphics.length > 0) {
                                        view.popup.open({
                                            location: location,
                                            features: graphics,
                                            updateLocationEnabled: false
                                        });
                                    }
                                });
                            });
                        }, 85);
                    }));
                }
                else if (popupPanel === true || popupHover === false) {
                    // disconnect click 
                    handle && handle.remove();
                }
            }), "configuration");
        };
        CalciteWebpackConfigApp.prototype.createPanel = function (view) {
            var props = {
                applicationConfig: this._appConfig,
                applicationBase: this._base,
                view: view
            };
            var isMobile = view.widthBreakpoint === "xsmall" ? true : false;
            if (isMobile && !this._mobilePanel) {
                this._mobilePanel = new MobilePanel_1.default(__assign(__assign({}, props), { container: document.createElement("div") })).container;
            }
            else if (!isMobile && !this._panel) {
                this._panel = new Panel_1.default(__assign(__assign({}, props), { container: document.createElement("calcite-shell-panel") })).container;
            }
        };
        CalciteWebpackConfigApp.prototype.updatePanel = function (view, shell) {
            var breakpoint = view.widthBreakpoint;
            if (breakpoint === "xsmall" && !shell.contains(this._mobilePanel)) {
                if (shell.contains(this._panel))
                    shell.removeChild(this._panel);
                // Create mobile panel if we don't have it 
                if (!this._mobilePanel)
                    this.createPanel(view);
                shell.appendChild(this._mobilePanel);
            }
            else if (breakpoint !== "xsmall" && !shell.contains(this._panel)) {
                if (shell.contains(this._mobilePanel)) {
                    shell.removeChild(this._mobilePanel);
                }
                ;
                // Create full size panel if we don't have it 
                if (!this._panel)
                    this.createPanel(view);
                shell.appendChild(this._panel);
            }
        };
        CalciteWebpackConfigApp.prototype.updateAppTheme = function (theme) {
            return __awaiter(this, void 0, void 0, function () {
                var style;
                return __generator(this, function (_a) {
                    style = document.getElementById("esri-stylesheet");
                    style.href = style.href.indexOf("light") !== -1 ? style.href.replace(/light/g, theme) : style.href.replace(/dark/g, theme);
                    return [2 /*return*/];
                });
            });
        };
        CalciteWebpackConfigApp.prototype.handleThemeUpdates = function () {
            // Check for a preferred color scheme and then
            // monitor updates to that color scheme and the
            // configuration panel updates.
            if (!this._appConfig.theme) {
                this._appConfig.theme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";
            }
            this._handles.add(watchUtils_1.init(this._appConfig, "theme", this.updateAppTheme), "configuration");
        };
        CalciteWebpackConfigApp.prototype._cleanUpHandles = function () {
            // if we aren't in the config experience remove all handlers after load
            if (!this._appConfig.withinConfigurationExperience) {
                this._handles.remove("configuration");
            }
        };
        return CalciteWebpackConfigApp;
    }());
    return CalciteWebpackConfigApp;
});
//# sourceMappingURL=Main.js.map