define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "dojo/i18n!../nls/resources", "esri/widgets/support/widget"], function (require, exports, tslib_1, decorators_1, Widget, i18n, widget_1) {
    "use strict";
    var CSS = {
        base: "esri-minimalist-ga-alert",
        optButton: "esri-minimalist-ga-alert-button"
    };
    var Alert = /** @class */ (function (_super) {
        tslib_1.__extends(Alert, _super);
        function Alert(params) {
            var _this = _super.call(this, params) || this;
            _this.alertNode = null;
            _this.portal = null;
            return _this;
        }
        Alert.prototype.render = function () {
            var enableGA = localStorage.getItem("analytics-opt-in-minimalist") || false;
            var _a = this.config, googleAnalytics = _a.googleAnalytics, googleAnalyticsKey = _a.googleAnalyticsKey, theme = _a.theme, googleAnalyticsConsent = _a.googleAnalyticsConsent, googleAnalyticsConsentMsg = _a.googleAnalyticsConsentMsg;
            var isActive = googleAnalytics && googleAnalyticsKey !== null && googleAnalyticsConsent && !enableGA ? true : false;
            return (widget_1.tsx("div", { bind: this },
                widget_1.tsx("calcite-alert", { afterCreate: widget_1.storeNode, bind: this, "data-node-ref": "alertNode", "intl-close": i18n.close, scale: "s", theme: theme, active: isActive },
                    widget_1.tsx("div", { slot: "alert-message", innerHTML: googleAnalyticsConsentMsg }),
                    widget_1.tsx("calcite-button", { class: CSS.optButton, scale: "s", slot: "alert-link", bind: this, afterCreate: this.handleClick }, i18n.analyticsOptIn))));
        };
        ;
        Alert.prototype.handleClick = function (element) {
            var _this = this;
            element.addEventListener("click", function () {
                var _a, _b;
                // Add opt-in value to local storage 
                localStorage.setItem("analytics-opt-in-" + ((_b = (_a = _this === null || _this === void 0 ? void 0 : _this.config) === null || _a === void 0 ? void 0 : _a.telemetry) === null || _b === void 0 ? void 0 : _b.name), "true");
                // update config setting to trigger GA reset and 
                // prevent dialog from showing
                _this.config.googleAnalyticsConsent = false;
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Alert.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Alert.prototype, "config", void 0);
        Alert = tslib_1.__decorate([
            decorators_1.subclass("Alert")
        ], Alert);
        return Alert;
    }(Widget));
    return Alert;
});
