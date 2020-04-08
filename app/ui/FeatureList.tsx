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
import {
    declared,
    property,
    subclass
} from "esri/core/accessorSupport/decorators";
import { init, once, whenOnce } from 'esri/core/watchUtils';
import { renderable, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import Feature from "esri/widgets/Feature";
import { PanelProps } from '../interfaces/interfaces';
import Widget from "esri/widgets/Widget";

import i18n = require("dojo/i18n!../nls/resources");

@subclass("FeatureList")
class FeatureList extends declared(Widget) {

    @property()
    @renderable(["applicationConfig.popupPanel"])
    applicationConfig: AppConfig;

    @property()
    view: __esri.MapView;

    @property()
    @renderable()
    features: __esri.Graphic[] = [];

    @property() selectionCount: number;
    @property() selectedItem: __esri.Graphic;
    @property() highlightHandle: IHandle;
    _clickHandle: IHandle = null;
    constructor(props: PanelProps) {
        super(props);
    }
    initialize() {
        this.own([init(this, ["applicationConfig.popupPanel", "view.widthBreakpoint"], () => {
            if (this.applicationConfig.popupPanel || this?.view?.widthBreakpoint === "xsmall") {
                this.view.popup.autoOpenEnabled = false;
                this.view.popup.highlightEnabled = false;

                if (!this._clickHandle) {
                    whenOnce(this, "view.ready", () => {
                        this._clickHandle = this.view.on("click", async (event: any) => {
                            this.features = null;
                            this.clearHighlight();
                            // TODO: as any is until jsapi doc is updated 
                            const response = await this.view.popup.fetchFeatures(event.screenPoint) as any;
                            const results = await response.allGraphicsPromise;
                            this.displayResults(results);
                        });
                    });
                }
            } else {
                this._cleanUp();
                /*if (this._clickHandle) {
                    try {
                        this._clickHandle.remove();
                    } catch (error) {

                    }
                }*/
            }
        }), init(this, "selectedItem", () => {
            this.clearHighlight();
            if (this.selectedItem && this.view) {
                this.view.whenLayerView(this.selectedItem.layer).then((layerview: __esri.FeatureLayerView) => {
                    if (layerview.highlight) {
                        this.highlightHandle = layerview.highlight(this.selectedItem);
                    }
                });
            }
        })]);
    }
    _cleanUp() {
        if (this?.view && this.view.widthBreakpoint !== "xsmall") {
            this.view.popup.autoOpenEnabled = true;
            this.view.popup.highlightEnabled = true;
        }
        this.features = null;
        this.clearHighlight();
    }
    displayResults(results) {
        this.features = results;
        // open the popup action panel if not already open 
        // Find the desktop or mobile popup action 
        const actionExpression = this.view.widthBreakpoint === "xsmall" ? "calcite-radio-group-item[data-action-item='popup']" : "calcite-action[data-action-item='popup']";

        const action = document.querySelector(actionExpression) as any;
        if (!action) {
            //Not mobile or popup panel so clean up
            this._cleanUp();
            return;
        }
        const notActive = (this.view.widthBreakpoint === "xsmall") ? !action.hasAttribute("checked") : !action.hasAttribute("active");
        if (this.features?.length > 0 && action && notActive) { action.click() };
        // highlight feature 
        if (this.features?.length > 0) this.selectedItem = this.features[0];
    }
    render() {
        const featureList = this.features?.length > 0 ? this.renderFeatures() : null;
        const noResultsMessage = this.features?.length === 0 ? i18n.popupPanel.noResultsMessage : null;
        return (
            <div>
                {featureList}
                {noResultsMessage}
            </div>
        );
    }
    renderFeatures() {
        return this.features.map((feature, index) => {
            return <calcite-block
                key={`feature${index}`}
                open={index == 0 ? true : false}
                bind={this}
                class={(index === 0 && this.features.length > 1) ? "active-popup" : null}
                collapsible={this.features.length > 1 ? true : false}
                data-feature={feature}
                afterCreate={this.createFeature}
            >
            </calcite-block>
        });

    }
    createFeature(container) {
        const graphic = container['data-feature'];
        if (graphic && graphic.popupTemplate) {
            graphic.popupTemplate.outFields = ["*"];
        }
        const feature = new Feature({
            graphic,
            defaultPopupTemplateEnabled: true,
            map: this.view.map,
            spatialReference: this.view.spatialReference,
            visibleElements: {
                title: false
            },
            container
        });
        // add zoom button 
        const zoomButton = document.createElement("calcite-button") as any;
        zoomButton.color = this.applicationConfig.theme;
        zoomButton.theme = this.applicationConfig.theme;
        zoomButton.classList.add("zoom-button");
        zoomButton.scale = "xs";
        zoomButton.innerHTML = `<calcite-icon scale="s"  icon="magnifyingGlass"></calcite-icon>`;
        zoomButton.addEventListener("click", () => {
            if (this.view && graphic) {
                this.view.goTo(graphic);
            }
        });
        container.append(zoomButton);
        // handle click on feature 
        container.addEventListener("click", () => {
            this.clearHighlight();
            this.selectedItem = graphic;
            // activate item 
            this.activateItem(container);
            this.view.whenLayerView(graphic?.layer).then((layerView) => {
                if (layerView?.highlight) {
                    this.highlightHandle = layerView.highlight(graphic);
                }
            });
        });

        // add title 
        once(feature, "title", () => {
            const title = feature.get("title");
            container.summary = title;
        });
    }
    activateItem(container) {
        // highlight selected popup feature and remove others 
        const elements = document.getElementsByClassName("active-popup")
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active-popup");
        }
        // if (elements?.length > 1) {
        container.classList.add("active-popup");
        // }

    }
    clearHighlight() {
        if (this.highlightHandle) {
            try {
                this.highlightHandle.remove();
            } catch (error) {

            }
        }
    }
    destroy() {
        this.highlightHandle && this.highlightHandle.remove();
        this._clickHandle && this._clickHandle.remove();
    }
}
export default FeatureList;
