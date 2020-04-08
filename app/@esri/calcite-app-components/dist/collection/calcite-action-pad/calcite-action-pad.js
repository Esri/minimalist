import { Host, h } from "@stencil/core";
import { CalciteExpandToggle, toggleChildActionText } from "../utils/CalciteExpandToggle";
import { CSS } from "./resources";
import { getCalcitePosition } from "../utils/dom";
/**
 * @slot - A slot for adding `calcite-action`s to the action pad.
 */
export class CalciteActionPad {
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
        /**
         * Updates the label of the expand icon when the component is not expanded.
         */
        this.textExpand = "Expand";
        /**
         * Updates the label of the collapse icon when the component is expanded.
         */
        this.textCollapse = "Collapse";
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
        this.calciteActionPadToggle.emit();
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
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    renderBottomActionGroup() {
        const { expanded, expand, textExpand, textCollapse, el, layout, position, toggleExpand } = this;
        const expandToggleNode = expand ? (h(CalciteExpandToggle, { expanded: expanded, textExpand: textExpand, textCollapse: textCollapse, el: el, position: getCalcitePosition(position, layout), toggleExpand: toggleExpand })) : null;
        return expandToggleNode ? (h("calcite-action-group", { class: CSS.actionGroupBottom }, expandToggleNode)) : null;
    }
    render() {
        return (h(Host, null,
            h("slot", null),
            this.renderBottomActionGroup()));
    }
    static get is() { return "calcite-action-pad"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-action-pad.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-action-pad.css"]
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
        "textExpand": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Updates the label of the expand icon when the component is not expanded."
            },
            "attribute": "text-expand",
            "reflect": false,
            "defaultValue": "\"Expand\""
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Updates the label of the collapse icon when the component is expanded."
            },
            "attribute": "text-collapse",
            "reflect": false,
            "defaultValue": "\"Collapse\""
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
                        "text": "since 5.3 - use \"position\" instead.\nArrangement of the component.",
                        "name": "deprecated"
                    }],
                "text": ""
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
            "method": "calciteActionPadToggle",
            "name": "calciteActionPadToggle",
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
