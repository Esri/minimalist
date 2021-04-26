

import { PanelProps } from "../../interfaces/interfaces";
import { property, subclass } from "esri/core/accessorSupport/decorators";

import PanelViewModel = require("./PanelViewModel");

@subclass("esri.demo.PanelViewModel")
class MobilePanelViewModel extends (PanelViewModel) {

    @property()
    mobilePanel: HTMLElement = null;
    constructor(props?: PanelProps) {
        super(props);
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
        this.mobilePanel.classList.toggle("full")
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
        if (this?.featureList) {
            this.featureList.features = null;
            this.featureList.clearHighlight();
        }

        if (this.view?.popup?.selectedFeature) {
            this.view.popup.clear();
        }

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

export = MobilePanelViewModel;
