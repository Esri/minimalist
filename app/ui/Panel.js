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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./Panel/PanelViewModel", "../polyfills/ResizeObserver", "esri/widgets/Widget", "esri/core/promiseUtils", "./icons/icons"], function (require, exports, decorators_1, watchUtils_1, widget_1, PanelViewModel_1, ResizeObserver_1, Widget_1, promiseUtils_1, icons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    PanelViewModel_1 = __importDefault(PanelViewModel_1);
    ResizeObserver_1 = __importDefault(ResizeObserver_1);
    Widget_1 = __importDefault(Widget_1);
    icons_1 = __importDefault(icons_1);
    var Panel = /** @class */ (function (_super) {
        __extends(Panel, _super);
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
                watchUtils_1.init(this, ["applicationConfig.legendPanel", "applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.details"], function () {
                    _this.viewModel.createActions();
                    _this.scheduleRender();
                }),
                watchUtils_1.when(this, "calcitePanel", function () {
                    var _this = this;
                    watchUtils_1.init(this.view, "widthBreakpoint", function () {
                        _this.viewModel.updatePadding();
                    });
                    var rObserver = new ResizeObserver_1.default(promiseUtils_1.debounce(function () { return _this.viewModel.updatePadding(); }));
                    rObserver.observe(this.calcitePanel);
                })
            ]);
        };
        Panel.prototype.render = function () {
            var _a = this.applicationConfig, legendPanel = _a.legendPanel, details = _a.details, popupPanel = _a.popupPanel, activePanel = _a.activePanel, layoutType = _a.layoutType;
            var collapsed = (activePanel !== null) ? false : true;
            var blocks = this.renderBlocks();
            var actionBar = this.renderActionBar();
            var hide = legendPanel || details || popupPanel ? null : "hide";
            var resizePanel = popupPanel ? "resize" : null;
            return (widget_1.tsx("calcite-shell-panel", { collapsed: collapsed, class: this.classes(["primary-panel", layoutType, hide, resizePanel]), slot: "primary-panel", bind: this, "data-node-ref": "calcitePanel", afterCreate: widget_1.storeNode, layout: "leading" },
                actionBar,
                blocks));
        };
        Panel.prototype.renderActionBar = function () {
            var _this = this;
            return widget_1.tsx("calcite-action-bar", { slot: "action-bar", bind: this, expand: "false", onclick: this.viewModel.actionItemClicked },
                widget_1.tsx("calcite-action-group", null, this.actions.map(function (action) {
                    var active = action.active, name = action.name, label = action.label, key = action.key, icon = action.icon;
                    return widget_1.tsx("calcite-action", { bind: _this, active: active, key: key, title: label, "data-action-item": key, text: name, label: label },
                        widget_1.tsx("calcite-icon", { scale: "s", icon: icons_1.default[icon] }));
                })));
        };
        Panel.prototype.renderBlocks = function () {
            var _this = this;
            return this.actions.map(function (action) {
                return widget_1.tsx("calcite-block", { class: action.active ? null : "hide", open: true, key: action.key, heading: _this.applicationConfig.layoutType !== "horizontal" ? action.label : null },
                    widget_1.tsx("div", { bind: _this, afterCreate: _this.viewModel.createActionClickFunction(action) }));
            });
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Panel.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], Panel.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable([
                "applicationConfig.activePanel"
            ])
        ], Panel.prototype, "applicationConfig", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.calcitePanel")
        ], Panel.prototype, "calcitePanel", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.actions")
        ], Panel.prototype, "actions", void 0);
        Panel = __decorate([
            decorators_1.subclass("Panel")
        ], Panel);
        return Panel;
    }((Widget_1.default)));
    exports.default = Panel;
});
//# sourceMappingURL=Panel.js.map