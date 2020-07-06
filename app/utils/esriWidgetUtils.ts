import { eachAlways } from "esri/core/promiseUtils";
import { esriWidgetProps } from "../interfaces/interfaces";
import Share = require("app/ui/Share/Share");

export async function addBasemap(props: esriWidgetProps) {

  const { view, config, propertyName } = props;
  const { nextBasemap, basemapTogglePosition, basemapToggle } = config;
  const BasemapToggle = await import("esri/widgets/BasemapToggle");
  if (!BasemapToggle) return;
  const node = _findNode("esri-basemap-toggle");

  // If basemapToggle isn't enabled remove the widget if it exists and exit 
  if (!basemapToggle) {
    if (node) view.ui.remove(node);
    return;
  }

  // Move the basemap toggle widget if it exists 
  if (propertyName === "basemapTogglePosition" && node) {
    view.ui.move(node, basemapTogglePosition);
  }
  // Add the basemap toggle widget if its enabled or if a different basemap was 
  // specified
  if (propertyName === "basemapToggle" || (propertyName === "nextBasemap" && node)) {
    if (node) view.ui.remove(node);

    const bmToggle = new BasemapToggle.default({
      view
    });
    if (nextBasemap) bmToggle.nextBasemap = (await _getBasemap(nextBasemap)) as __esri.Basemap;

    view.ui.add(bmToggle, basemapTogglePosition);
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

  const ScrollOverlay = await import("../ui/ScrollOverlay");

  const node = _findNode("scroll-overlay");
  if (!disableScroll) {
    if (node) view.ui.remove(node);
    // update view nav 
    view.navigation.mouseWheelZoomEnabled = true;
    view.navigation.browserTouchPanEnabled = true;

    return;
  } else {
    // add 
    const overlay = new ScrollOverlay.default({ ...props, container: document.createElement("div") });
    view.ui.add(overlay, "manual");
  }
}
export async function addHome(props: esriWidgetProps) {
  const { view, config, propertyName } = props;
  const { home, homePosition } = config;

  const Home = await import("esri/widgets/Home");
  const node = _findNode("esri-home");
  if (!home) {
    if (node) view.ui.remove(node);
    return;
  }
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

  const Zoom = await import("esri/widgets/Zoom");
  const node = _findNode("esri-zoom");
  if (!mapZoom) {
    if (node) view.ui.remove(node);
    return;
  }
  if (node && !mapZoom) view.ui.remove(node);

  if (propertyName === "mapZoomPosition" && node) {
    view.ui.move(node, mapZoomPosition);
  } else if (propertyName === "mapZoom" && !node) {
    view.ui.add(new Zoom.default({ view }), mapZoomPosition);
  }
}
export async function addScaleBar(props: esriWidgetProps) {

  const { view, portal, config, propertyName } = props;
  const { scalebar, scalebarPosition } = config;
  const ScaleBar = await import("esri/widgets/ScaleBar");
  const node = _findNode("esri-scale-bar");
  if (!scalebar) {
    if (node) view.ui.remove(node);
    return;
  }
  // move the node if it exists 
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
  const { bookmarks, bookmarksPosition } = config;

  const modules = await eachAlways([import("esri/widgets/Bookmarks"), import("esri/widgets/Expand")]);
  const [Bookmarks, Expand] = modules.map((module) => module.value);
  const node = view.ui.find("bookmarksExpand") as __esri.Expand;
  // check to see if the web map has bookmarks 
  const map = view.map as __esri.WebMap;
  const mapContainsBookmarks = map?.bookmarks?.length > 0 ? true : false;

  if (!bookmarks || !mapContainsBookmarks) {
    if (node) view.ui.remove(node);
    return;
  }
  // move the node if it exists 
  if (propertyName === "bookmarksPosition" && node) {
    view.ui.move(node, bookmarksPosition);
  } else if (propertyName === "bookmarks") {
    const content = new Bookmarks.default({
      view
    });
    const bookmarksExpand = new Expand.default({
      id: "bookmarksExpand",
      content,
      mode: "floating",
      view
    });

    view.ui.add(bookmarksExpand, bookmarksPosition);
  }
}
export async function addSearch(props: esriWidgetProps) {
  const { view, portal, config, propertyName } = props;
  const { search, searchPosition, searchConfiguration, searchOpenAtStart } = config;

  const modules = await eachAlways([import("esri/widgets/Search"), import("esri/layers/FeatureLayer"), import("esri/widgets/Expand")]);
  const [Search, FeatureLayer, Expand] = modules.map((module) => module.value);
  const node = view.ui.find("searchExpand") as __esri.Expand;
  if (!Search || !FeatureLayer || !Expand) return;
  if (!search) {
    if (node) view.ui.remove(node);
    return;
  }
  if (propertyName === "searchPosition" && node) {
    // move the node if it exists we have to type as any here 
    // due to a doc issue with move once index is doc'd remove 
    view.ui.move({ component: node, position: searchPosition, index: 0 } as any);
  } else if (propertyName === "searchOpenAtStart" && node) {
    node.expanded = searchOpenAtStart;
  } else if (propertyName === "search" || (propertyName === "searchConfiguration" && node)) {
    if (node) view.ui.remove(node);
    let sources = searchConfiguration?.sources;

    if (sources) {
      sources.forEach((source) => {
        if (source?.layer?.url) {
          source.layer = new FeatureLayer.default(source?.layer?.url);
        }
      });
    }
    const content = new Search.default({
      view,
      portal,
      ...searchConfiguration
    });
    const searchExpand = new Expand.default({
      expanded: searchOpenAtStart,
      id: "searchExpand",
      content,
      mode: "floating",
      view
    });
    view.ui.add({ component: searchExpand, position: searchPosition, index: 0 });
  }
}
export async function addShare(props: esriWidgetProps) {
  const { view, config, propertyName } = props;
  const { share, shareIncludeSocial, header, theme } = config;

  const modules = await eachAlways([import("../ui/Share/Share"), import("../ui/Share/Share/ShareFeatures")]);
  const [Share, ShareFeatures] = modules.map((module) => module.value);
  const node = view.ui.find("shareMap") as Share;


  if (!Share && !ShareFeatures) return;

  // Remove the widget if share isdisabled or if header is enabled
  if (!share || (header && node)) {
    if (node) view.ui.remove(node);
    return;
  }
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
      view,
      shareFeatures,
      container,
      isDefault: true
    });
    view.ui.add(shareWidget, "top-right");

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

