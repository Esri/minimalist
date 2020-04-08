/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/*
  Copyright 2020 Esri
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
import Accessor = require("esri/core/Accessor");

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { LayoutProps, State } from "../../interfaces/interfaces";
import Error from "../Error";
import ApplicationBase from "ApplicationBase/ApplicationBase";
import AppConfig from "../../ConfigurationSettings";

import {
  createMapFromItem,
  createView,
  getConfigViewProperties
} from "ApplicationBase/support/itemUtils";


@subclass("esri.demo.LayoutViewModel")
class LayoutViewModel extends declared(Accessor) {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: LayoutProps) {
    super(props);
  }

  @property({ dependsOn: ["view.ready", "item.loadStatus"], readOnly: true })
  get state(): State {
    const ready = this.get("view.ready");
    const loading = this.get("item.loadStatus") === "loaded" ? false : true;
    if (!this.item) {
      return "error";
    } else {
      return ready && !loading ? "ready" : "loading";
    }
  }
  @property()
  applicationConfig: AppConfig;

  @property()
  applicationBase: ApplicationBase;

  @property()
  item: __esri.PortalItem;

  @property() view: __esri.MapView = null;
  async createMap(container: HTMLElement) {
    if (!this.item) {
      return new Error({
        title: "Error",
        message: "Could not load an item to display",
        container
      });
    }

    const portalItem: __esri.PortalItem = this.applicationBase.results
      .applicationItem.value;
    const appProxies = portalItem?.applicationProxies
      ? portalItem.applicationProxies
      : null;


    const defaultViewProperties = getConfigViewProperties(
      this.applicationConfig
    );
    const mapContainer = {
      container
    };
    const components = this.applicationConfig.mapZoom
      ? ["attribution", "zoom"]
      : ["attribution"];
    const viewProperties = {
      ...defaultViewProperties,
      ui: { components },
      ...mapContainer
    };
    const { minScale, maxScale } = this.applicationConfig;
    if (minScale || maxScale) {
      viewProperties.constraints = {
        minScale: minScale ?? 0,
        maxScale: maxScale ?? 0
      }
    }

    try {
      const map = (await createMapFromItem({
        item: this.item,
        appProxies
      })) as __esri.WebMap;
      this.view = (await createView({
        ...viewProperties,
        map
      })) as __esri.MapView;
    } catch (e) {
      return new Error({
        title: "Error",
        message: `Unable to load ${this?.item?.title || " the application"}`,
        container
      });
    }
  }

}
export = LayoutViewModel;
