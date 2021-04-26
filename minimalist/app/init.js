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
define(["require", "exports", "tslib", "dojo/text!config/applicationBase.json", "dojo/text!config/application.json", "ApplicationBase/ApplicationBase", "./Main", "dojo/i18n!./nls/resources", "./utils/errorUtils"], function (require, exports, tslib_1, applicationBaseConfig, applicationConfig, ApplicationBase_1, Main_1, i18n, errorUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ApplicationBase_1 = tslib_1.__importDefault(ApplicationBase_1);
    Main_1 = tslib_1.__importDefault(Main_1);
    errorUtils = tslib_1.__importStar(errorUtils);
    var Main = new Main_1.default();
    new ApplicationBase_1.default({
        config: applicationConfig,
        settings: applicationBaseConfig
    })
        .load()
        .then(function (base) {
        Main.init(base);
    }, function (message) {
        if (message === "identity-manager:not-authorized") {
            errorUtils.displayError({
                title: i18n.licenseError.title,
                message: i18n.licenseError.message
            });
        }
        else if ((message === null || message === void 0 ? void 0 : message.error) === "application:origin-other") {
            document.location.href = "../../shared/origin/index.html?appUrl=" + message.appUrl;
        }
    });
});
