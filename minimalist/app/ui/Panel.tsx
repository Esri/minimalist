import { ActionProps, PanelProps } from "../interfaces/interfaces";
import {
  aliasOf,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";
import { init } from "esri/core/watchUtils";
import { storeNode, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import PanelViewModel from "./Panel/PanelViewModel";
import Widget from "esri/widgets/Widget";
import icons from "./icons/icons";

@subclass("Panel")
class Panel extends (Widget) {
  constructor(props: PanelProps) {
    super(props);
    this.viewModel = new PanelViewModel(props);
  }
  @aliasOf("viewModel.view")
  view: __esri.MapView;

  @property()
  viewModel: PanelViewModel;

  @property()
  applicationConfig: AppConfig;

  @aliasOf("viewModel.calcitePanel")
  calcitePanel: any = null;


  @aliasOf("viewModel.actions")
  actions: ActionProps[] = [];

  postInitialize() {
    this.own([
      init(this, ["applicationConfig.legendPanel", "applicationConfig.layerListPanel", "applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.details"], () => {
        this.viewModel.createActions();
      })
    ]);
  }

  render() {
    const {
      legendPanel,
      layerListPanel,
      details,
      popupPanel,
      activePanel,
      editPanel,
      layoutType
    } = this.applicationConfig;
    // make sure the activePanel exists 
    const collapsed = (activePanel !== null && this.applicationConfig[activePanel]) ? false : true;

    const blocks = this.renderBlocks();
    const actionBar = this.renderActionBar();
    let hide = layerListPanel || legendPanel || details || popupPanel || editPanel ? null : "hide";

    const resizePanel = popupPanel ? "resize" : null

    return (
      <calcite-shell-panel
        collapsed={collapsed}
        class={this.classes(["primary-panel", layoutType, hide, resizePanel])}
        slot="primary-panel"
        bind={this}
        data-node-ref="calcitePanel"
        afterCreate={storeNode}
        width-scale={layoutType === "horizontal" ? "xl" : "m"}
        layout="leading"
      >
        {actionBar}
        {blocks}

      </calcite-shell-panel>)


  }

  renderActionBar() {
    const { layoutType } = this.applicationConfig;
    return <calcite-action-bar slot="action-bar"
      bind={this}
      expand="false"
      onclick={this.viewModel.actionItemClicked}
      expand-disabled={(layoutType === "horizontal") ? "true" : "false"}
    >
      <calcite-action-group>
        {this.actions.map((action) => {
          const { active, name, label, key, icon } = action;
          return <calcite-action
            bind={this}
            active={active}
            key={key}
            title={label}
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
    const { layoutType, theme } = this.applicationConfig;
    return this.actions.map((action) => {
      const header = (layoutType !== "horizontal" && action.key !== "edit") ? <div class="header-panel" slot="header-content">
        <h2>{action.label}</h2>
      </div> : null

      return <calcite-panel
        class={action.active ? null : "hide"}
        open
        style="margin-top:0;margin-bottom:0;"
        theme={theme}
        width-scale={layoutType === "horizontal" ? "xl" : "m"}
        key={action.key}
      >
        {header}
        <div
          bind={this}
          theme={theme}
          afterCreate={
            this.viewModel.createActionClickFunction(action)
          }
        ></div>
      </calcite-panel>
    });
  }

}
export default Panel;
