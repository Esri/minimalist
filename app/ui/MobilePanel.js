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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./Panel/MobilePanelViewModel", "esri/widgets/Widget", "./icons/icons", "dojo/i18n!../nls/resources"], function (require, exports, decorators_1, watchUtils_1, widget_1, MobilePanelViewModel_1, Widget_1, icons_1, i18n) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MobilePanelViewModel_1 = __importDefault(MobilePanelViewModel_1);
    Widget_1 = __importDefault(Widget_1);
    icons_1 = __importDefault(icons_1);
    var MobilePanel = /** @class */ (function (_super) {
        __extends(MobilePanel, _super);
        function MobilePanel(props) {
            var _this = _super.call(this, props) || this;
            _this.actions = [];
            _this.viewModel = new MobilePanelViewModel_1.default(props);
            return _this;
        }
        MobilePanel.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.init(this, ["applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.legend", "applicationConfig.details"], function () {
                    _this.viewModel.createActions();
                }),
                watchUtils_1.whenEqual(this.view, "widthBreakpoint", "xsmall", function () {
                    var bottom = _this.applicationConfig.activePanel !== null ? 50 : 30;
                    _this.view.padding = __assign(__assign({}, _this.view.padding), { left: 0, bottom: bottom });
                })
            ]);
        };
        MobilePanel.prototype.render = function () {
            // always true on mobile
            var _a = this.applicationConfig, legendPanel = _a.legendPanel, details = _a.details, theme = _a.theme;
            var popupPanel = true;
            var blocks = this.renderBlocks();
            var actionBar = this.renderActionBar();
            var hide = legendPanel || details || popupPanel ? null : "hide";
            return (widget_1.tsx("div", { class: this.classes(["mobile-panel", hide, theme]) },
                widget_1.tsx("div", { class: "mobile-block-container" }, blocks),
                actionBar));
        };
        MobilePanel.prototype.renderActionBar = function () {
            var _this = this;
            return widget_1.tsx("calcite-radio-group", { bind: this, onclick: this.viewModel.openPanel, theme: this.applicationConfig.theme }, this.actions.map(function (action) {
                var checked = action.checked, name = action.name, label = action.label, key = action.key, icon = action.icon;
                return widget_1.tsx("calcite-radio-group-item", { bind: _this, checked: checked, class: "mobile", value: name, title: label, "data-action-item": key, text: name, label: label },
                    widget_1.tsx("calcite-icon", { scale: "m", icon: icons_1.default[icon] }));
            }));
        };
        MobilePanel.prototype.renderBlocks = function () {
            var _this = this;
            var theme = this.applicationConfig.theme;
            return this.actions.map(function (action) {
                return widget_1.tsx("calcite-block", { class: action.checked ? null : "hide", open: true, theme: true, key: action.key, heading: action.label },
                    widget_1.tsx("div", { slot: "control" },
                        widget_1.tsx("button", { class: _this.classes("panel-action", "action-img-expand", theme), title: i18n.toggle, onclick: _this.viewModel.expandPanel, bind: _this }),
                        widget_1.tsx("button", { onclick: _this.viewModel.closePanel, class: _this.classes("panel-action", theme), title: i18n.closePanel, bind: _this },
                            widget_1.tsx("calcite-icon", { icon: icons_1.default["close"] }))),
                    widget_1.tsx("div", { bind: _this, afterCreate: _this.viewModel.createActionClickFunction(action) }));
            });
        };
        __decorate([
            decorators_1.property()
        ], MobilePanel.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], MobilePanel.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable([
                "theme", "applicationConfig.activePanel"
            ])
        ], MobilePanel.prototype, "applicationConfig", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.actions")
        ], MobilePanel.prototype, "actions", void 0);
        MobilePanel = __decorate([
            decorators_1.subclass("MobilePanel")
        ], MobilePanel);
        return MobilePanel;
    }((Widget_1.default)));
    exports.default = MobilePanel;
});
//# sourceMappingURL=MobilePanel.js.map