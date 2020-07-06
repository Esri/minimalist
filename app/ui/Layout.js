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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./Header", "./Layout/LayoutViewModel", "esri/widgets/Widget", "esri/core/watchUtils"], function (require, exports, decorators_1, widget_1, Header_1, LayoutViewModel_1, Widget_1, watchUtils_1) {
    "use strict";
    Header_1 = __importDefault(Header_1);
    LayoutViewModel_1 = __importDefault(LayoutViewModel_1);
    Widget_1 = __importDefault(Widget_1);
    var CSS = {
        base: "embed-app__layout",
        shellContainer: "calcite-shell-container",
        viewContainer: "embed-app__view-container",
        error: "embed-app__layout-error"
    };
    var Layout = /** @class */ (function (_super) {
        __extends(Layout, _super);
        function Layout(props) {
            var _this = _super.call(this, props) || this;
            _this.view = null;
            _this.state = null;
            _this.viewModel = new LayoutViewModel_1.default();
            _this.calciteShell = null;
            _this._header = null;
            return _this;
        }
        Layout.prototype.initialize = function () {
            var _this = this;
            this.own([watchUtils_1.whenEqualOnce(this, "state", "ready", function () {
                    var _a;
                    if (_this._header && !((_a = _this._header) === null || _a === void 0 ? void 0 : _a.view)) {
                        _this._header.view = _this.view;
                    }
                })]);
        };
        Layout.prototype.render = function () {
            var _a = this.applicationConfig, theme = _a.theme, header = _a.header, layoutType = _a.layoutType;
            var headerSection = this.renderHeader();
            var loader = this.state === "loading" ? (widget_1.tsx("calcite-loader", { isActive: true })) : null;
            return (widget_1.tsx("div", { class: this.classes(CSS.shellContainer, header ? "header" : null) },
                widget_1.tsx("calcite-shell", { theme: theme, bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "calciteShell" }, headerSection === null || headerSection === void 0 ? void 0 :
                    headerSection.render(),
                    widget_1.tsx("div", { class: this.classes(CSS.viewContainer) },
                        loader,
                        widget_1.tsx("div", { bind: this, class: layoutType, afterCreate: this.viewModel.createMap }),
                        ";"))));
        };
        Layout.prototype.renderHeader = function () {
            if (!this._header) {
                var headerProps = {
                    applicationConfig: this.applicationConfig,
                    sharedTheme: this._createSharedTheme(),
                    view: this.view
                };
                this._header = new Header_1.default(headerProps);
            }
            return this._header;
        };
        Layout.prototype._createSharedTheme = function () {
            var _a, _b, _c, _d, _e, _f;
            var portal = (_a = this.applicationBase) === null || _a === void 0 ? void 0 : _a.portal;
            var sharedTheme = null;
            if (portal === null || portal === void 0 ? void 0 : portal.portalProperties) {
                var theme = (_b = portal === null || portal === void 0 ? void 0 : portal.portalProperties) === null || _b === void 0 ? void 0 : _b.sharedTheme;
                sharedTheme = {
                    background: (_c = theme === null || theme === void 0 ? void 0 : theme.header) === null || _c === void 0 ? void 0 : _c.background,
                    text: (_d = theme === null || theme === void 0 ? void 0 : theme.header) === null || _d === void 0 ? void 0 : _d.text,
                    logo: (_e = theme === null || theme === void 0 ? void 0 : theme.logo) === null || _e === void 0 ? void 0 : _e.small,
                    logoLink: (_f = theme === null || theme === void 0 ? void 0 : theme.logo) === null || _f === void 0 ? void 0 : _f.link
                };
            }
            return sharedTheme;
        };
        __decorate([
            decorators_1.aliasOf("viewModel.applicationConfig"),
            widget_1.renderable(["applicationConfig.title",
                "applicationConfig.header",
                "applicationConfig.theme",
                "applicationConfig.disableScroll",
                "applicationConfig.popupPanel",
                "applicationConfig.layoutType",
                "applicationConfig.legendPanel", "applicationConfig.details"])
        ], Layout.prototype, "applicationConfig", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.applicationBase")
        ], Layout.prototype, "applicationBase", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.item")
        ], Layout.prototype, "item", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Layout.prototype, "view", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.state")
        ], Layout.prototype, "state", void 0);
        __decorate([
            decorators_1.property()
        ], Layout.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.property()
        ], Layout.prototype, "calciteShell", void 0);
        Layout = __decorate([
            decorators_1.subclass("Layout")
        ], Layout);
        return Layout;
    }((Widget_1.default)));
    return Layout;
});
//# sourceMappingURL=Layout.js.map