define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./Panel/PanelViewModel", "esri/widgets/Widget", "./icons/icons"], function (require, exports, tslib_1, decorators_1, watchUtils_1, widget_1, PanelViewModel_1, Widget_1, icons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    PanelViewModel_1 = tslib_1.__importDefault(PanelViewModel_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var Panel = /** @class */ (function (_super) {
        tslib_1.__extends(Panel, _super);
        function Panel(props) {
            var _this = _super.call(this, props) || this;
            _this.calcitePanel = null;
            _this.actions = [];
            _this.viewModel = new PanelViewModel_1.default(props);
            return _this;
        }
        Panel.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.init(this, ["applicationConfig.legendPanel", "applicationConfig.layerListPanel", "applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.details"], function () {
                    _this.viewModel.createActions();
                })
            ]);
        };
        Panel.prototype.render = function () {
            var _a = this.applicationConfig, legendPanel = _a.legendPanel, layerListPanel = _a.layerListPanel, details = _a.details, popupPanel = _a.popupPanel, activePanel = _a.activePanel, editPanel = _a.editPanel, layoutType = _a.layoutType;
            // make sure the activePanel exists 
            var collapsed = (activePanel !== null && this.applicationConfig[activePanel]) ? false : true;
            var blocks = this.renderBlocks();
            var actionBar = this.renderActionBar();
            var hide = layerListPanel || legendPanel || details || popupPanel || editPanel ? null : "hide";
            var resizePanel = popupPanel ? "resize" : null;
            return (widget_1.tsx("calcite-shell-panel", { collapsed: collapsed, class: this.classes(["primary-panel", layoutType, hide, resizePanel]), slot: "primary-panel", bind: this, "data-node-ref": "calcitePanel", afterCreate: widget_1.storeNode, "width-scale": layoutType === "horizontal" ? "xl" : "m", layout: "leading" },
                actionBar,
                blocks));
        };
        Panel.prototype.renderActionBar = function () {
            var _this = this;
            var layoutType = this.applicationConfig.layoutType;
            return widget_1.tsx("calcite-action-bar", { slot: "action-bar", bind: this, expand: "false", onclick: this.viewModel.actionItemClicked, "expand-disabled": (layoutType === "horizontal") ? "true" : "false" },
                widget_1.tsx("calcite-action-group", null, this.actions.map(function (action) {
                    var active = action.active, name = action.name, label = action.label, key = action.key, icon = action.icon;
                    return widget_1.tsx("calcite-action", { bind: _this, active: active, key: key, title: label, "data-action-item": key, text: name, label: label },
                        widget_1.tsx("calcite-icon", { scale: "s", icon: icons_1.default[icon] }));
                })));
        };
        Panel.prototype.renderBlocks = function () {
            var _this = this;
            var _a = this.applicationConfig, layoutType = _a.layoutType, theme = _a.theme;
            return this.actions.map(function (action) {
                var header = (layoutType !== "horizontal" && action.key !== "edit") ? widget_1.tsx("div", { class: "header-panel", slot: "header-content" },
                    widget_1.tsx("h2", null, action.label)) : null;
                return widget_1.tsx("calcite-panel", { class: action.active ? null : "hide", open: true, style: "margin-top:0;margin-bottom:0;", theme: theme, "width-scale": layoutType === "horizontal" ? "xl" : "m", key: action.key },
                    header,
                    widget_1.tsx("div", { bind: _this, theme: theme, afterCreate: _this.viewModel.createActionClickFunction(action) }));
            });
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Panel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Panel.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Panel.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.calcitePanel")
        ], Panel.prototype, "calcitePanel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.actions")
        ], Panel.prototype, "actions", void 0);
        Panel = tslib_1.__decorate([
            decorators_1.subclass("Panel")
        ], Panel);
        return Panel;
    }((Widget_1.default)));
    exports.default = Panel;
});
