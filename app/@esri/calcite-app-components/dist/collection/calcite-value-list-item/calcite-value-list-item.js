import { Component, Element, Host, Method, Prop, h, Listen } from "@stencil/core";
import { ICON_TYPES } from "../calcite-pick-list/resources";
import guid from "../utils/guid";
import { CSS } from "../calcite-pick-list-item/resources";
import { ICONS } from "./resources";
/**
 * @slot secondary-action - A slot intended for adding a `calcite-action` or `calcite-button`. This is placed at the end of the item.
 */
export class CalciteValueListItem {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Compact reduces the size of the item.
         *
         * @deprecated This property will be removed in a future release.
         */
        this.compact = false;
        /**
         * When true, the item cannot be clicked and is visually muted
         */
        this.disabled = false;
        /**
         * @internal When false, the item cannot be deselected by user interaction.
         */
        this.disableDeselect = false;
        /**
         * @internal - stores the activated state of the drag handle.
         */
        this.handleActivated = false;
        /**
         * Determines the icon SVG symbol that will be shown. Options are circle, square, grid or null.
         */
        this.icon = null;
        /**
         * Set this to true to display a remove action that removes the item from the list.
         */
        this.removable = false;
        /**
         * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
         */
        this.selected = false;
        this.pickListItem = null;
        this.guid = `calcite-value-list-item-${guid()}`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getPickListRef = (el) => (this.pickListItem = el);
        this.handleKeyDown = (event) => {
            if (event.key === " ") {
                this.handleActivated = !this.handleActivated;
            }
        };
        this.handleBlur = () => {
            this.handleActivated = false;
        };
        this.handleSelectChange = (event) => {
            this.selected = event.detail.selected;
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async toggleSelected(coerce) {
        this.pickListItem.toggleSelected(coerce);
    }
    async setFocus() {
        var _a;
        (_a = this.pickListItem) === null || _a === void 0 ? void 0 : _a.setFocus();
    }
    // --------------------------------------------------------------------------
    //
    //  Events
    //
    // --------------------------------------------------------------------------
    calciteListItemChangeHandler(event) {
        // adjust item payload from wrapped item before bubbling
        event.detail.item = this.el;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHandle() {
        const { icon } = this;
        if (icon === ICON_TYPES.grip) {
            return (h("span", { role: "button", class: { [CSS.handle]: true, [CSS.handleActivated]: this.handleActivated }, tabindex: "0", "data-js-handle": "true", "aria-pressed": this.handleActivated.toString(), onKeyDown: this.handleKeyDown, onBlur: this.handleBlur },
                h("calcite-icon", { scale: "s", icon: ICONS.drag })));
        }
    }
    render() {
        return (h(Host, { "data-id": this.guid },
            this.renderHandle(),
            h("calcite-pick-list-item", { compact: this.compact, ref: this.getPickListRef, disabled: this.disabled, disableDeselect: this.disableDeselect, selected: this.selected, metadata: this.metadata, removable: this.removable, textLabel: this.textLabel, textDescription: this.textDescription, onCalciteListItemChange: this.handleSelectChange, value: this.value },
                h("slot", { name: "secondary-action", slot: "secondary-action" }))));
    }
    static get is() { return "calcite-value-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./calcite-value-list-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-value-list-item.css"]
    }; }
    static get properties() { return {
        "compact": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": "This property will be removed in a future release.",
                        "name": "deprecated"
                    }],
                "text": "Compact reduces the size of the item."
            },
            "attribute": "compact",
            "reflect": true,
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
            "optional": true,
            "docs": {
                "tags": [],
                "text": "When true, the item cannot be clicked and is visually muted"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "disableDeselect": {
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
                "tags": [{
                        "text": "When false, the item cannot be deselected by user interaction.",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "disable-deselect",
            "reflect": false,
            "defaultValue": "false"
        },
        "handleActivated": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": "- stores the activated state of the drag handle.",
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "handle-activated",
            "reflect": false,
            "defaultValue": "false"
        },
        "icon": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "ICON_TYPES | null",
                "resolved": "ICON_TYPES.circle | ICON_TYPES.grip | ICON_TYPES.square",
                "references": {
                    "ICON_TYPES": {
                        "location": "import",
                        "path": "../calcite-pick-list/resources"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Determines the icon SVG symbol that will be shown. Options are circle, square, grid or null."
            },
            "attribute": "icon",
            "reflect": true,
            "defaultValue": "null"
        },
        "metadata": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "object",
                "resolved": "object",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Used to provide additional metadata to an item, primarily used when the parent list has a filter."
            }
        },
        "removable": {
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
                "text": "Set this to true to display a remove action that removes the item from the list."
            },
            "attribute": "removable",
            "reflect": true,
            "defaultValue": "false"
        },
        "selected": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set this to true to pre-select an item. Toggles when an item is checked/unchecked."
            },
            "attribute": "selected",
            "reflect": true,
            "defaultValue": "false"
        },
        "textLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": true,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The main label for this item. Appears next to the icon."
            },
            "attribute": "text-label",
            "reflect": true
        },
        "textDescription": {
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
                "text": "An optional description for this item. Will appear below the label text."
            },
            "attribute": "text-description",
            "reflect": true
        },
        "value": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": true,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "A unique value used to identify this item - similar to the value attribute on an <input>."
            },
            "attribute": "value",
            "reflect": true
        }
    }; }
    static get methods() { return {
        "toggleSelected": {
            "complexType": {
                "signature": "(coerce?: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calciteListItemChange",
            "method": "calciteListItemChangeHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
