define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./Share/Share", "./Share/Share/ShareFeatures", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, watchUtils_1, widget_1, Share_1, ShareFeatures_1, Widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Share_1 = tslib_1.__importDefault(Share_1);
    ShareFeatures_1 = tslib_1.__importDefault(ShareFeatures_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "embed-app__header",
        logo: "embed-app__header__logo",
        heading: "heading"
    };
    var Header = /** @class */ (function (_super) {
        tslib_1.__extends(Header, _super);
        function Header(props) {
            var _this = _super.call(this, props) || this;
            _this._shareWidget = null;
            _this._applySharedTheme = false;
            return _this;
        }
        Header.prototype.initialize = function () {
            var _this = this;
            this.own([watchUtils_1.whenOnce(this, "view.ready", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var shareIncludeSocial, shareFeatures;
                    return tslib_1.__generator(this, function (_a) {
                        shareIncludeSocial = this.applicationConfig.shareIncludeSocial;
                        if (!this._shareWidget) {
                            shareFeatures = new ShareFeatures_1.default({
                                copyToClipboard: true,
                                embedMap: false,
                                shareServices: shareIncludeSocial
                            });
                            this._shareWidget = new Share_1.default({
                                config: this.applicationConfig,
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
                    var _c = _this.applicationConfig, theme = _c.theme, applySharedTheme = _c.applySharedTheme;
                    var existingSheet = document.getElementById("customSheet");
                    _this._applySharedTheme = applySharedTheme;
                    if (existingSheet === null || existingSheet === void 0 ? void 0 : existingSheet.parentNode)
                        existingSheet.parentNode.removeChild(existingSheet);
                    var color = theme === "light" ? "#6e6e6e" : "#f3f3f3";
                    if (_this._applySharedTheme && ((_a = _this === null || _this === void 0 ? void 0 : _this.sharedTheme) === null || _a === void 0 ? void 0 : _a.text)) {
                        color = _this.sharedTheme.text;
                    }
                    var customTheme = color ? "\n        header.shared-theme ." + theme + "  calcite-button>svg>path, calcite-icon.share-icon{\n          fill: " + color + ";\n          color:" + color + ";\n        }  header.shared-theme ." + theme + "  .esri-share calcite-icon.share-icon{\n          fill: " + color + ";\n          color:" + color + ";\n        }\n        .esri-share__share-item-container button[theme=light] svg > path {fill:" + color + "}\n        .esri-share__share-item-container button[theme=dark] svg > path {fill:" + color + "}\n        .esri-share__share-item-container  svg > path {fill:" + color + "}\n       \n      " : "";
                    if (((_b = _this === null || _this === void 0 ? void 0 : _this.sharedTheme) === null || _b === void 0 ? void 0 : _b.background) && _this._applySharedTheme) {
                        customTheme += "calcite-shell {\n          --calcite-app-border-subtle: " + _this.sharedTheme.background + ";\n        }\n        header.shared-theme ." + theme + " calcite-button.esri-share__copy-clipboard-url{\n          background: " + _this.sharedTheme.background + ";\n        }";
                    }
                    var style = document.createElement("style");
                    style.setAttribute("id", "customSheet");
                    style.appendChild(document.createTextNode(customTheme));
                    document.getElementsByTagName("head")[0].appendChild(style);
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
                if ((_a = this.sharedTheme) === null || _a === void 0 ? void 0 : _a.background) {
                    styles.push("background-color:" + this.sharedTheme.background + ";");
                }
                ;
                if ((_b = this.sharedTheme) === null || _b === void 0 ? void 0 : _b.text) {
                    styles.push("color:" + this.sharedTheme.text + ";");
                }
                ;
            }
            return (styles === null || styles === void 0 ? void 0 : styles.length) > 0 ? styles.join(" ") : null;
        };
        Header.prototype.renderShare = function () {
            var _this = this;
            var _a;
            var _b = this.applicationConfig, theme = _b.theme, share = _b.share, shareIncludeSocial = _b.shareIncludeSocial, applySharedTheme = _b.applySharedTheme;
            var displayShare = this._shareWidget && share && ((_a = this === null || this === void 0 ? void 0 : this.view) === null || _a === void 0 ? void 0 : _a.widthBreakpoint) !== "xsmall" ? true : false;
            if (this._shareWidget) {
                this._shareWidget.shareFeatures.shareServices = shareIncludeSocial;
                this._shareWidget.theme = theme;
            }
            return (displayShare ? widget_1.tsx("div", { class: theme, bind: this, afterCreate: function (container) {
                    container.appendChild(_this._shareWidget.container);
                } }) : widget_1.tsx("div", null));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Header.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Header.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Header.prototype, "sharedTheme", void 0);
        Header = tslib_1.__decorate([
            decorators_1.subclass("Header")
        ], Header);
        return Header;
    }((Widget_1.default)));
    exports.default = Header;
});
