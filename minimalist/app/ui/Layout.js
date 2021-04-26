define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./Header", "./Layout/LayoutViewModel", "esri/widgets/Widget", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Header_1, LayoutViewModel_1, Widget_1, watchUtils_1) {
    "use strict";
    Header_1 = tslib_1.__importDefault(Header_1);
    LayoutViewModel_1 = tslib_1.__importDefault(LayoutViewModel_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "embed-app__layout",
        shellContainer: "calcite-shell-container",
        viewContainer: "embed-app__view-container",
        error: "embed-app__layout-error"
    };
    var Layout = /** @class */ (function (_super) {
        tslib_1.__extends(Layout, _super);
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
                        widget_1.tsx("div", { bind: this, class: layoutType, afterCreate: this.viewModel.createMap })))));
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
            var applySharedTheme = this.applicationConfig.applySharedTheme;
            var portal = (_a = this.applicationBase) === null || _a === void 0 ? void 0 : _a.portal;
            var sharedTheme = null;
            if ((portal === null || portal === void 0 ? void 0 : portal.portalProperties) && applySharedTheme) {
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
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.applicationConfig")
        ], Layout.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.applicationBase")
        ], Layout.prototype, "applicationBase", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.initialExtent")
        ], Layout.prototype, "initialExtent", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.item")
        ], Layout.prototype, "item", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Layout.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.state")
        ], Layout.prototype, "state", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Layout.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Layout.prototype, "calciteShell", void 0);
        Layout = tslib_1.__decorate([
            decorators_1.subclass("Layout")
        ], Layout);
        return Layout;
    }((Widget_1.default)));
    return Layout;
});
