/*
  Copyright 2019 Esri
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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.writeConfigToStorage = void 0;
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    function writeConfigToStorage(data, appid) {
        // local storage values are read and applied to config 
        // during application base 
        var lsItemId = appid ? "application_base_config_" + appid : "application_base_config";
        window.localStorage.removeItem(lsItemId);
        window.localStorage.setItem(lsItemId, JSON.stringify(data));
    }
    exports.writeConfigToStorage = writeConfigToStorage;
});
//# sourceMappingURL=storageUtils.js.map