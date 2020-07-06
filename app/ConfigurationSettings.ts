import {
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import Accessor from "esri/core/Accessor";
import { ApplicationConfig } from "./application-base-js/interfaces";

type UIPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-leading"
  | "top-trailing"
  | "bottom-leading"
  | "bottom-trailing";

type PanelType = "details" | "legendPanel" | "popupPanel";
@subclass("app.ConfigurationSettings")
class ConfigurationSettings extends (Accessor) {
  @property()
  webmap: string;

  @property()
  mapZoom: boolean;

  @property()
  mapZoomPosition: UIPosition;


  @property()
  maxScale: number;

  @property()
  minScale: number;

  @property()
  theme: string;

  @property()
  title: string;

  @property()
  activePanel: PanelType = null;
  @property()
  details: boolean;

  @property()
  detailsContent: string;


  @property()
  header: boolean;

  @property()
  logo: string;

  @property()
  logoLink: string;
  @property()
  applySharedTheme: boolean;

  @property()
  popupPanel: boolean;

  @property()
  popupHover: boolean;

  @property()
  legendPanel: boolean;

  @property()
  bookmarks: boolean;

  @property()
  bookmarksPosition: UIPosition;

  @property()
  disableScroll: boolean;

  @property()
  layoutType: string;

  @property()
  basemapToggle: boolean;

  @property()
  basemapTogglePosition: UIPosition;

  @property()
  nextBasemap: string;

  @property()
  search: boolean;
  @property()
  searchPosition: UIPosition;
  @property()
  searchConfiguration: any;
  @property()
  searchOpenAtStart: boolean;

  @property()
  scalebar: boolean;

  @property()
  scalebarPosition: UIPosition;

  @property()
  home: boolean;

  @property()
  homePosition: UIPosition;

  @property()
  share: boolean;

  @property()
  shareIncludeSocial: boolean;

  @property()
  withinConfigurationExperience: boolean =
    window.location !== window.parent.location;

  _storageKey = "config-values";
  _draft: ApplicationConfig = null;
  _draftMode: boolean = false;
  constructor(params?: ApplicationConfig) {

    super(params);
    this._draft = params?.draft;
    this._draftMode = params?.mode === "draft";
  }
  initialize() {
    if (this.withinConfigurationExperience || this._draftMode) {
      // Apply any draft properties
      if (this._draft) {
        Object.assign(this, this._draft);
      }

      window.addEventListener(
        "message",
        function (e) {
          this._handleConfigurationUpdates(e);
        }.bind(this),
        false
      );
    }
  }

  _handleConfigurationUpdates(e) {
    if (e?.data?.type === "cats-app") {
      Object.assign(this, e.data);
    }
  }

}
export = ConfigurationSettings;
