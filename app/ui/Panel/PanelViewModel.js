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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
define(["require", "exports", "esri/core/Accessor", "dojo/i18n!../../nls/resources", "esri/core/accessorSupport/decorators", "../FeatureList"], function (require, exports, Accessor, i18n, decorators_1, FeatureList_1) {
    "use strict";
    FeatureList_1 = __importDefault(FeatureList_1);
    var PanelViewModel = /** @class */ (function (_super) {
        __extends(PanelViewModel, _super);
        function PanelViewModel(props) {
            var _this = _super.call(this, props) || this;
            _this.actions = [];
            _this.view = null;
            _this.calcitePanel = null;
            return _this;
        }
        PanelViewModel.prototype.createDetails = function (container) {
            var _this = this;
            var _a = this.applicationConfig, detailsContent = _a.detailsContent, withinConfigurationExperience = _a.withinConfigurationExperience;
            var map = this.view.map;
            var content = detailsContent ||
                map.portalItem.description ||
                null;
            var detailDiv = document.createElement("div");
            detailDiv.innerHTML = content;
            if (withinConfigurationExperience) {
                // update content if within config experience
                this.applicationConfig.watch("detailsContent", function () {
                    detailDiv.innerHTML = _this.applicationConfig.detailsContent;
                });
            }
            return container.append(detailDiv);
        };
        PanelViewModel.prototype.createLegend = function (container) {
            return __awaiter(this, void 0, void 0, function () {
                var legendDiv, Legend;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            legendDiv = document.createElement("div");
                            container.append(legendDiv);
                            return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/Legend"], resolve_1, reject_1); }).then(__importStar)];
                        case 1:
                            Legend = _a.sent();
                            return [2 /*return*/, new Legend.default({
                                    view: this.view,
                                    style: this.applicationConfig.layoutType === "horizontal" ? {
                                        type: "card",
                                        layout: "auto"
                                    } : "classic",
                                    container: container
                                })];
                    }
                });
            });
        };
        PanelViewModel.prototype.createPopup = function (container) {
            container.classList.add("popup-container");
            var featureList = new FeatureList_1.default({
                applicationConfig: this.applicationConfig,
                view: this.view,
                container: container
            });
            return featureList;
        };
        PanelViewModel.prototype.createActions = function () {
            var _a = this.applicationConfig, legendPanel = _a.legendPanel, details = _a.details, activePanel = _a.activePanel, popupPanel = _a.popupPanel;
            var actions = [];
            if (legendPanel) {
                actions.push({
                    key: "legendPanel",
                    icon: "legend",
                    name: i18n.tools.legend,
                    label: i18n.tools.legend,
                    active: activePanel === "legendPanel" ? true : false
                });
            }
            // if legend is already active don't make details active
            if (details) {
                actions.push({
                    key: "details",
                    icon: "information",
                    name: i18n.tools.details,
                    label: i18n.tools.details,
                    active: activePanel === "details" ? true : false
                });
            }
            // if legend or details is already open don't make popup active 
            if (popupPanel) {
                actions.push({
                    key: "popup",
                    icon: "popup",
                    name: i18n.tools.popup,
                    label: i18n.tools.popup,
                    active: activePanel === "popupPanel" ? true : false
                });
            }
            this.actions = actions;
        };
        PanelViewModel.prototype.actionItemClicked = function (e) {
            var _a;
            // the panels are empty 
            var activeAction = e === null || e === void 0 ? void 0 : e.target;
            var name = (_a = activeAction === null || activeAction === void 0 ? void 0 : activeAction.dataset) === null || _a === void 0 ? void 0 : _a.actionItem;
            this.actions.forEach(function (action) {
                if (name === action.key) {
                    action.active = !activeAction.active;
                }
                else { // hide others 
                    action.active = false;
                }
            });
            // Collapse the panel if there aren't any active tools
            var isActive = this.actions.some(function (a) {
                return a.active;
            });
            this.calcitePanel.collapsed = isActive ? false : true;
        };
        PanelViewModel.prototype.createActionClickFunction = function (action) {
            var clickFunction = null;
            switch (action.key) {
                case "legendPanel":
                    clickFunction = this.createLegend;
                    break;
                case "details":
                    clickFunction = this.createDetails;
                    break;
                case "popup":
                    clickFunction = this.createPopup;
                    break;
            }
            return clickFunction;
        };
        PanelViewModel.prototype.updatePadding = function () {
            var _a, _b;
            var _c, _d;
            if (this.view.widthBreakpoint !== "xsmall") {
                var layoutType = this.applicationConfig.layoutType;
                // are we RTL if so flip left to right 
                var flipDir = ((_c = this.applicationBase) === null || _c === void 0 ? void 0 : _c.direction) === "rtl" ? true : false;
                //if (this.calcitePanel?.classList.contains("hide")) return;
                var offset = 0;
                if (this === null || this === void 0 ? void 0 : this.calcitePanel) {
                    offset = ((_d = this.calcitePanel) === null || _d === void 0 ? void 0 : _d.classList.contains("hide")) ? 0 : this.calcitePanel.offsetWidth;
                }
                if (layoutType !== "horizontal") {
                    this.view.padding = __assign(__assign({}, this.view.padding), (_a = {}, _a[flipDir ? "right" : "left"] = offset, _a.bottom = 0, _a));
                }
                else {
                    this.view.padding = __assign(__assign({}, this.view.padding), (_b = {}, _b[flipDir ? "right" : "left"] = 0, _b.bottom = 0, _b));
                }
            }
        };
        __decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "applicationConfig", void 0);
        __decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "applicationBase", void 0);
        __decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "actions", void 0);
        __decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "calcitePanel", void 0);
        PanelViewModel = __decorate([
            decorators_1.subclass("esri.demo.PanelViewModel")
        ], PanelViewModel);
        return PanelViewModel;
    }((Accessor)));
    return PanelViewModel;
});
//# sourceMappingURL=PanelViewModel.js.map