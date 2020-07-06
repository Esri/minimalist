import { Component, Element, Host, Prop, h } from "@stencil/core";
import classnames from "classnames";
import { CSS, SLOTS } from "./resources";
import { CSS_UTILITY } from "../utils/resources";
import { getElementDir, getSlotted } from "../utils/dom";
/**
 * @slot - A slot for adding `calcite-pick-list-item` elements.
 */
export class CalcitePickListGroup {
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { el, textGroupTitle } = this;
        const rtl = getElementDir(el) === "rtl";
        const hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
        const sectionClasses = {
            [CSS.indented]: hasParentItem,
            [CSS_UTILITY.rtl]: rtl
        };
        return (h(Host, null,
            textGroupTitle ? h("h3", { class: CSS.heading }, textGroupTitle) : null,
            h("slot", { name: SLOTS.parentItem }),
            h("section", { class: classnames(CSS.container, sectionClasses) },
                h("slot", null))));
    }
    static get is() { return "calcite-pick-list-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./calcite-pick-list-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-pick-list-group.css"]
    }; }
    static get properties() { return {
        "textGroupTitle": {
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
                "text": "The title used for all nested `calcite-pick-list` rows"
            },
            "attribute": "text-group-title",
            "reflect": true
        }
    }; }
    static get elementRef() { return "el"; }
}
