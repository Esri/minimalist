import { eachAlways } from "esri/core/promiseUtils";
import { esriWidgetProps } from "../interfaces/interfaces";
import Share from "../../app/ui/Share/Share"
import Expand from "esri/widgets/Expand";
import i18n = require("dojo/i18n!../nls/resources");
import { getBasemaps, resetBasemapsInToggle } from 'TemplatesCommonLib/functionality/basemapToggle';
import { fromJSON } from "esri/geometry/support/jsonUtils";
export async function addBasemap(props: esriWidgetProps) {

  const { view, config, propertyName } = props;
  const { basemapTogglePosition, basemapToggle } = config;
  const node = view.ui.find("basemapWidget") as __esri.BasemapToggle;
  const { originalBasemap, nextBasemap } = await getBasemaps(props);
  // If basemapToggle isn't enabled remove the widget if it exists and exit 
  if (!basemapToggle) {
    if (node) {
      view.ui.remove(node);
      node.destroy();
    }
    return;
  }
  const BasemapToggle = await import("esri/widgets/BasemapToggle");
  if (!BasemapToggle) return;
  // Move the basemap toggle widget if it exists 
  if (propertyName === "basemapTogglePosition" && node) {
    view.ui.move(node, basemapTogglePosition);
  }
  // Add the basemap toggle widget if its enabled or if a different basemap was 
  // specified
  if (propertyName === "basemapToggle" && !node) {

    const bmToggle = new BasemapToggle.default({
      view,
      nextBasemap,
      id: "basemapWidget"
    });
    resetBasemapsInToggle(bmToggle, originalBasemap, nextBasemap);
    view.ui.add(bmToggle, basemapTogglePosition);
  } else if (node && (propertyName === "nextBasemap" || propertyName === "basemapSelector")) {
    if (propertyName === "nextBasemap" || propertyName === "basemapSelector") {
      resetBasemapsInToggle(node, originalBasemap, nextBasemap);
    }
  }
}
function _findNode(className: string): HTMLElement {

  const mainNodes = document.getElementsByClassName(className);
  let node = null;
  for (let j = 0; j < mainNodes.length; j++) {
    node = mainNodes[j] as HTMLElement;
  }
  return node ? node : null;

}
async function _getBasemap(id: string): Promise<__esri.Basemap> {
  const Basemap = await import("esri/Basemap");
  if (!Basemap) {
    return;
  }
  let basemap = Basemap.default.fromId(id);
  if (!basemap) {
    basemap = await new Basemap.default({
      portalItem: {
        id
      }
    }).loadAll();
  }
  return basemap as __esri.Basemap;
}
export async function addOverlay(props: esriWidgetProps) {
  const { view, config } = props;
  const { disableScroll } = config;

  const node = _findNode("scroll-overlay");
  if (!disableScroll) {
    if (node) view.ui.remove(node);
    // update view nav 
    view.navigation.mouseWheelZoomEnabled = true;
    view.navigation.browserTouchPanEnabled = true;

    return;
  } else {
    const ScrollOverlay = await import("../ui/ScrollOverlay");
    // add 
    const overlay = new ScrollOverlay.default({ ...props, container: document.createElement("div") });
    view.ui.add(overlay, "manual");
  }
}
export async function addHome(props: esriWidgetProps) {
  const { view, config, propertyName } = props;
  const { home, homePosition } = config;

  const node = _findNode("esri-home");
  if (!home) {
    if (node) view.ui.remove(node);
    return;
  }
  const Home = await import("esri/widgets/Home");
  if (node && !home) view.ui.remove(node);

  if (propertyName === "homePosition" && node) {
    view.ui.move(node, homePosition);
  } else if (propertyName === "home") {
    view.ui.add(new Home.default({ view }), homePosition);
  }
}

export async function addZoom(props: esriWidgetProps) {
  const { view, config, propertyName } = props;
  const { mapZoom, mapZoomPosition } = config;

  const node = _findNode("esri-zoom");
  if (!mapZoom) {
    if (node) view.ui.remove(node);
    return;
  }
  if (node && !mapZoom) view.ui.remove(node);
  const Zoom = await import("esri/widgets/Zoom");
  if (propertyName === "mapZoomPosition" && node) {
    view.ui.move(node, mapZoomPosition);
  } else if (propertyName === "mapZoom" && !node) {
    view.ui.add(new Zoom.default({ view }), mapZoomPosition);
  }
}
export async function addScreenshot(props: esriWidgetProps) {

  const { view, config, propertyName } = props;
  const { screenshot, screenshotPosition, legendPanel, popupPanel, popupHover } = config;

  const node = view.ui.find("screenshotExpand") as __esri.Expand;
  if (!screenshot) {
    if (node) view.ui.remove(node);
    return;
  }
  const Screenshot = await import("Components/Screenshot/Screenshot");
  const group = _getPosition(screenshotPosition);
  if (propertyName === "screenshotPosition" && node) {
    view.ui.move(node, screenshotPosition);
    node.group = group;
  } else if (propertyName === "screenshot") {
    const content = new Screenshot.default({
      view,
      enableLegendOption: false,
      enablePopupOption: (popupPanel || popupHover) ? false : true,
      includeLayoutOption: (popupPanel || popupHover) ? false : true,
      includePopupInScreenshot: false,
      includeLegendInScreenshot: false
    });
    const tip = `${i18n.tools.toggle} ${i18n.tools.screenshot}`
    const screenshotExpand = new Expand({
      id: "screenshotExpand",
      content,
      group,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: tip,
      view
    });
    view.ui.add(screenshotExpand, screenshotPosition);
  }
}
export async function addScaleBar(props: esriWidgetProps) {

  const { view, portal, config, propertyName } = props;
  const { scalebar, scalebarPosition } = config;

  const node = _findNode("esri-scale-bar");
  if (!scalebar) {
    if (node) view.ui.remove(node);
    return;
  }
  // move the node if it exists 
  const ScaleBar = await import("esri/widgets/ScaleBar");
  if (propertyName === "scalebarPosition" && node) {
    view.ui.move(node, scalebarPosition);
  } else if (propertyName === "scalebar") {
    view.ui.add(new ScaleBar.default({
      view,
      unit: portal?.units === "metric" ? portal?.units : "non-metric"
    }), scalebarPosition);
  }
}
export async function addBookmarks(props: esriWidgetProps) {

  const { view, config, propertyName } = props;
  const { bookmarks, bookmarksPosition, bookmarkThumbnail } = config;

  const node = view.ui.find("bookmarksExpand") as __esri.Expand;
  // check to see if the web map has bookmarks 
  const map = view.map as __esri.WebMap;
  const mapContainsBookmarks = map?.bookmarks?.length > 0 ? true : false;

  if (!bookmarks || !mapContainsBookmarks) {
    if (node) view.ui.remove(node);
    return;
  }
  const modules = await eachAlways([import("esri/widgets/Bookmarks"), import("esri/widgets/Expand")]);
  const [Bookmarks, Expand] = modules.map((module) => module.value);
  const group = _getPosition(bookmarksPosition);
  if (propertyName === "bookmarksPosition" && node) {
    view.ui.move(node, bookmarksPosition);
    node.group = group;
  } else if (propertyName === "bookmarks") {
    const content = new Bookmarks.default({
      view,
      visibleElements: {
        thumbnail: bookmarkThumbnail === false ? false : true
      }
    });

    const tip = `${i18n.tools.toggle} ${i18n.tools.bookmarks}`
    const bookmarksExpand = new Expand.default({
      id: "bookmarksExpand",
      content,
      group,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: tip,
      view
    });

    view.ui.add(bookmarksExpand, bookmarksPosition);
  } else if (propertyName === "bookmarkThumbnail" && node) {
    const bm = node.content as any;
    if (bm?.visibleElements)
      bm.visibleElements = { thumbnail: bookmarkThumbnail }
  }
}
export async function addSearch(props: esriWidgetProps) {
  const { view, portal, config, propertyName } = props;
  const { search, searchPosition, searchConfiguration, searchOpenAtStart, extentSelector, extentSelectorConfig } = config;
  const node = view.ui.find("searchExpand") as __esri.Expand;

  if (!search) {
    if (node) view.ui.remove(node);
    return;
  }
  const modules = await eachAlways([import("esri/widgets/Search"), import("esri/layers/FeatureLayer"), import("esri/widgets/Expand")]);
  const [Search, FeatureLayer, Expand] = modules.map((module) => module.value);

  if (!Search || !FeatureLayer || !Expand) return;
  const group = _getPosition(searchPosition);
  if (propertyName === "searchPosition" && node) {
    // move the node if it exists we have to type as any here 
    // due to a doc issue with move once index is doc'd remove 
    view.ui.move(node, searchPosition);
    node.group = group;
  } else if (propertyName === "searchOpenAtStart" && node) {
    node.expanded = searchOpenAtStart;
  } else if (propertyName === "search" || (propertyName === "extentSelector" && node) || (node && propertyName === "extentSelector") || (propertyName === "searchConfiguration" && node)) {
    if (node) view.ui.remove(node);
    let sources = searchConfiguration?.sources;
    if (sources) {
      let extent = null;
      if (extentSelector) {
        const geometry = extentSelectorConfig?.constraints?.geometry || null;
        if (geometry) {
          extent = fromJSON(geometry);
        }
      }
      sources.forEach((source) => {

        let sourceLayer = null;
        if (source?.layer?.id) sourceLayer = view.map.findLayerById(source.layer.id);
        if (!sourceLayer && source?.layer?.url) {
          sourceLayer = new FeatureLayer.default(source?.layer?.url);
        }
        source.outFields = ["*"];
        source.layer = sourceLayer;
        if (extent && (extent?.type === "extent" || extent?.type === "polygon")) {
          source.filter = {
            geometry: extent
          }
        } else {
          source.filter = null;
        }
      });
    }
    const content = new Search.default({
      view,
      portal,
      ...searchConfiguration
    });
    const tip = `${i18n.tools.toggle} ${i18n.tools.search}`;
    const searchExpand = new Expand.default({
      expanded: searchOpenAtStart,
      id: "searchExpand",
      content,
      group,
      collapseTooltip: tip,
      expandTooltip: tip,
      mode: "floating",
      view
    });
    view.ui.add(searchExpand, searchPosition);
  }
}
export async function addShare(props: esriWidgetProps) {
  const { view, config, propertyName } = props;
  const { share, shareIncludeSocial, header, theme } = config;

  const node = view.ui.find("shareMap") as Share;

  // Remove the widget if share isdisabled or if header is enabled
  if (!share || (header && node)) {
    if (node) view.ui.remove(node);
    return;
  }
  const modules = await eachAlways([import("../ui/Share/Share"), import("../ui/Share/Share/ShareFeatures")]);
  const [Share, ShareFeatures] = modules.map((module) => module.value);
  if (!Share && !ShareFeatures) return;
  // Only add sharing to view if header is false 
  if ((propertyName === "share" || propertyName === "header") && !header && !node) {
    const shareFeatures = new ShareFeatures.default({
      copyToClipboard: true,
      embedMap: false,
      shareServices: shareIncludeSocial
    });
    const container = document.createElement("div");
    container.classList.add("esri-map-share");
    container.classList.add(theme);
    container.id = "shareMap";
    const shareWidget = new Share.default({
      config,
      view,
      shareFeatures,
      theme,
      container,
      isDefault: true
    });
    if (!view.ui.find("shareMap")) {
      view.ui.add(shareWidget, "top-right");
    }
  } else if (propertyName === "shareIncludeSocial" && node) {
    node.shareFeatures.shareServices = shareIncludeSocial;
  } else if (propertyName === "theme") {
    // Change view theme 
    if (node) node.theme = theme;
    // change container theme 
    const container = document.getElementsByClassName("esri-map-share");
    if (container?.length > 0) {
      container[0].classList.remove(theme === "dark" ? "light" : "dark");
      container[0].classList.add(theme);
    }


  }
}

function _getPosition(position) {
  // object or string 
  let groupName = null;
  if (typeof position === "string") {
    groupName = position
  } else if (position?.position) {
    groupName = position.position;
  }
  return groupName;
}