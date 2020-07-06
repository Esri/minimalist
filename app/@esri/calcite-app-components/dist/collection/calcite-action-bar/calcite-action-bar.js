import { Component, Element, Event, Host, Prop, Watch, h } from "@stencil/core";
import { CalciteExpandToggle, toggleChildActionText } from "../utils/CalciteExpandToggle";
import { CSS, SLOTS, TEXT } from "./resources";
import { getCalcitePosition, getSlotted } from "../utils/dom";
/**
 * @slot bottom-actions - A slot for adding `calcite-action`s that will appear at the bottom of the action bar, above the collapse/expand button.
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the action bar.
 */
export class CalciteActionBar {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Indicates whether widget can be expanded.
         */
        this.expand = true;
        /**
         * Indicates whether widget is expanded.
         */
        this.expanded = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.toggleExpand = () => {
            this.expanded = !this.expanded;
        };
    }
    expandHandler(expand) {
        if (expand) {
            toggleChildActionText({ parent: this.el, expanded: this.expanded });
        }
    }
    expandedHandler(expanded) {
        if (this.expand) {
            toggleChildActionText({ parent: this.el, expanded });
        }
        this.calciteActionBarToggle.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentWillLoad() {
        const { el, expand, expanded } = this;
        if (expand) {
            toggleChildActionText({ parent: el, expanded });
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderBottomActionGroup() {
        const { expanded, expand, intlExpand, intlCollapse, textExpand, textCollapse, el, layout, position, toggleExpand, tooltipExpand } = this;
        const expandLabel = intlExpand || textExpand || TEXT.expand;
        const collapseLabel = intlCollapse || textCollapse || TEXT.collapse;
        const expandToggleNode = expand ? (h(CalciteExpandToggle, { expanded: expanded, intlExpand: expandLabel, intlCollapse: collapseLabel, el: el, position: getCalcitePosition(position, layout), toggleExpand: toggleExpand, tooltipExpand: tooltipExpand })) : null;
        return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (h("calcite-action-group", { class: CSS.actionGroupBottom },
            h("slot", { name: SLOTS.bottomActions }),
            expandToggleNode)) : null;
    }
    render() {
        return (h(Host, null,
            h("slot", null),
            this.renderBottomActionGroup()));
    }
    static get is() { return "calcite-action-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-action-bar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-action-bar.css"]
    }; }
    static get properties() { return {
        "expand": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether widget can be expanded."
            },
            "attribute": "expand",
            "reflect": true,
            "defaultValue": "true"
        },
        "expanded": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether widget is expanded."
            },
            "attribute": "expanded",
            "reflect": true,
            "defaultValue": "false"
        },
        "tooltipExpand": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLCalciteTooltipElement",
                "resolved": "HTMLCalciteTooltipElement",
                "references": {
                    "HTMLCalciteTooltipElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Used to set the tooltip for the expand toggle."
            }
        },
        "textExpand": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": "use \"intlExpand\" instead.",
                        "name": "deprecated"
                    }],
                "text": "Updates the label of the expand icon when the component is not expanded."
            },
            "attribute": "text-expand",
            "reflect": false
        },
        "intlExpand": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Updates the label of the expand icon when the component is not expanded."
            },
            "attribute": "intl-expand",
            "reflect": false
        },
        "textCollapse": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": "use \"intlCollapse\" instead.",
                        "name": "deprecated"
                    }],
                "text": "Updates the label of the collapse icon when the component is expanded."
            },
            "attribute": "text-collapse",
            "reflect": false
        },
        "intlCollapse": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Updates the label of the collapse icon when the component is expanded."
            },
            "attribute": "intl-collapse",
            "reflect": false
        },
        "layout": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalciteLayout",
                "resolved": "\"leading\" | \"trailing\"",
                "references": {
                    "CalciteLayout": {
                        "location": "import",
                        "path": "../interfaces"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "use \"position\" instead.",
                        "name": "deprecated"
                    }],
                "text": "Arrangement of the component. Leading and trailing are different depending on if the direction is LTR or RTL. For example, \"leading\"\nin a LTR app will appear on the left."
            },
            "attribute": "layout",
            "reflect": true
        },
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalcitePosition",
                "resolved": "\"end\" | \"start\"",
                "references": {
                    "CalcitePosition": {
                        "location": "import",
                        "path": "../interfaces"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Arranges the component depending on the elements 'dir' property."
            },
            "attribute": "position",
            "reflect": true
        },
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
    static get events() { return [{
            "method": "calciteActionBarToggle",
            "name": "calciteActionBarToggle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when expanded has been toggled."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "expand",
            "methodName": "expandHandler"
        }, {
            "propName": "expanded",
            "methodName": "expandedHandler"
        }]; }
}
