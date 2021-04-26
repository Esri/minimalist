define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "TemplatesCommonLib/baseClasses/configurationSettingsBase"], function (require, exports, tslib_1, decorators_1, configurationSettingsBase_1) {
    "use strict";
    configurationSettingsBase_1 = tslib_1.__importDefault(configurationSettingsBase_1);
    var ConfigurationSettings = /** @class */ (function (_super) {
        tslib_1.__extends(ConfigurationSettings, _super);
        function ConfigurationSettings() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.activePanel = null;
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "webmap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "extentSelectorConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "extentSelector", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapZoom", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapZoomPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "maxScale", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "minScale", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "theme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "title", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalytics", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalyticsKey", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalyticsConsentMsg", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "googleAnalyticsConsent", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "telemetry", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "activePanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "details", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "detailsContent", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customCSS", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "header", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "logo", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "logoLink", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "applySharedTheme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "popupPanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "popupHover", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "legendPanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "layerListPanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "hiddenLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "editPanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "allowedWorkflows", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "editLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "bookmarks", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "bookmarksPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "bookmarkThumbnail", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "disableScroll", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "layoutType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapToggle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapTogglePosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "nextBasemap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapSelector", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "search", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchConfiguration", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchOpenAtStart", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "scalebar", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "scalebarPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "screenshot", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "screenshotPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "home", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "homePosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "share", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "shareIncludeSocial", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapA11yDesc", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customUrlParam", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "customURLParamName", void 0);
        ConfigurationSettings = tslib_1.__decorate([
            decorators_1.subclass("app.ConfigurationSettings")
        ], ConfigurationSettings);
        return ConfigurationSettings;
    }((configurationSettingsBase_1.default)));
    return ConfigurationSettings;
});
