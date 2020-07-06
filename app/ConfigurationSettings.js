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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, decorators_1, Accessor_1) {
    "use strict";
    Accessor_1 = __importDefault(Accessor_1);
    var ConfigurationSettings = /** @class */ (function (_super) {
        __extends(ConfigurationSettings, _super);
        function ConfigurationSettings(params) {
            var _this = _super.call(this, params) || this;
            _this.activePanel = null;
            _this.withinConfigurationExperience = window.location !== window.parent.location;
            _this._storageKey = "config-values";
            _this._draft = null;
            _this._draftMode = false;
            _this._draft = params === null || params === void 0 ? void 0 : params.draft;
            _this._draftMode = (params === null || params === void 0 ? void 0 : params.mode) === "draft";
            return _this;
        }
        ConfigurationSettings.prototype.initialize = function () {
            if (this.withinConfigurationExperience || this._draftMode) {
                // Apply any draft properties
                if (this._draft) {
                    Object.assign(this, this._draft);
                }
                window.addEventListener("message", function (e) {
                    this._handleConfigurationUpdates(e);
                }.bind(this), false);
            }
        };
        ConfigurationSettings.prototype._handleConfigurationUpdates = function (e) {
            var _a;
            if (((_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type) === "cats-app") {
                Object.assign(this, e.data);
            }
        };
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "webmap", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapZoom", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "mapZoomPosition", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "maxScale", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "minScale", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "theme", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "title", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "activePanel", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "details", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "detailsContent", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "header", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "logo", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "logoLink", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "applySharedTheme", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "popupPanel", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "popupHover", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "legendPanel", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "bookmarks", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "bookmarksPosition", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "disableScroll", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "layoutType", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapToggle", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemapTogglePosition", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "nextBasemap", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "search", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchPosition", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchConfiguration", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "searchOpenAtStart", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "scalebar", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "scalebarPosition", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "home", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "homePosition", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "share", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "shareIncludeSocial", void 0);
        __decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "withinConfigurationExperience", void 0);
        ConfigurationSettings = __decorate([
            decorators_1.subclass("app.ConfigurationSettings")
        ], ConfigurationSettings);
        return ConfigurationSettings;
    }((Accessor_1.default)));
    return ConfigurationSettings;
});
//# sourceMappingURL=ConfigurationSettings.js.map