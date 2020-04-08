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

import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import { init, whenEqual } from "esri/core/watchUtils";
import { renderable, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import PanelViewModel from "./Panel/MobilePanelViewModel";
import Widget from "esri/widgets/Widget";
import icons from "./icons/icons";

import i18n = require("dojo/i18n!../nls/resources");

@subclass("MobilePanel")
class MobilePanel extends declared(Widget) {
    constructor(props: PanelProps) {
        super(props);
        this.viewModel = new PanelViewModel(props);
    }
    @property()
    view: __esri.MapView;

    @property()
    viewModel: PanelViewModel;

    @property()
    @renderable([
        "theme", "applicationConfig.activePanel"])
    applicationConfig: AppConfig;


    @aliasOf("viewModel.actions")
    actions: ActionProps[] = [];

    postInitialize() {
        this.own([
            init(this, ["applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.legend", "applicationConfig.details"], () => {
                this.viewModel.createActions();
            }),
            whenEqual(this.view, "widthBreakpoint", "xsmall", () => {
                const bottom = this.applicationConfig.activePanel !== null ? 50 : 30;
                this.view.padding = {
                    ...this.view.padding,
                    left: 0,
                    bottom
                };
            })
        ]);
    }

    render() {
        // always true on mobile
        const {
            legend,
            details,

            theme
        } = this.applicationConfig;
        const popupPanel = true;
        const blocks = this.renderBlocks();
        const actionBar = this.renderActionBar();

        let hide = legend || details || popupPanel ? null : "hide";
        return (
            <div class={this.classes(["mobile-panel", hide, theme])}>
                <div class="mobile-block-container">
                    {blocks}
                </div>
                {actionBar}
            </div>
        )
    }

    renderActionBar() {
        return <calcite-radio-group bind={this} onclick={this.viewModel.openPanel} theme={this.applicationConfig.theme} >
            {
                this.actions.map((action) => {
                    const { checked, name, label, key, icon } = action;
                    return <calcite-radio-group-item
                        bind={this}
                        checked={checked}
                        class="mobile"
                        value={name}
                        data-action-item={key}
                        text={name}
                        label={label}
                    >
                        <calcite-icon scale="m" icon={icons[icon]}></calcite-icon>
                    </calcite-radio-group-item>
                })
            }
        </calcite-radio-group>

    }
    renderBlocks() {
        const theme = this.applicationConfig.theme;
        return this.actions.map((action) => {
            return <calcite-block
                class={action.checked ? null : "hide"}
                open
                theme
                key={action.key}
                heading={action.label}
            >
                {<div slot="control">
                    <button class={this.classes("panel-action", "action-img-expand", theme)} title={i18n.toggle} onclick={this.viewModel.expandPanel} bind={this}>
                    </button>
                    <button onclick={this.viewModel.closePanel} class={this.classes("panel-action", theme)} title={i18n.closePanel} bind={this}>
                        <calcite-icon icon={icons["close"]}></calcite-icon>
                    </button>
                </div>}
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
export default MobilePanel;
