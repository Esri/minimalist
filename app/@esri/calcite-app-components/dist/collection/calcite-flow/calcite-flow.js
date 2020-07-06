import { Component, Element, Host, Listen, Method, Prop, State, h } from "@stencil/core";
import { CSS } from "./resources";
import classnames from "classnames";
/**
 * @slot - A slot for adding `calcite-flow-item`s to the flow.
 */
export class CalciteFlow {
    constructor() {
        this.flowCount = 0;
        this.flowDirection = null;
        this.flows = [];
        this.getFlowDirection = (oldFlowCount, newFlowCount) => {
            const allowRetreatingDirection = oldFlowCount > 1;
            const allowAdvancingDirection = oldFlowCount && newFlowCount > 1;
            if (!allowAdvancingDirection && !allowRetreatingDirection) {
                return null;
            }
            return newFlowCount < oldFlowCount ? "retreating" : "advancing";
        };
        this.updateFlowProps = () => {
            const { flows } = this;
            const newFlows = Array.from(this.el.querySelectorAll("calcite-flow-item"));
            const oldFlowCount = flows.length;
            const newFlowCount = newFlows.length;
            const activeFlow = newFlows[newFlowCount - 1];
            const previousFlow = newFlows[newFlowCount - 2];
            if (newFlowCount && activeFlow) {
                newFlows.forEach((flowNode) => {
                    flowNode.showBackButton = newFlowCount > 1;
                    flowNode.hidden = flowNode !== activeFlow;
                });
            }
            if (previousFlow) {
                previousFlow.menuOpen = false;
            }
            this.flows = newFlows;
            if (oldFlowCount !== newFlowCount) {
                const flowDirection = this.getFlowDirection(oldFlowCount, newFlowCount);
                this.flowCount = newFlowCount;
                this.flowDirection = flowDirection;
            }
        };
        this.flowItemObserver = new MutationObserver(this.updateFlowProps);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Removes the currently active `calcite-flow-item`.
     */
    async back() {
        const lastItem = this.el.querySelector("calcite-flow-item:last-child");
        if (!lastItem) {
            return;
        }
        const beforeBack = lastItem.beforeBack
            ? lastItem.beforeBack
            : () => Promise.resolve();
        return beforeBack.call(lastItem).then(() => {
            lastItem.remove();
            return lastItem;
        });
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.flowItemObserver.observe(this.el, { childList: true, subtree: true });
        this.updateFlowProps();
    }
    componentDidUnload() {
        this.flowItemObserver.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    handleCalciteFlowItemBackClick() {
        this.back();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { flowDirection, flowCount } = this;
        const frameDirectionClasses = {
            [CSS.frameAdvancing]: flowDirection === "advancing",
            [CSS.frameRetreating]: flowDirection === "retreating"
        };
        return (h(Host, null,
            h("div", { key: flowCount, class: classnames(CSS.frame, frameDirectionClasses) },
                h("slot", null))));
    }
    static get is() { return "calcite-flow"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-flow.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-flow.css"]
    }; }
    static get properties() { return {
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalciteTheme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "CalciteTheme": {
                        "location": "import",
                        "path": "../interfaces"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Used to set the component's color scheme."
            },
            "attribute": "theme",
            "reflect": true
        }
    }; }
    static get states() { return {
        "flowCount": {},
        "flowDirection": {},
        "flows": {}
    }; }
    static get methods() { return {
        "back": {
            "complexType": {
                "signature": "() => Promise<HTMLCalciteFlowItemElement>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLCalciteFlowItemElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<HTMLCalciteFlowItemElement>"
            },
            "docs": {
                "text": "Removes the currently active `calcite-flow-item`.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calciteFlowItemBackClick",
            "method": "handleCalciteFlowItemBackClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
