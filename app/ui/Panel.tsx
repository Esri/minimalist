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
import { ActionProps, PanelProps } from "../interfaces/interfaces";

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";
import { init, when } from "esri/core/watchUtils";
import { renderable, storeNode, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import PanelViewModel from "./Panel/PanelViewModel";
import ResizeObserver from "../polyfills/ResizeObserver";
import Widget from "esri/widgets/Widget";
import { debounce } from "esri/core/promiseUtils";
import icons from "./icons/icons";

@subclass("Panel")
class Panel extends declared(Widget) {
  constructor(props: PanelProps) {
    super(props);
    this.viewModel = new PanelViewModel(props);
  }
  @aliasOf("viewModel.view")
  view: __esri.MapView;

  @property()
  viewModel: PanelViewModel;

  @property()
  @renderable([
    "applicationConfig.activePanel"])
  applicationConfig: AppConfig;

  @aliasOf("viewModel.calcitePanel")
  calcitePanel: any = null;


  @aliasOf("viewModel.actions")
  actions: ActionProps[] = [];

  postInitialize() {
    this.own([
      init(this, ["applicationConfig.legend", "applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.details"], () => {
        this.viewModel.createActions();
        this.scheduleRender();
      }),
      when(this, "calcitePanel", function () {
        init(this.view, "widthBreakpoint", () => {
          this.viewModel.updatePadding();
        });
        const rObserver = new ResizeObserver(debounce(() => this.viewModel.updatePadding()));
        rObserver.observe(this.calcitePanel);
      })
    ]);
  }

  render() {
    const {
      legend,
      details,
      popupPanel,
      activePanel,
      layoutType
    } = this.applicationConfig;
    const collapsed = (activePanel !== null) ? false : true;

    const blocks = this.renderBlocks();
    const actionBar = this.renderActionBar();
    let hide = legend || details || popupPanel ? null : "hide";
    const resizePanel = popupPanel ? "resize" : null

    return (
      <calcite-shell-panel
        collapsed={collapsed}
        class={this.classes(["primary-panel", layoutType, hide, resizePanel])}
        slot="primary-panel"
        bind={this}
        data-node-ref="calcitePanel"
        afterCreate={storeNode}
        layout="leading"
      >
        {actionBar}
        {blocks}

      </calcite-shell-panel>)


  }
  renderActionBar() {
    return <calcite-action-bar slot="action-bar"
      bind={this}
      expand="false"
      onclick={this.viewModel.actionItemClicked}
    >
      <calcite-action-group>
        {this.actions.map((action) => {
          const { active, name, label, key, icon } = action;
          return <calcite-action
            bind={this}
            active={active}
            key={key}
            data-action-item={key}
            text={name}
            label={label}
          >
            <calcite-icon scale="s" icon={icons[icon]}></calcite-icon>
          </calcite-action>
        })}

      </calcite-action-group>
    </calcite-action-bar>

  }
  renderBlocks() {
    return this.actions.map((action) => {

      return <calcite-block
        class={action.active ? null : "hide"}
        open
        key={action.key}
        heading={this.applicationConfig.layoutType !== "horizontal" ? action.label : null}
      >
        <div
          bind={this}
          afterCreate={
            this.viewModel.createActionClickFunction(action)
          }
        ></div>
      </calcite-block>
    });
  }

}
export default Panel;
