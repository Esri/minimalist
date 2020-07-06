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
define(["require", "exports", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "../Error", "../../application-base-js/support/itemUtils"], function (require, exports, Accessor, decorators_1, Error_1, itemUtils_1) {
    "use strict";
    Error_1 = __importDefault(Error_1);
    var LayoutViewModel = /** @class */ (function (_super) {
        __extends(LayoutViewModel, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function LayoutViewModel(props) {
            var _this = _super.call(this, props) || this;
            _this.view = null;
            return _this;
        }
        Object.defineProperty(LayoutViewModel.prototype, "state", {
            get: function () {
                var ready = this.get("view.ready");
                var loading = this.get("item.loadStatus") === "loaded" ? false : true;
                if (!this.item) {
                    return "error";
                }
                else {
                    return ready && !loading ? "ready" : "loading";
                }
            },
            enumerable: false,
            configurable: true
        });
        LayoutViewModel.prototype.createMap = function (container) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var portalItem, appProxies, defaultViewProperties, mapContainer, components, viewProperties, _b, minScale, maxScale, map, _c, e_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!this.item) {
                                return [2 /*return*/, new Error_1.default({
                                        title: "Error",
                                        message: "Could not load an item to display",
                                        container: container
                                    })];
                            }
                            portalItem = this.applicationBase.results
                                .applicationItem.value;
                            appProxies = (portalItem === null || portalItem === void 0 ? void 0 : portalItem.applicationProxies) ? portalItem.applicationProxies
                                : null;
                            defaultViewProperties = itemUtils_1.getConfigViewProperties(this.applicationConfig);
                            mapContainer = {
                                container: container
                            };
                            components = ["attribution"];
                            viewProperties = __assign(__assign(__assign({}, defaultViewProperties), { ui: { components: components } }), mapContainer);
                            _b = this.applicationConfig, minScale = _b.minScale, maxScale = _b.maxScale;
                            if (minScale || maxScale) {
                                viewProperties.constraints = {
                                    minScale: minScale !== null && minScale !== void 0 ? minScale : 0,
                                    maxScale: maxScale !== null && maxScale !== void 0 ? maxScale : 0
                                };
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, itemUtils_1.createMapFromItem({
                                    item: this.item,
                                    appProxies: appProxies
                                })];
                        case 2:
                            map = (_d.sent());
                            _c = this;
                            return [4 /*yield*/, itemUtils_1.createView(__assign(__assign({}, viewProperties), { map: map }))];
                        case 3:
                            _c.view = (_d.sent());
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _d.sent();
                            return [2 /*return*/, new Error_1.default({
                                    title: "Error",
                                    message: "Unable to load " + (((_a = this === null || this === void 0 ? void 0 : this.item) === null || _a === void 0 ? void 0 : _a.title) || " the application"),
                                    container: container
                                })];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            decorators_1.property({ dependsOn: ["view.ready", "item.loadStatus"], readOnly: true })
        ], LayoutViewModel.prototype, "state", null);
        __decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "applicationConfig", void 0);
        __decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "applicationBase", void 0);
        __decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "item", void 0);
        __decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "view", void 0);
        LayoutViewModel = __decorate([
            decorators_1.subclass("esri.demo.LayoutViewModel")
        ], LayoutViewModel);
        return LayoutViewModel;
    }((Accessor)));
    return LayoutViewModel;
});
//# sourceMappingURL=LayoutViewModel.js.map