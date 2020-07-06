var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "esri/widgets/Feature", "esri/core/promiseUtils", "esri/widgets/Widget", "dojo/i18n!../nls/resources"], function (require, exports, decorators_1, watchUtils_1, widget_1, Feature_1, promiseUtils_1, Widget_1, i18n) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Feature_1 = __importDefault(Feature_1);
    Widget_1 = __importDefault(Widget_1);
    var FeatureList = /** @class */ (function (_super) {
        __extends(FeatureList, _super);
        function FeatureList(props) {
            var _this = _super.call(this, props) || this;
            _this.features = [];
            _this._clickHandle = null;
            return _this;
        }
        FeatureList.prototype.initialize = function () {
            var _this = this;
            this.own([watchUtils_1.init(this, ["applicationConfig.popupPanel", "applicationConfig.popupHover", "view.widthBreakpoint"], function () {
                    var _a;
                    var _b = _this.applicationConfig, popupPanel = _b.popupPanel, popupHover = _b.popupHover;
                    if (popupPanel || ((_a = _this === null || _this === void 0 ? void 0 : _this.view) === null || _a === void 0 ? void 0 : _a.widthBreakpoint) === "xsmall") {
                        _this.view.popup.autoOpenEnabled = false;
                        _this.view.popup.highlightEnabled = false;
                        if (!_this._clickHandle) {
                            // If popup hover is enabled use pointer-move otherwise click
                            var timeoutAmt_1 = 0;
                            var clickType_1 = "click";
                            if (popupHover) {
                                clickType_1 = "pointer-move";
                                timeoutAmt_1 = 85;
                            }
                            var lastHitTest_1;
                            watchUtils_1.whenOnce(_this, "view.ready", function () {
                                if (lastHitTest_1)
                                    clearTimeout(lastHitTest_1);
                                lastHitTest_1 = setTimeout(function () {
                                    _this._clickHandle = _this.view.on(clickType_1, promiseUtils_1.debounce(function (event) { return __awaiter(_this, void 0, void 0, function () {
                                        var point, response, results;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    this.features = null;
                                                    this.clearHighlight();
                                                    ;
                                                    point = (event === null || event === void 0 ? void 0 : event.screenPoint) ? event.screenPoint : { x: event.x, y: event.y };
                                                    return [4 /*yield*/, this.view.popup.fetchFeatures(point)];
                                                case 1:
                                                    response = _a.sent();
                                                    return [4 /*yield*/, response.allGraphicsPromise];
                                                case 2:
                                                    results = _a.sent();
                                                    if (clickType_1 === "pointer-move") {
                                                        if (results && results.length && results.length > 0) {
                                                            results = [results[0]];
                                                        }
                                                    }
                                                    this.displayResults(results);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }));
                                }, timeoutAmt_1);
                            });
                        }
                    }
                    else {
                        _this._cleanUp();
                    }
                }), watchUtils_1.init(this, "selectedItem", function () {
                    _this.clearHighlight();
                    if (_this.selectedItem && _this.view) {
                        _this.view.whenLayerView(_this.selectedItem.layer).then(function (layerview) {
                            if (layerview.highlight) {
                                _this.highlightHandle = layerview.highlight(_this.selectedItem);
                            }
                        });
                    }
                })]);
        };
        FeatureList.prototype._cleanUp = function () {
            if ((this === null || this === void 0 ? void 0 : this.view) && this.view.widthBreakpoint !== "xsmall") {
                this.view.popup.autoOpenEnabled = true;
                this.view.popup.highlightEnabled = true;
            }
            this.features = null;
            this.clearHighlight();
        };
        FeatureList.prototype.displayResults = function (results) {
            var _a, _b;
            this.features = results;
            // open the popup action panel if not already open 
            // Find the desktop or mobile popup action 
            var actionExpression = this.view.widthBreakpoint === "xsmall" ? "calcite-radio-group-item[data-action-item='popup']" : "calcite-action[data-action-item='popup']";
            var action = document.querySelector(actionExpression);
            if (!action) {
                //Not mobile or popup panel so clean up
                this._cleanUp();
                return;
            }
            var notActive = (this.view.widthBreakpoint === "xsmall") ? !action.hasAttribute("checked") : !action.hasAttribute("active");
            if (((_a = this.features) === null || _a === void 0 ? void 0 : _a.length) > 0 && action && notActive) {
                action.click();
            }
            ;
            // highlight feature 
            if (((_b = this.features) === null || _b === void 0 ? void 0 : _b.length) > 0)
                this.selectedItem = this.features[0];
        };
        FeatureList.prototype.render = function () {
            var _a, _b;
            var featureList = ((_a = this.features) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.renderFeatures() : null;
            var noResultsMessage = ((_b = this.features) === null || _b === void 0 ? void 0 : _b.length) === 0 ? true : false;
            var message = null;
            if (noResultsMessage) {
                if (this.applicationConfig.popupPanel && this.applicationConfig.popupHover) {
                    message = i18n.popupPanel.noResultsHoverMessage;
                }
                else {
                    message = i18n.popupPanel.noResultsMessage;
                }
            }
            return (widget_1.tsx("div", null,
                featureList,
                message));
        };
        FeatureList.prototype.renderFeatures = function () {
            var _this = this;
            return this.features.map(function (feature, index) {
                return widget_1.tsx("calcite-block", { key: "feature" + index, open: index == 0 ? true : false, bind: _this, class: (index === 0 && _this.features.length > 1) ? "active-popup" : null, collapsible: _this.features.length > 1 ? true : false, "data-feature": feature, afterCreate: _this.createFeature });
            });
        };
        FeatureList.prototype.createFeature = function (container) {
            var _this = this;
            var graphic = container['data-feature'];
            if (graphic && graphic.popupTemplate) {
                graphic.popupTemplate.outFields = ["*"];
            }
            var feature = new Feature_1.default({
                graphic: graphic,
                defaultPopupTemplateEnabled: true,
                map: this.view.map,
                spatialReference: this.view.spatialReference,
                visibleElements: {
                    title: false
                },
                container: container
            });
            // add zoom button 
            var zoomButton = document.createElement("calcite-button");
            zoomButton.color = this.applicationConfig.theme;
            zoomButton.theme = this.applicationConfig.theme;
            zoomButton.classList.add("zoom-button");
            zoomButton.scale = "xs";
            zoomButton.innerHTML = "<calcite-icon scale=\"s\"  icon=\"magnifyingGlass\"></calcite-icon>";
            zoomButton.addEventListener("click", function () {
                if (_this.view && graphic) {
                    _this.view.goTo(graphic);
                }
            });
            container.append(zoomButton);
            // handle click on feature 
            container.addEventListener("click", function () {
                _this.clearHighlight();
                _this.selectedItem = graphic;
                // activate item 
                _this.activateItem(container);
                _this.view.whenLayerView(graphic === null || graphic === void 0 ? void 0 : graphic.layer).then(function (layerView) {
                    if (layerView === null || layerView === void 0 ? void 0 : layerView.highlight) {
                        _this.highlightHandle = layerView.highlight(graphic);
                    }
                });
            });
            // add title 
            watchUtils_1.once(feature, "title", function () {
                var title = feature.get("title");
                if (title) {
                    container.summary = title.replace(/<[^>]+>/g, '');
                }
            });
        };
        FeatureList.prototype.activateItem = function (container) {
            // highlight selected popup feature and remove others 
            var elements = document.getElementsByClassName("active-popup");
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active-popup");
            }
            // if (elements?.length > 1) {
            container.classList.add("active-popup");
            // }
        };
        FeatureList.prototype.clearHighlight = function () {
            if (this.highlightHandle) {
                try {
                    this.highlightHandle.remove();
                }
                catch (error) {
                }
            }
        };
        FeatureList.prototype.destroy = function () {
            this.highlightHandle && this.highlightHandle.remove();
            this._clickHandle && this._clickHandle.remove();
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["applicationConfig.popupPanel"])
        ], FeatureList.prototype, "applicationConfig", void 0);
        __decorate([
            decorators_1.property()
        ], FeatureList.prototype, "view", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], FeatureList.prototype, "features", void 0);
        __decorate([
            decorators_1.property()
        ], FeatureList.prototype, "selectionCount", void 0);
        __decorate([
            decorators_1.property()
        ], FeatureList.prototype, "selectedItem", void 0);
        __decorate([
            decorators_1.property()
        ], FeatureList.prototype, "highlightHandle", void 0);
        FeatureList = __decorate([
            decorators_1.subclass("FeatureList")
        ], FeatureList);
        return FeatureList;
    }((Widget_1.default)));
    exports.default = FeatureList;
});
//# sourceMappingURL=FeatureList.js.map