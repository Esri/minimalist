import classnames from "classnames";
import { Component, Event, Host, Prop, Watch, h } from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import { getCalcitePosition } from "../utils/dom";
/**
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the panel.
 * @slot - A slot for adding content to the shell panel.
 */
export class CalciteShellPanel {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Hide the content panel.
         */
        this.collapsed = false;
        /**
         * This property makes the content area appear like a "floating" panel.
         */
        this.detached = false;
        /**
         * This sets limits the height of the content area. It only applies when detached is true.
         */
        this.detachedScale = "m";
    }
    watchHandler() {
        this.calciteShellPanelToggle.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { collapsed, detached, layout, position } = this;
        const contentNode = (h("div", { class: classnames(CSS.content, { [CSS.contentDetached]: detached }), hidden: collapsed },
            h("slot", null)));
        const actionBarNode = h("slot", { name: SLOTS.actionBar });
        const mainNodes = [actionBarNode, contentNode];
        if (getCalcitePosition(position, layout) === "end") {
            mainNodes.reverse();
        }
        return h(Host, null, mainNodes);
    }
    static get is() { return "calcite-shell-panel"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-shell-panel.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-shell-panel.css"]
    }; }
    static get properties() { return {
        "collapsed": {
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
                "text": "Hide the content panel."
            },
            "attribute": "collapsed",
            "reflect": true,
            "defaultValue": "false"
        },
        "detached": {
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
                "text": "This property makes the content area appear like a \"floating\" panel."
            },
            "attribute": "detached",
            "reflect": true,
            "defaultValue": "false"
        },
        "detachedScale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalciteScale",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {
                    "CalciteScale": {
                        "location": "import",
                        "path": "../interfaces"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "This sets limits the height of the content area. It only applies when detached is true."
            },
            "attribute": "detached-scale",
            "reflect": false,
            "defaultValue": "\"m\""
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
                "text": "Arrangement of the component."
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
        }
    }; }
    static get events() { return [{
            "method": "calciteShellPanelToggle",
            "name": "calciteShellPanelToggle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when collapse has been toggled."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "collapsed",
            "methodName": "watchHandler"
        }]; }
}
