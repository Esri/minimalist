define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./Panel/MobilePanelViewModel", "esri/widgets/Widget", "./icons/icons", "dojo/i18n!../nls/resources"], function (require, exports, tslib_1, decorators_1, watchUtils_1, widget_1, MobilePanelViewModel_1, Widget_1, icons_1, i18n) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MobilePanelViewModel_1 = tslib_1.__importDefault(MobilePanelViewModel_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var MobilePanel = /** @class */ (function (_super) {
        tslib_1.__extends(MobilePanel, _super);
        function MobilePanel(props) {
            var _this = _super.call(this, props) || this;
            _this.actions = [];
            _this.mobilePanel = null;
            _this.viewModel = new MobilePanelViewModel_1.default(props);
            return _this;
        }
        MobilePanel.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.init(this, ["applicationConfig.legendPanel", "applicationConfig.layerListPanel", "applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.details"], function () {
                    _this.viewModel.createActions();
                })
            ]);
        };
        MobilePanel.prototype.render = function () {
            var _a, _b;
            var theme = this.applicationConfig.theme;
            var blocks = this.renderBlocks();
            var actionBar = this.renderActionBar();
            var hide = actionBar ? null : "hide";
            actionBar ? (_a = this.view) === null || _a === void 0 ? void 0 : _a.container.classList.remove("no-mobile") : (_b = this.view) === null || _b === void 0 ? void 0 : _b.container.classList.add("no-mobile");
            return ((widget_1.tsx("div", { class: this.classes(["mobile-panel", hide, theme]) },
                widget_1.tsx("div", { "data-node-ref": "mobilePanel", afterCreate: widget_1.storeNode, bind: this, class: "mobile-block-container" }, blocks),
                actionBar)));
        };
        MobilePanel.prototype.renderActionBar = function () {
            var _this = this;
            var _a;
            return ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (widget_1.tsx("calcite-radio-group", { bind: this, onclick: this.viewModel.openPanel, theme: this.applicationConfig.theme }, this.actions.map(function (action) {
                var checked = action.checked, name = action.name, label = action.label, key = action.key, icon = action.icon;
                return widget_1.tsx("calcite-radio-group-item", { bind: _this, checked: checked, class: "mobile", value: name, title: label, "data-action-item": key, text: name, label: label },
                    widget_1.tsx("calcite-icon", { scale: "m", icon: icons_1.default[icon] }));
            }))) : null;
        };
        MobilePanel.prototype.renderBlocks = function () {
            var _this = this;
            var theme = this.applicationConfig.theme;
            return this.actions.length > 0 ? this.actions.map(function (action) {
                return widget_1.tsx("calcite-panel", { class: action.checked ? null : "hide", open: true, theme: true, key: action.key },
                    widget_1.tsx("div", { class: _this.classes("header", "mobile-panel-header"), slot: "header-content" },
                        widget_1.tsx("h2", null, action.label),
                        widget_1.tsx("div", { class: "header-buttons" },
                            widget_1.tsx("button", { class: _this.classes("panel-action", "action-img-expand", theme), title: i18n.toggle, onclick: _this.viewModel.expandPanel, bind: _this }),
                            widget_1.tsx("button", { onclick: _this.viewModel.closePanel, class: _this.classes("panel-action", theme), title: i18n.closePanel, bind: _this },
                                widget_1.tsx("calcite-icon", { icon: icons_1.default["close"] })))),
                    widget_1.tsx("div", { bind: _this, afterCreate: _this.viewModel.createActionClickFunction(action) }));
            }) : null;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], MobilePanel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], MobilePanel.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], MobilePanel.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.actions")
        ], MobilePanel.prototype, "actions", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.mobilePanel")
        ], MobilePanel.prototype, "mobilePanel", void 0);
        MobilePanel = tslib_1.__decorate([
            decorators_1.subclass("MobilePanel")
        ], MobilePanel);
        return MobilePanel;
    }((Widget_1.default)));
    exports.default = MobilePanel;
});
