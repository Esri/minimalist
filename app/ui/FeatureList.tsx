import {
    property,
    subclass
} from "esri/core/accessorSupport/decorators";
import { init, once, whenOnce } from 'esri/core/watchUtils';
import { renderable, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import Feature from "esri/widgets/Feature";
import { debounce } from "esri/core/promiseUtils";
import { PanelProps } from '../interfaces/interfaces';
import Widget from "esri/widgets/Widget";

import i18n = require("dojo/i18n!../nls/resources");

@subclass("FeatureList")
class FeatureList extends (Widget) {

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
        this.own([init(this, ["applicationConfig.popupPanel", "applicationConfig.popupHover", "view.widthBreakpoint"], () => {
            const { popupPanel, popupHover } = this.applicationConfig;
            if (popupPanel || this?.view?.widthBreakpoint === "xsmall") {
                this.view.popup.autoOpenEnabled = false;
                this.view.popup.highlightEnabled = false;

                if (!this._clickHandle) {
                    // If popup hover is enabled use pointer-move otherwise click
                    let timeoutAmt = 0;
                    let clickType = "click";
                    if (popupHover) {
                        clickType = "pointer-move";
                        timeoutAmt = 85;
                    }
                    let lastHitTest;
                    whenOnce(this, "view.ready", () => {
                        if (lastHitTest) clearTimeout(lastHitTest);
                        lastHitTest = setTimeout(() => {
                            this._clickHandle = this.view.on(clickType, debounce(async (event: any) => {

                                this.features = null;
                                this.clearHighlight();;

                                const point = event?.screenPoint ? event.screenPoint : { x: event.x, y: event.y };

                                const response = await this.view.popup.fetchFeatures(point);
                                let results = await response.allGraphicsPromise;
                                if (clickType === "pointer-move") {
                                    if (results && results.length && results.length > 0) {
                                        results = [results[0]]
                                    }
                                }
                                this.displayResults(results);

                            }));
                        }, timeoutAmt);
                    });
                }
            } else {
                this._cleanUp();
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
        const noResultsMessage = this.features?.length === 0 ? true : false;
        let message = null;
        if (noResultsMessage) {
            if (this.applicationConfig.popupPanel && this.applicationConfig.popupHover) {
                message = i18n.popupPanel.noResultsHoverMessage;
            } else {
                message = i18n.popupPanel.noResultsMessage;
            }
        }
        return (
            <div>
                {featureList}
                {message}
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
            const title = feature.get("title") as string;
            if (title) {
                container.summary = title.replace(/<[^>]+>/g, '');
            }

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
