import { Component, Element, Event, Host, Prop, h } from "@stencil/core";
import { CSS, TEXT } from "./resources";
import CalciteScrim from "../utils/CalciteScrim";
import { getSlotted } from "../utils/dom";
/**
 * @slot icon - A slot for adding a trailing header icon.
 * @slot control - A slot for adding a single HTML input element in a header.
 * @slot - A slot for adding content to the block.
 */
export class CalciteBlock {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * When true, this block will be collapsible.
         */
        this.collapsible = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, displays a drag handle in the header.
         */
        this.dragHandle = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * When true, the block's content will be displayed.
         */
        this.open = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.onHeaderClick = () => {
            this.open = !this.open;
            this.calciteBlockToggle.emit();
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { collapsible, disabled, el, heading, intlCollapse, intlExpand, loading, open, summary, textCollapse, textExpand } = this;
        const toggleLabel = open
            ? intlCollapse || textCollapse || TEXT.collapse
            : intlExpand || textExpand || TEXT.expand;
        const hasIcon = getSlotted(el, "icon" /* icon */);
        const headerContent = (h("header", { class: CSS.header },
            hasIcon ? (h("div", { class: CSS.icon },
                h("slot", { name: "icon" /* icon */ }))) : null,
            h("div", { class: CSS.title },
                h("h3", { class: CSS.heading }, heading),
                summary ? h("div", { class: CSS.summary }, summary) : null)));
        const headerNode = (h("div", { class: CSS.headerContainer },
            this.dragHandle ? h("calcite-handle", null) : null,
            collapsible ? (h("button", { "aria-label": toggleLabel, class: CSS.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent)) : (headerContent),
            loading ? (h("calcite-loader", { inline: true, "is-active": true })) : (h("slot", { name: "control" /* control */ }))));
        return (h(Host, { tabIndex: disabled ? -1 : null },
            h("article", { "aria-expanded": collapsible ? open.toString() : null, "aria-busy": loading },
                headerNode,
                h("div", { class: CSS.content, hidden: !open },
                    h(CalciteScrim, { loading: loading, disabled: disabled },
                        h("slot", null))))));
    }
    static get is() { return "calcite-block"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-block.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-block.css"]
    }; }
    static get properties() { return {
        "collapsible": {
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
                "text": "When true, this block will be collapsible."
            },
            "attribute": "collapsible",
            "reflect": false,
            "defaultValue": "false"
        },
        "disabled": {
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
                "text": "When true, disabled prevents interaction. This state shows items with lower opacity/grayed."
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "dragHandle": {
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
                "text": "When true, displays a drag handle in the header."
            },
            "attribute": "drag-handle",
            "reflect": true,
            "defaultValue": "false"
        },
        "heading": {
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
                "text": "Block heading."
            },
            "attribute": "heading",
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
                "text": "Tooltip used for the toggle when expanded."
            },
            "attribute": "intl-collapse",
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
                "text": "Tooltip used for the toggle when collapsed."
            },
            "attribute": "intl-expand",
            "reflect": false
        },
        "loading": {
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
                "text": "When true, content is waiting to be loaded. This state shows a busy indicator."
            },
            "attribute": "loading",
            "reflect": true,
            "defaultValue": "false"
        },
        "open": {
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
                "text": "When true, the block's content will be displayed."
            },
            "attribute": "open",
            "reflect": true,
            "defaultValue": "false"
        },
        "summary": {
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
                "text": "Block summary."
            },
            "attribute": "summary",
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
                "text": "Tooltip used for the toggle when expanded."
            },
            "attribute": "text-collapse",
            "reflect": false
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
                "text": "Tooltip used for the toggle when collapsed."
            },
            "attribute": "text-expand",
            "reflect": false
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
            "method": "calciteBlockToggle",
            "name": "calciteBlockToggle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the header has been clicked."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
