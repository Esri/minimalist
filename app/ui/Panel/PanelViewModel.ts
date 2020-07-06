
import Accessor = require("esri/core/Accessor");
import i18n = require("dojo/i18n!../../nls/resources");
import {
    property,
    subclass
} from "esri/core/accessorSupport/decorators";

import { PanelProps, ActionProps } from "../../interfaces/interfaces";
import ApplicationBase from "./../../application-base-js/ApplicationBase";
import AppConfig from "../../ConfigurationSettings";
import FeatureList from '../FeatureList';

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

    createPopup(container) {
        container.classList.add("popup-container");
        const featureList = new FeatureList({
            applicationConfig: this.applicationConfig,
            view: this.view,
            container
        });
        return featureList;
    }

    createActions() {
        const { legendPanel, details, activePanel, popupPanel } = this.applicationConfig;
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
        // if legend is already active don't make details active
        if (details) {
            actions.push({
                key: "details",
                icon: "information",
                name: i18n.tools.details,
                label: i18n.tools.details,
                active: activePanel === "details" ? true : false
            });
        }
        // if legend or details is already open don't make popup active 
        if (popupPanel) {
            actions.push({
                key: "popup",
                icon: "popup",
                name: i18n.tools.popup,
                label: i18n.tools.popup,
                active: activePanel === "popupPanel" ? true : false
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
            case "details":
                clickFunction = this.createDetails;
                break;
            case "popup":
                clickFunction = this.createPopup;
                break;
        }
        return clickFunction;
    }
    updatePadding() {
        if (this.view.widthBreakpoint !== "xsmall") {
            const layoutType = this.applicationConfig.layoutType;
            // are we RTL if so flip left to right 
            const flipDir = this.applicationBase?.direction === "rtl" ? true : false;
            //if (this.calcitePanel?.classList.contains("hide")) return;
            let offset = 0;
            if (this?.calcitePanel) {
                offset = this.calcitePanel?.classList.contains("hide") ? 0 : this.calcitePanel.offsetWidth;
            }

            if (layoutType !== "horizontal") {
                this.view.padding = {
                    ...this.view.padding,
                    [flipDir ? "right" : "left"]: offset,
                    bottom: 0
                };
            } else {
                this.view.padding = {
                    ...this.view.padding,
                    [flipDir ? "right" : "left"]: 0,
                    bottom: 0
                };
            }
        }
    }
}

export = PanelViewModel;
