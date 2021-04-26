import { ActionProps, PanelProps } from "../interfaces/interfaces";
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";
import { init } from "esri/core/watchUtils";
import { storeNode, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import PanelViewModel from "./Panel/MobilePanelViewModel";
import Widget from "esri/widgets/Widget";
import icons from "./icons/icons";

import i18n = require("dojo/i18n!../nls/resources");

@subclass("MobilePanel")
class MobilePanel extends (Widget) {
    constructor(props: PanelProps) {
        super(props);
        this.viewModel = new PanelViewModel(props);
    }
    @property()
    view: __esri.MapView;

    @property()
    viewModel: PanelViewModel;

    @property()
    applicationConfig: AppConfig;


    @aliasOf("viewModel.actions")
    actions: ActionProps[] = [];
    @aliasOf("viewModel.mobilePanel")
    mobilePanel: any = null;

    postInitialize() {
        this.own([
            init(this, ["applicationConfig.legendPanel", "applicationConfig.layerListPanel", "applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.details"], () => {
                this.viewModel.createActions();
            })
        ]);
    }

    render() {
        const {
            theme
        } = this.applicationConfig;

        const blocks = this.renderBlocks();

        const actionBar = this.renderActionBar();

        const hide = actionBar ? null : "hide";
        actionBar ? this.view?.container.classList.remove("no-mobile") : this.view?.container.classList.add("no-mobile");
        return (
            (<div class={this.classes(["mobile-panel", hide, theme])}>
                <div data-node-ref="mobilePanel"
                    afterCreate={storeNode} bind={this} class="mobile-block-container">
                    {blocks}
                </div>
                {actionBar}
            </div>)
        )
    }

    renderActionBar() {
        return this.actions?.length > 0 ? (
            <calcite-radio-group bind={this} onclick={this.viewModel.openPanel}
                theme={this.applicationConfig.theme} >
                {
                    this.actions.map((action) => {
                        const { checked, name, label, key, icon } = action;
                        return <calcite-radio-group-item
                            bind={this}
                            checked={checked}
                            class="mobile"
                            value={name}
                            title={label}
                            data-action-item={key}
                            text={name}
                            label={label}
                        >
                            <calcite-icon scale="m" icon={icons[icon]}></calcite-icon>
                        </calcite-radio-group-item>
                    })
                }
            </calcite-radio-group>) : null;

    }
    renderBlocks() {
        const theme = this.applicationConfig.theme;
        return this.actions.length > 0 ? this.actions.map((action) => {
            return <calcite-panel
                class={action.checked ? null : "hide"}
                open
                theme
                key={action.key}
            >
                <div class={this.classes("header", "mobile-panel-header")} slot="header-content">
                    <h2>{action.label}</h2>
                    <div class="header-buttons">
                        <button class={this.classes("panel-action", "action-img-expand", theme)} title={i18n.toggle} onclick={this.viewModel.expandPanel} bind={this}>
                        </button>
                        <button onclick={this.viewModel.closePanel} class={this.classes("panel-action", theme)} title={i18n.closePanel} bind={this}>
                            <calcite-icon icon={icons["close"]}></calcite-icon>
                        </button>
                    </div>

                </div>
                <div
                    bind={this}
                    afterCreate={
                        this.viewModel.createActionClickFunction(action)
                    }
                ></div>
            </calcite-panel>
        }) : null;
    }
}
export default MobilePanel;
