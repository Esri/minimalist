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
import { HeaderProps, LayoutProps, SharedTheme, State } from "../interfaces/interfaces";
import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";
import { renderable, storeNode, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import ApplicationBase from 'ApplicationBase/ApplicationBase';
import Header from "./Header";
import LayoutViewModel from "./Layout/LayoutViewModel";
import Widget from "esri/widgets/Widget";
import { whenEqualOnce } from "esri/core/watchUtils";

const CSS = {
  base: "embed-app__layout",
  shellContainer: "calcite-shell-container",
  viewContainer: "embed-app__view-container",
  error: "embed-app__layout-error"
};

@subclass("Layout")
class Layout extends declared(Widget) {
  constructor(props: LayoutProps) {
    super(props);
  }
  initialize() {
    this.own([whenEqualOnce(this, "state", "ready", () => {
      if (this._header && !this._header?.view) {
        this._header.view = this.view;
      }
    })]);
  }

  @aliasOf("viewModel.applicationConfig")
  @renderable(["applicationConfig.title",
    "applicationConfig.header",
    "applicationConfig.theme",
    "applicationConfig.disableScroll",
    "applicationConfig.popupPanel",
    "applicationConfig.layoutType",
    "applicationConfig.legend", "applicationConfig.details"])
  applicationConfig: AppConfig;

  @aliasOf("viewModel.applicationBase")
  applicationBase: ApplicationBase;

  @aliasOf("viewModel.item")
  item: __esri.PortalItem;

  @aliasOf("viewModel.view")
  view: __esri.MapView = null;

  @aliasOf("viewModel.state")
  state: State = null;

  @property()
  viewModel: LayoutViewModel = new LayoutViewModel();

  @property()
  calciteShell: any = null;

  private _header: Header = null;

  render() {
    const { theme, header, layoutType } = this.applicationConfig;
    const headerSection = this.renderHeader();
    const loader =
      this.state === "loading" ? (
        <calcite-loader isActive></calcite-loader>
      ) : null;
    return (
      <div class={this.classes(CSS.shellContainer, header ? "header" : null)}>
        <calcite-shell
          theme={theme}
          bind={this}
          afterCreate={storeNode}
          data-node-ref="calciteShell"
        >
          {headerSection?.render()}
          <div class={this.classes(CSS.viewContainer)}>
            {loader}
            <div bind={this} class={layoutType} afterCreate={this.viewModel.createMap}></div>;
          </div>
        </calcite-shell>
      </div>
    );
  }
  protected renderHeader() {

    if (!this._header) {
      const headerProps: HeaderProps = {
        applicationConfig: this.applicationConfig,
        sharedTheme: this._createSharedTheme(),
        view: this.view
      }
      this._header = new Header(headerProps);
    }

    return this._header;
  }
  _createSharedTheme() {
    const portal = this.applicationBase?.portal;
    let sharedTheme: SharedTheme = null;
    if (portal?.portalProperties) {
      const theme = portal?.portalProperties?.sharedTheme;
      sharedTheme = {
        background: theme?.header?.background,
        text: theme?.header?.text,
        logo: theme?.logo?.small,
        logoLink: theme?.logo?.link
      }
    }
    return sharedTheme;
  }
}
export = Layout;
