
import Accessor = require("esri/core/Accessor");
import i18n = require("dojo/i18n!../../nls/resources");
import {
    property,
    subclass
} from "esri/core/accessorSupport/decorators";

import { PanelProps, ActionProps } from "../../interfaces/interfaces";
import ApplicationBase from "ApplicationBase/ApplicationBase";
import AppConfig from "../../ConfigurationSettings";
import FeatureList from '../FeatureList';
import { init, once } from 'esri/core/watchUtils';

@subclass("esri.demo.PanelViewModel")
class PanelViewModel extends (Accessor) {

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
    @property()
    calcitePanel: any = null;
    @property() featureList = null;

    @property()
    focusedItem: HTMLElement = null;

    createDetails(container) {

        const { detailsContent, withinConfigurationExperience } = this.applicationConfig;
        const map = this.view.map as __esri.WebMap;
        const content =
            detailsContent ||
            map.portalItem.description ||
            null;
        const detailDiv = document.createElement("div");
        container.id = "details";
        container.style = "padding-left:0.25em;padding-right:0.25em;"
        container.setAttribute("tabindex", "0")
        detailDiv.innerHTML = content;
        if (withinConfigurationExperience) {
            // update content if within config experience
            this.applicationConfig.watch("detailsContent", () => {
                detailDiv.innerHTML = this.applicationConfig.detailsContent;
            });
        }
        return container.append(detailDiv);
    }
    async createLayerList(container: HTMLElement) {
        const layerContainer = document.createElement("div") as HTMLDivElement;
        layerContainer.tabIndex = 0;
        container.id = "layerListPanel";
        container.append(layerContainer);
        const LayerList = await import("esri/widgets/LayerList");
        return new LayerList.default({
            view: this.view,
            container
        });

    }
    async createLegend(container: HTMLElement) {

        const legendDiv = document.createElement("div");
        container.setAttribute("tabindex", "0");
        container.id = "legendPanel";
        container.append(legendDiv);
        const Legend = await import("esri/widgets/Legend");
        const legendWidget = new Legend.default({
            view: this.view,
            style: this.applicationConfig.layoutType === "horizontal" ? {
                type: "card",
                layout: "auto"
            } : "classic",
            container
        });
        init(this.applicationConfig, "layoutType", () => {
            if (legendWidget?.style) {
                legendWidget.style = this.applicationConfig.layoutType === "horizontal" ? {
                    type: "card",
                    layout: "auto"
                } : "classic";
            }
        });
        return legendWidget;
    }

    createPopup(container) {
        container.classList.add("popup-container");
        container.setAttribute("tabindex", "0");
        container.id = "popupPanel";
        this.featureList = new FeatureList({
            applicationConfig: this.applicationConfig,
            view: this.view,
            container
        });

    }
    async createEditor(container) {
        const { editLayers, allowedWorkflows } = this.applicationConfig;
        const editorDiv = document.createElement("div");
        editorDiv.tabIndex = 0;
        container.id = "editorPanel";
        container.append(editorDiv);
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("hide");
        errorDiv.innerHTML = i18n.editPanel.noEditableLayersMessage;
        container.append(errorDiv);

        const Editor = await import("esri/widgets/Editor");
        const editWidget = new Editor.default({
            view: this.view,
            allowedWorkflows,
            container
        });
        if (editLayers) {
            editWidget.layerInfos = editLayers;
        }
        once(editWidget.viewModel, "editableItems", () => {
            editWidget.viewModel.editableItems.length === 0 ? errorDiv.classList.remove("hide") : errorDiv.classList.add("hide");
        });

        return editWidget;

    }
    createActions() {
        const { legendPanel, layerListPanel, details, activePanel, popupPanel, editPanel } = this.applicationConfig;

        const actions = [];
        if (legendPanel) {
            actions.push({
                key: "legendPanel",
                icon: "legend",
                name: i18n.tools.legend,
                label: i18n.tools.legend,
                active: activePanel === "legendPanel" ? true : false
            });
        }

        if (details) {
            actions.push({
                key: "details",
                icon: "information",
                name: i18n.tools.details,
                label: i18n.tools.details,
                active: activePanel === "details" ? true : false
            });
        }
        if (layerListPanel) {
            actions.push({
                key: "layerListPanel",
                icon: "layerList",
                name: i18n.tools.layerList,
                label: i18n.tools.layerList,
                active: activePanel === "layerListPanel" ? true : false
            });
        }

        if (popupPanel) {
            actions.push({
                key: "popup",
                icon: "popup",
                name: i18n.tools.popup,
                label: i18n.tools.popup,
                active: activePanel === "popupPanel" ? true : false
            })
        }
        if (editPanel) {
            actions.push({
                key: "edit",
                icon: "edit",
                name: i18n.tools.edit,
                label: i18n.tools.edit,
                active: activePanel === "editPanel" ? true : false
            })
        }
        this.actions = actions;
    }

    actionItemClicked(e) {
        // the panels are empty 
        const activeAction = e?.target as any;
        const name = activeAction?.dataset?.actionItem;
        this.actions.forEach((action) => {
            if (name === action.key) {
                action.active = !activeAction.active;
            } else { // hide others 
                action.active = false;
            }
        });

        // Collapse the panel if there aren't any active tools
        const isActive = this.actions.some(a => {
            return a.active;
        });

        this.calcitePanel.collapsed = isActive ? false : true;

    }
    createActionClickFunction(action) {
        let clickFunction = null;
        switch (action.key) {
            case "legendPanel":
                clickFunction = this.createLegend;
                break;
            case "layerListPanel":
                clickFunction = this.createLayerList;
                break;
            case "details":
                clickFunction = this.createDetails;
                break;
            case "popup":
                clickFunction = this.createPopup;
                break;
            case "edit":
                clickFunction = this.createEditor;
                break;
        }
        return clickFunction;
    }
}

export = PanelViewModel;
