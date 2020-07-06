/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dojo/text!config/applicationBase.json", "dojo/text!config/application.json", "./application-base-js/ApplicationBase", "./Main", "dojo/i18n!./nls/resources", "./utils/errorUtils", "./unsupported/UnsupportedBrowser"], function (require, exports, applicationBaseConfig, applicationConfig, ApplicationBase_1, Application, i18n, errorUtils, UnsupportedBrowser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ApplicationBase_1 = __importDefault(ApplicationBase_1);
    errorUtils = __importStar(errorUtils);
    UnsupportedBrowser_1 = __importDefault(UnsupportedBrowser_1);
    var Main = new Application();
    new ApplicationBase_1.default({
        config: applicationConfig,
        settings: applicationBaseConfig
    })
        .load()
        .then(function (base) {
        if (base["isIE"]) {
            // load unsupported browser and show message 
            new UnsupportedBrowser_1.default({
                isIE11: base["isIE"],
                container: document.body
            });
            var container = document.getElementById("appMain");
            if (container) {
                container.classList.add("hide");
            }
            document.body.classList.remove("no-map");
            document.body.classList.remove("configurable-application--loading");
            return;
        }
        Main.init(base);
    }, function (message) {
        if (message === "identity-manager:not-authorized") {
            errorUtils.displayError({
                title: i18n.licenseError.title,
                message: i18n.licenseError.message
            });
        }
    });
});
//# sourceMappingURL=init.js.map