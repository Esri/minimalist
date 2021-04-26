import {
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import ConfigurationSettingsBase from 'TemplatesCommonLib/baseClasses/configurationSettingsBase';
interface IExtentSelectorOutput { constraints: __esri.MapViewConstraints; mapRotation: number; }

type UIPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-leading"
  | "top-trailing"
  | "bottom-leading"
  | "bottom-trailing";
type PanelType = "details" | "legendPanel" | "layerListPanel" | "popupPanel" | "editPanel";
@subclass("app.ConfigurationSettings")
class ConfigurationSettings extends (ConfigurationSettingsBase) {
  @property()
  webmap: string;

  @property()
  extentSelectorConfig: IExtentSelectorOutput;
  @property()
  extentSelector: boolean;


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
  googleAnalytics: boolean;
  @property()
  googleAnalyticsKey: string;
  @property()
  googleAnalyticsConsentMsg: string;
  @property()
  googleAnalyticsConsent: boolean;
  @property()
  telemetry: any;

  @property()
  activePanel: PanelType = null;
  @property()
  details: boolean;

  @property()
  detailsContent: string;

  @property()
  customCSS: string;

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
  layerListPanel: boolean;
  @property()
  hiddenLayers: any;
  @property()
  editPanel: boolean;
  @property()
  allowedWorkflows: string[];
  @property()
  editLayers: any;

  @property()
  bookmarks: boolean;

  @property()
  bookmarksPosition: UIPosition;

  @property()
  bookmarkThumbnail: boolean;

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
  basemapSelector: string;
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
  screenshot: boolean;
  @property()
  screenshotPosition: UIPosition;

  @property()
  home: boolean;

  @property()
  homePosition: UIPosition;

  @property()
  share: boolean;

  @property()
  shareIncludeSocial: boolean;
  @property()
  mapA11yDesc: string;

  @property()
  customUrlParam: any;

  @property()
  customURLParamName: any;
}
export = ConfigurationSettings;
