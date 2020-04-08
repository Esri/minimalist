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

import i18n = require("dojo/i18n!../nls/resources");
import {
    declared,
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
class ScrollOverlay extends declared(Widget) {
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
                    color={this.config.theme}
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
        this.scrollOverlayButton.innerHTML = isEnabled ? i18n.scrollMessage : i18n.disableScrollMessage;
    }


    _createScrollButton() {
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
                color={this.config.theme}
                width="auto"
            >
                {i18n.scrollMessage}
            </calcite-button>
        </div>
    }

}

export default ScrollOverlay;
