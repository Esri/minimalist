
import i18n = require("dojo/i18n!../nls/resources");
import {
    subclass,
    property
} from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { tsx, storeNode } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import { esriWidgetProps } from "../interfaces/interfaces";


const CSS = {
    base: "scroll-overlay",
    button: "scroll-overlay-button"

};
@subclass("ScrollOverlay")
class ScrollOverlay extends (Widget) {
    constructor(props: esriWidgetProps) {
        super(props);
    }
    initialize() {
        if (this.config.disableScroll && this.view) { this.toggleInteraction() };
    }
    @property()
    config: AppConfig;

    @property()
    view: __esri.MapView;
    scrollOverlayButton: any;

    render() {
        const color = this?.config?.theme === "dark" ? "neutral" : "inverse";
        return (
            <div
                class={this.classes([CSS.base, this.config.theme])}
            >
                <calcite-button
                    appearance="solid"
                    bind={this}
                    onclick={this.toggleInteraction}
                    afterCreate={storeNode}
                    data-node-ref="scrollOverlayButton"
                    class={CSS.button}
                    scale="m"
                    color={color}
                    width="auto"
                >
                    {i18n.scrollMessage}
                </calcite-button>
            </div>);

    }
    toggleInteraction() {
        let { mouseWheelZoomEnabled, browserTouchPanEnabled } = this.view.navigation;
        const isEnabled = mouseWheelZoomEnabled && browserTouchPanEnabled;
        this.view.navigation.mouseWheelZoomEnabled = !isEnabled;
        this.view.navigation.browserTouchPanEnabled = !isEnabled;
        if (this?.scrollOverlayButton) {
            this.scrollOverlayButton.innerHTML = isEnabled ? i18n.scrollMessage : i18n.disableScrollMessage;
        }
    }


    _createScrollButton() {
        const color = this?.config?.theme === "dark" ? "neutral" : "inverse";

        return <div
            class={this.classes([CSS.base, this.config.theme])}
        >
            <calcite-button
                appearance="solid"
                bind={this}
                onclick={this.toggleInteraction}
                afterCreate={storeNode}
                data-node-ref="scrollOverlayButton"
                class={CSS.button}
                scale="s"
                color={color}
                width="auto"
            >
                {i18n.scrollMessage}
            </calcite-button>
        </div>
    }

}

export default ScrollOverlay;
