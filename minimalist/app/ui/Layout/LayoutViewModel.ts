
import Accessor = require("esri/core/Accessor");

import {

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
import { whenDefinedOnce, whenFalseOnce } from 'esri/core/watchUtils';


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
  initialExtent: __esri.Extent;

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
      const view = (await createView({
        ...viewProperties,
        map
      })) as __esri.MapView;

      this.view = await view.when();
      if (this?.applicationConfig?.hiddenLayers) {
        const ids = this.applicationConfig.hiddenLayers.split(",");
        whenFalseOnce(this.view, "updating", () => {
          this.view.allLayerViews.forEach(lv => {
            const layerId = lv?.layer?.id || null;
            // Get default layer visiblity 
            let hidden = lv?.layer?.visible ? false : true;
            hidden = ids.some((id) => {
              if (id === layerId) {
                return true;
              }
            });
            if (lv?.layer) {
              lv.layer.visible = !hidden;
            }
          });
        });

      }
      const ariadesc = this?.applicationConfig?.mapA11yDesc || portalItem?.snippet || portalItem?.description || null;
      if (ariadesc) {
        document.getElementById('mapDescription').innerHTML = ariadesc;
        const rootNode = document.getElementsByClassName('esri-view-surface');
        this.view.container.setAttribute("aria-describedby", 'mapDescription')
        for (let k = 0; k < rootNode.length; k++) {
          rootNode[k].setAttribute('aria-describedby', 'mapDescription');
        }
      }
      whenDefinedOnce(this.view, "extent", () => {
        this.initialExtent = this.view.extent.clone();
      });

    } catch (e) {
      return new Error({
        title: "Error",
        message: `Unable to load ${this?.item?.title || " the application"}`,
        container
      });
    }
  }
  public resetExtent() {
    if (this.initialExtent)
      this.view.goTo(this.initialExtent).catch(() => { });
  }
}
export = LayoutViewModel;
