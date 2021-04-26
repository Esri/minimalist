define(["require", "exports", "tslib", "dojo/i18n!../nls/resources", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, tslib_1, i18n, decorators_1, Widget_1, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "scroll-overlay",
        button: "scroll-overlay-button"
    };
    var ScrollOverlay = /** @class */ (function (_super) {
        tslib_1.__extends(ScrollOverlay, _super);
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
            var _a;
            var color = ((_a = this === null || this === void 0 ? void 0 : this.config) === null || _a === void 0 ? void 0 : _a.theme) === "dark" ? "neutral" : "inverse";
            return (widget_1.tsx("div", { class: this.classes([CSS.base, this.config.theme]) },
                widget_1.tsx("calcite-button", { appearance: "solid", bind: this, onclick: this.toggleInteraction, afterCreate: widget_1.storeNode, "data-node-ref": "scrollOverlayButton", class: CSS.button, scale: "m", color: color, width: "auto" }, i18n.scrollMessage)));
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
            var _a;
            var color = ((_a = this === null || this === void 0 ? void 0 : this.config) === null || _a === void 0 ? void 0 : _a.theme) === "dark" ? "neutral" : "inverse";
            return widget_1.tsx("div", { class: this.classes([CSS.base, this.config.theme]) },
                widget_1.tsx("calcite-button", { appearance: "solid", bind: this, onclick: this.toggleInteraction, afterCreate: widget_1.storeNode, "data-node-ref": "scrollOverlayButton", class: CSS.button, scale: "s", color: color, width: "auto" }, i18n.scrollMessage));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ScrollOverlay.prototype, "config", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScrollOverlay.prototype, "view", void 0);
        ScrollOverlay = tslib_1.__decorate([
            decorators_1.subclass("ScrollOverlay")
        ], ScrollOverlay);
        return ScrollOverlay;
    }((Widget_1.default)));
    exports.default = ScrollOverlay;
});
