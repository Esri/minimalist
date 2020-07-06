
import { ApplicationConfig } from "../application-base-js/interfaces";
import ApplicationBase from "../application-base-js/ApplicationBase";

export type VNode = {};
export type State = "ready" | "loading" | "error";
export interface SharedTheme {
  background: string,
  text: string,
  logoLink: string,
  logo: string
}
export interface LayoutProps extends __esri.WidgetProperties {
  applicationConfig: ApplicationConfig;
  applicationBase?: ApplicationBase;
  item?: __esri.PortalItem;
  view?: __esri.MapView;
}
export interface PanelProps extends __esri.WidgetProperties {
  applicationConfig: ApplicationConfig;
  applicationBase?: ApplicationBase;
  view: __esri.MapView;
  panel?: any;
}
export interface HeaderProps extends __esri.WidgetProperties {
  applicationConfig: ApplicationConfig,
  sharedTheme: SharedTheme,
  view?: __esri.MapView
}
export interface ErrorProps extends __esri.WidgetProperties {
  title: string;
  message?: string;
}
export interface ActionProps extends __esri.WidgetProperties {
  key: string;
  name: string;
  label: string;
  icon: any;
  active?: boolean;
  checked?: boolean;
}
interface ActionBarProperties extends __esri.WidgetProperties {
  actionProps: ActionProps;
  applicationConfig: ApplicationConfig;
}
interface BlockProperties extends __esri.WidgetProperties {
  appConfig: ApplicationConfig;
  view: __esri.MapView;
  action: ActionProps;
}
interface esriWidgetProps extends __esri.WidgetProperties {
  config: ApplicationConfig;
  view?: __esri.MapView;
  portal?: __esri.Portal;
  propertyName?: string;
}