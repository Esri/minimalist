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
define(["require", "exports", "dojo/i18n!../nls/resources", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, i18n, decorators_1, Widget_1, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    var CSS = {
        base: "scroll-overlay",
        button: "scroll-overlay-button"
    };
    var ScrollOverlay = /** @class */ (function (_super) {
        __extends(ScrollOverlay, _super);
        function ScrollOverlay(props) {
            return _super.call(this, props) || this;
        }
        ScrollOverlay.prototype.initialize = function () {
            if (this.config.disableScroll && this.view) {
                this.toggleInteraction();
            }
            ;
        };
        ScrollOverlay.prototype.render = function () {
            return (widget_1.tsx("div", { class: this.classes([CSS.base, this.config.theme]) },
                widget_1.tsx("calcite-button", { appearance: "solid", bind: this, onclick: this.toggleInteraction, afterCreate: widget_1.storeNode, "data-node-ref": "scrollOverlayButton", class: CSS.button, scale: "m", color: this.config.theme, width: "auto" }, i18n.scrollMessage)));
        };
        ScrollOverlay.prototype.toggleInteraction = function () {
            var _a = this.view.navigation, mouseWheelZoomEnabled = _a.mouseWheelZoomEnabled, browserTouchPanEnabled = _a.browserTouchPanEnabled;
            var isEnabled = mouseWheelZoomEnabled && browserTouchPanEnabled;
            this.view.navigation.mouseWheelZoomEnabled = !isEnabled;
            this.view.navigation.browserTouchPanEnabled = !isEnabled;
            if (this === null || this === void 0 ? void 0 : this.scrollOverlayButton) {
                this.scrollOverlayButton.innerHTML = isEnabled ? i18n.scrollMessage : i18n.disableScrollMessage;
            }
        };
        ScrollOverlay.prototype._createScrollButton = function () {
            return widget_1.tsx("div", { class: this.classes([CSS.base, this.config.theme]) },
                widget_1.tsx("calcite-button", { appearance: "solid", bind: this, onclick: this.toggleInteraction, afterCreate: widget_1.storeNode, "data-node-ref": "scrollOverlayButton", class: CSS.button, scale: "s", color: this.config.theme, width: "auto" }, i18n.scrollMessage));
        };
        __decorate([
            decorators_1.property()
        ], ScrollOverlay.prototype, "config", void 0);
        __decorate([
            decorators_1.property()
        ], ScrollOverlay.prototype, "view", void 0);
        ScrollOverlay = __decorate([
            decorators_1.subclass("ScrollOverlay")
        ], ScrollOverlay);
        return ScrollOverlay;
    }((Widget_1.default)));
    exports.default = ScrollOverlay;
});
//# sourceMappingURL=ScrollOverlay.js.map