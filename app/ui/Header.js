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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./Share/Share", "./Share/Share/ShareFeatures", "esri/widgets/Widget"], function (require, exports, decorators_1, watchUtils_1, widget_1, Share_1, ShareFeatures_1, Widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Share_1 = __importDefault(Share_1);
    ShareFeatures_1 = __importDefault(ShareFeatures_1);
    Widget_1 = __importDefault(Widget_1);
    var CSS = {
        base: "embed-app__header",
        logo: "embed-app__header__logo",
        heading: "heading"
    };
    var Header = /** @class */ (function (_super) {
        __extends(Header, _super);
        function Header(props) {
            var _this = _super.call(this, props) || this;
            _this._shareWidget = null;
            _this._applySharedTheme = false;
            return _this;
        }
        Header.prototype.initialize = function () {
            var _this = this;
            this.own([watchUtils_1.whenOnce(this, "view.ready", function () { return __awaiter(_this, void 0, void 0, function () {
                    var shareIncludeSocial, shareFeatures;
                    return __generator(this, function (_a) {
                        shareIncludeSocial = this.applicationConfig.shareIncludeSocial;
                        if (!this._shareWidget) {
                            shareFeatures = new ShareFeatures_1.default({
                                copyToClipboard: true,
                                embedMap: false,
                                shareServices: shareIncludeSocial
                            });
                            this._shareWidget = new Share_1.default({
                                view: this.view,
                                shareFeatures: shareFeatures,
                                container: document.createElement("div"),
                                isDefault: true
                            });
                        }
                        return [2 /*return*/];
                    });
                }); }), watchUtils_1.init(this, ["sharedTheme.text", "sharedTheme.background", "applicationConfig.header", "applicationConfig.theme", "applicationConfig.applySharedTheme"], function () {
                    var _a, _b;
                    var _c = _this.applicationConfig, theme = _c.theme, applySharedTheme = _c.applySharedTheme, header = _c.header;
                    var existingSheet = document.getElementById("customSheet");
                    _this._applySharedTheme = applySharedTheme;
                    if (existingSheet === null || existingSheet === void 0 ? void 0 : existingSheet.parentNode)
                        existingSheet.parentNode.removeChild(existingSheet);
                    //let color = theme === "light" ? "#6e6e6e" : "#f3f3f3";
                    //let backgroundColor = theme === "light" ? "#f3f3f3" : "#6e6e6e";
                    //color = this._applySharedTheme && this?.sharedTheme?.text ? this.sharedTheme.text : color;
                    var customTheme = ((_a = _this === null || _this === void 0 ? void 0 : _this.sharedTheme) === null || _a === void 0 ? void 0 : _a.text) ? "\n        header.shared-theme ." + theme + "  calcite-button>svg>path, calcite-icon.share-icon{\n          fill: " + _this.sharedTheme.text + ";\n          color:" + _this.sharedTheme.text + ";\n        }  header.shared-theme ." + theme + "  .esri-share calcite-icon.share-icon{\n          fill: " + _this.sharedTheme.text + ";\n          color:" + _this.sharedTheme.text + ";\n        }\n       \n      " : "";
                    if (((_b = _this === null || _this === void 0 ? void 0 : _this.sharedTheme) === null || _b === void 0 ? void 0 : _b.background) && _this._applySharedTheme) {
                        customTheme += "calcite-shell {\n          --calcite-app-border-subtle: " + _this.sharedTheme.background + ";\n        }\n        header.shared-theme ." + theme + " calcite-button.esri-share__copy-clipboard-url{\n          background: " + _this.sharedTheme.background + ";\n        }";
                    }
                    // create and insert custom style 
                    //if (header) {
                    var style = document.createElement("style");
                    style.setAttribute("id", "customSheet");
                    style.appendChild(document.createTextNode(customTheme));
                    document.getElementsByTagName("head")[0].appendChild(style);
                    // }
                })]);
        };
        Header.prototype.render = function () {
            var _a = this.applicationConfig, title = _a.title, header = _a.header, applySharedTheme = _a.applySharedTheme;
            var headerLogo = this.rendeHeaderLogo();
            var headerStyle = this.createSharedStyles();
            var titleArea = title ? (widget_1.tsx("h1", { class: this.classes(CSS.heading) }, title)) : null;
            // No share tools on mobile use mobile sharing instead. 
            var shareTools = this.renderShare();
            return (widget_1.tsx("div", { key: "app-header", style: headerStyle, slot: "shell-header" }, header ? widget_1.tsx("header", { class: this.classes(CSS.base, applySharedTheme ? "shared-theme" : null) },
                widget_1.tsx("div", { class: "embed-app__header__title-area" },
                    headerLogo,
                    titleArea),
                shareTools) : null));
        };
        Header.prototype.rendeHeaderLogo = function () {
            var _a, _b, _c, _d;
            var logo = this._applySharedTheme ? (_a = this === null || this === void 0 ? void 0 : this.sharedTheme) === null || _a === void 0 ? void 0 : _a.logo : (_b = this.applicationConfig) === null || _b === void 0 ? void 0 : _b.logo;
            var logoLink = this._applySharedTheme ? (_c = this === null || this === void 0 ? void 0 : this.sharedTheme) === null || _c === void 0 ? void 0 : _c.logoLink : (_d = this.applicationConfig) === null || _d === void 0 ? void 0 : _d.logoLink;
            var logoImg = logo ? (widget_1.tsx("img", { class: this.classes(CSS.logo), src: logo, alt: true })) : null;
            if (logoImg) {
                return logoLink ? (widget_1.tsx("a", { rel: "noreferrer noopener", target: "_blank", href: logoLink }, logoImg)) : (logoImg);
            }
            else {
                return null;
            }
        };
        Header.prototype.createSharedStyles = function () {
            var _a, _b;
            var styles = [];
            if (this._applySharedTheme) {
                if ((_a = this.sharedTheme) === null || _a === void 0 ? void 0 : _a.background)
                    styles.push("background-color:" + this.sharedTheme.background + ";");
                if ((_b = this.sharedTheme) === null || _b === void 0 ? void 0 : _b.text)
                    styles.push("color:" + this.sharedTheme.text + ";");
            }
            return (styles === null || styles === void 0 ? void 0 : styles.length) > 0 ? styles.join(" ") : null;
        };
        Header.prototype.renderShare = function () {
            var _this = this;
            var _a;
            var _b = this.applicationConfig, theme = _b.theme, share = _b.share, shareIncludeSocial = _b.shareIncludeSocial;
            var displayShare = this._shareWidget && share && ((_a = this === null || this === void 0 ? void 0 : this.view) === null || _a === void 0 ? void 0 : _a.widthBreakpoint) !== "xsmall" ? true : false;
            if (this._shareWidget) {
                this._shareWidget.shareFeatures.shareServices = shareIncludeSocial;
                this._shareWidget.theme = theme;
            }
            return (displayShare ? widget_1.tsx("div", { class: theme, bind: this, afterCreate: function (container) {
                    container.appendChild(_this._shareWidget.container);
                } }) : widget_1.tsx("div", null));
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable(["applicationConfig.applySharedTheme", "applicationConfig.theme", "applicationConfig.share", "applicationConfig.shareIncludeSocial"])
        ], Header.prototype, "applicationConfig", void 0);
        __decorate([
            decorators_1.property()
        ], Header.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], Header.prototype, "sharedTheme", void 0);
        Header = __decorate([
            decorators_1.subclass("Header")
        ], Header);
        return Header;
    }((Widget_1.default)));
    exports.default = Header;
});
//# sourceMappingURL=Header.js.map