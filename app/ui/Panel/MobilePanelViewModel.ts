
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

import Accessor = require("esri/core/Accessor");
import i18n = require("dojo/i18n!../../nls/resources");

import { ActionProps, PanelProps } from "../../interfaces/interfaces";
import { declared, property, subclass } from "esri/core/accessorSupport/decorators";

import AppConfig from "../../ConfigurationSettings";
import ApplicationBase from "ApplicationBase/ApplicationBase";
import FeatureList from '../FeatureList';

@subclass("esri.demo.PanelViewModel")
class PanelViewModel extends declared(Accessor) {

    constructor(props?: PanelProps) {
        super(props);
    }
    @property()
    applicationConfig: AppConfig;

    @property()
    applicationBase: ApplicationBase;

    @property()
    actions: ActionProps[] = [];

    @property() view: __esri.MapView = null;
    _featureList: FeatureList = null;
    init() {

    }
    createDetails(container) {
        const { detailsContent, withinConfigurationExperience } = this.applicationConfig;
        const map = this.view.map as __esri.WebMap;
        const content =
            detailsContent ||
            map.portalItem.description ||
            null;
        const detailDiv = document.createElement("div");
        detailDiv.innerHTML = content;
        if (withinConfigurationExperience) {
            // update content if within config experience
            this.applicationConfig.watch("detailsContent", () => {
                detailDiv.innerHTML = this.applicationConfig.detailsContent;
            });
        }

        return container.append(detailDiv);
    }
    createPopup(container) {
        container.classList.add("popup-container");
        this._featureList = new FeatureList({
            applicationConfig: this.applicationConfig,
            view: this.view,
            container
        });
    }
    createActionClickFunction(action) {
        let clickFunction = null;
        switch (action.key) {
            case "legend":
                clickFunction = this.createLegend;
                break;
            case "details":
                clickFunction = this.createDetails;
                break;
            case "popup":
                clickFunction = this.createPopup;
                break;
        }
        return clickFunction;
    }
    async createLegend(container: HTMLElement) {
        const legendDiv = document.createElement("div");
        container.append(legendDiv);
        const Legend = await import("esri/widgets/Legend");
        return new Legend.default({
            view: this.view,
            style: this.applicationConfig.layoutType === "horizontal" ? {
                type: "card",
                layout: "auto"
            } : "classic",
            container
        });
    }

    createActions() {
        const { legend, details, activePanel } = this.applicationConfig; const actions = [];
        const popupPanel = true;
        if (legend) {
            actions.push({
                key: "legend",
                icon: "legend",
                name: i18n.tools.legend,
                label: i18n.tools.legend,
                checked: activePanel === "legend" ? true : false
            });
        }
        // if legend is already active don't make details active
        if (details) {
            actions.push({
                key: "details",
                icon: "information",
                name: i18n.tools.details,
                label: i18n.tools.details,
                checked: activePanel === "details" ? true : false
            });
        }
        if (popupPanel) {
            // make sure we have a layer with popups enabled
            actions.push({
                key: "popup",
                icon: "popup",
                name: i18n.tools.popup,
                label: i18n.tools.popup,
                checked: activePanel === "popup" ? true : false
            })
        }
        this.actions = actions;
    }
    expandPanel(e) {
        // move height to max height (add a class) then change arrow to down 
        const container = e.target;
        const block = e?.target?.parentNode?.parentNode;

        if (!container && !block) return;
        if (container.classList.contains("action-img-expand")) {
            // remove expand and add collapse
            container.classList.add("action-img-collapse");
            container.classList.remove("action-img-expand");
        } else {
            container.classList.remove("action-img-collapse");
            container.classList.add("action-img-expand");
        }
        block.parentNode.classList.toggle("full");
        block.theme = this.applicationConfig.theme;
    }
    closePanel(e) {

        // search for mobile block container (full) and remove full class
        const nodes = document.getElementsByClassName("mobile-block-container full");
        for (let index = 0; index < nodes.length; index++) {
            const element = nodes[index];
            const buttonNodes = element.getElementsByClassName("action-img-collapse");
            element.classList.remove("full");
            for (let i = 0; i < buttonNodes.length; index++) {
                const node = buttonNodes[index];
                node.classList.remove("action-img-collapse");
                node.classList.add("action-img-expand");
            }
        }
        // close everything 
        this.actions.forEach((action) => {
            action.checked = false;
        });
        this._featureList.features = null;
        this._featureList.clearHighlight();
    }
    openPanel(e) {
        // open selected 
        const item = e.target;
        const value = item?.value;
        // open selected close others 
        this.actions.forEach((action) => {
            if (value === action.name) {
                action.checked = true;
            } else { // hide others 
                action.checked = false;
            }
        });
    }
    destroy() {

    }
}

export = PanelViewModel;
