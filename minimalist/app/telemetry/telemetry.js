define(["require", "exports", "tslib", "../telemetry/telemetry.dojo.min", "esri/core/promiseUtils"], function (require, exports, tslib_1, telemetry_dojo_min_1, promiseUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    telemetry_dojo_min_1 = tslib_1.__importDefault(telemetry_dojo_min_1);
    var Telemetry = /** @class */ (function () {
        function Telemetry() {
        }
        Telemetry.init = function (settings, useCache) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, promiseUtils_1.create(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var portal, config, options, telemetry;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        portal = settings.portal, config = settings.config;
                                        this._instance = null;
                                        return [4 /*yield*/, this._loadGoogleAnalytics(settings)];
                                    case 1:
                                        _b.sent();
                                        options = {
                                            disabled: false,
                                            portal: portal,
                                            amazon: this._getAmazonCredentials(settings),
                                            google: this._isGoogleEnabled(config) ? true : false,
                                            debug: this._getEnvironment(portal.portalHostname) === "dev" ? true : false
                                        };
                                        telemetry = new telemetry_dojo_min_1.default(options);
                                        this._instance = telemetry;
                                        ((_a = this._instance) === null || _a === void 0 ? void 0 : _a.disabled) ? resolve() : resolve(telemetry);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            });
        };
        Telemetry._isGoogleEnabled = function (config) {
            var googleAnalytics = config.googleAnalytics, googleAnalyticsConsent = config.googleAnalyticsConsent, telemetry = config.telemetry;
            // Check to see if GA is enabled
            var enabled = googleAnalytics;
            var optInKey = "analytics-opt-in-" + telemetry.name;
            if (enabled) {
                // Check to see if messaging has been enabled and if so 
                // check to see if they've opted in
                if (googleAnalyticsConsent) {
                    enabled = localStorage.getItem(optInKey) || false;
                }
            }
            return enabled;
        };
        Telemetry._getAmazonCredentials = function (settings) {
            var envCredentials = settings.config.telemetry;
            if (!envCredentials)
                return;
            var env = this._getEnvironment(settings.portal.portalHostname);
            var userPoolID = envCredentials[env].amazon.userPoolID;
            var id = envCredentials[env].amazon.app.id;
            var name = envCredentials.name;
            var version = envCredentials.version;
            return {
                userPoolID: userPoolID,
                app: {
                    name: name,
                    id: id,
                    version: version
                }
            };
        };
        Telemetry._loadGoogleAnalytics = function (settings) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, promiseUtils_1.create(function (resolve, reject) {
                            var _a;
                            if (((_a = settings.portal) === null || _a === void 0 ? void 0 : _a.eueiEnabled) === false) {
                                resolve();
                                return;
                            }
                            var _b = settings.config, googleAnalytics = _b.googleAnalytics, googleAnalyticsKey = _b.googleAnalyticsKey, googleAnalyticsConsent = _b.googleAnalyticsConsent;
                            // Don't enable GA if users haven't opted-in
                            var enableGoogle = _this._isGoogleEnabled(settings.config);
                            var scriptsExist = _this._googleScripts();
                            // remove scripts if GA is disabled 
                            // Instead maybe just (TODO) leave the script tag but disable GA if not enabled
                            // info: https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
                            if ((!googleAnalytics || !enableGoogle) && scriptsExist) {
                                _this.removeScripts();
                                resolve();
                                return;
                            }
                            else if (!enableGoogle) {
                                resolve();
                                return;
                            }
                            // window[`ga-disable-${googleAnalyticsKey}`] = !googleAnalytics;
                            // console.log("GA Disabled via window", window[`ga-disable-${googleAnalyticsKey}`]);
                            // don't add scripts if already there             
                            if (googleAnalytics && googleAnalyticsKey && !scriptsExist) {
                                var gaScript = document.createElement('script');
                                gaScript.setAttribute('async', 'true');
                                gaScript.setAttribute('src', "https://www.googletagmanager.com/gtag/js?id=" + googleAnalyticsKey);
                                gaScript.id = _this.gaids[0];
                                var gaScript2 = document.createElement('script');
                                gaScript2.id = _this.gaids[1];
                                gaScript2.innerText = "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '" + googleAnalyticsKey + "');";
                                var head = document.getElementsByTagName("head")[0];
                                head.insertBefore(gaScript, head.firstChild);
                                head.insertBefore(gaScript2, head.firstChild);
                                var timeStart_1 = Date.now();
                                var TIMEOUT_1 = 6000;
                                var _isLoaded_1 = function () {
                                    if (Date.now() - timeStart_1 > TIMEOUT_1) {
                                        reject('Timeout. Google analytics not injected!');
                                    }
                                    if (window['ga'] && window['ga'].create) {
                                        resolve(window['ga']);
                                    }
                                    else {
                                        setTimeout(_isLoaded_1, 1000);
                                    }
                                };
                                _isLoaded_1();
                            }
                            else {
                                resolve();
                            }
                        })];
                });
            });
        };
        Telemetry._googleScripts = function () {
            var alreadyLoaded = this.gaids.every(function (id) {
                return document.getElementById(id) !== null ? true : false;
            });
            return alreadyLoaded;
        };
        Telemetry.removeScripts = function () {
            this.gaids.forEach(function (id) {
                var gaScript = document.getElementById(id);
                gaScript === null || gaScript === void 0 ? void 0 : gaScript.parentNode.removeChild(gaScript);
            });
        };
        Telemetry._getEnvironment = function (hostname) {
            var h = hostname.replace("www.", "");
            if (document.location.hostname.indexOf("arcgis.com") === -1) {
                return "dev";
            }
            else {
                return (h === "arcgis.com" && "prod") || (h === "qaext.arcgis.com" && "qa") || "dev";
            }
        };
        Telemetry.gaids = ["ga1", "ga2"];
        return Telemetry;
    }());
    exports.default = Telemetry;
});
