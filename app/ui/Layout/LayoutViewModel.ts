
import Accessor = require("esri/core/Accessor");

import {

  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import { LayoutProps, State } from "../../interfaces/interfaces";
import Error from "../Error";
import ApplicationBase from "../../application-base-js/ApplicationBase";
import AppConfig from "../../ConfigurationSettings";

import {
  createMapFromItem,
  createView,
  getConfigViewProperties
} from "../../application-base-js/support/itemUtils";


@subclass("esri.demo.LayoutViewModel")
class LayoutViewModel extends (Accessor) {
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
    const components = ["attribution"];
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
