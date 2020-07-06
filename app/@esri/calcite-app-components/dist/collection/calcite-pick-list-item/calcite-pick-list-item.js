import { Component, Element, Event, Host, Method, Prop, Watch, h } from "@stencil/core";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { ICON_TYPES } from "../calcite-pick-list/resources";
import { getSlotted } from "../utils/dom";
/**
 * @slot secondary-action - A slot intended for adding a `calcite-action` or `calcite-button` to the right side of the card.
 * This is placed at the end of the item.
 */
export class CalcitePickListItem {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Compact removes the selection icon (radio or checkbox) and adds a compact attribute.
         * This allows for a more compact version of the `calcite-pick-list-item`.
         *
         * @deprecated This property will be removed in a future release.
         */
        this.compact = false;
        /**
         * When true, the item cannot be clicked and is visually muted.
         */
        this.disabled = false;
        /**
         * When false, the item cannot be deselected by user interaction.
         */
        this.disableDeselect = false;
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
        /**
         * The text for the remove item buttons. Only applicable if removable is true.
         */
        this.textRemove = TEXT.remove;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.pickListClickHandler = (event) => {
            if (this.disabled || (this.disableDeselect && this.selected)) {
                return;
            }
            this.shiftPressed = event.shiftKey;
            this.selected = !this.selected;
        };
        this.pickListKeyDownHandler = (event) => {
            if (event.key === " ") {
                event.preventDefault();
                if (this.disableDeselect && this.selected) {
                    return;
                }
                this.selected = !this.selected;
            }
        };
        this.removeClickHandler = () => {
            this.calciteListItemRemove.emit();
        };
    }
    metadataWatchHandler() {
        this.calciteListItemPropsChange.emit();
    }
    selectedWatchHandler() {
        this.calciteListItemChange.emit({
            item: this.el,
            value: this.value,
            selected: this.selected,
            shiftPressed: this.shiftPressed
        });
        this.shiftPressed = false;
    }
    textDescriptionWatchHandler() {
        this.calciteListItemPropsChange.emit();
    }
    textLabelWatchHandler() {
        this.calciteListItemPropsChange.emit();
    }
    valueWatchHandler(newValue, oldValue) {
        this.calciteListItemValueChange.emit({ oldValue, newValue });
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    async toggleSelected(coerce) {
        if (this.disabled) {
            return;
        }
        this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
    }
    async setFocus() {
        var _a;
        (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon() {
        const { compact, icon, selected } = this;
        if (!icon || compact) {
            return null;
        }
        const iconName = icon === ICON_TYPES.circle ? ICONS.circle : selected ? ICONS.checked : ICONS.unchecked;
        return (h("span", { class: CSS.icon },
            h("calcite-icon", { scale: "s", icon: iconName })));
    }
    renderRemoveAction() {
        if (!this.removable) {
            return null;
        }
        return (h("calcite-action", { scale: "s", class: CSS.remove, icon: ICONS.remove, text: this.textRemove, onClick: this.removeClickHandler }));
    }
    renderSecondaryAction() {
        const hasSecondaryAction = getSlotted(this.el, SLOTS.secondaryAction);
        return hasSecondaryAction || this.removable ? (h("div", { class: CSS.action },
            h("slot", { name: SLOTS.secondaryAction }, this.renderRemoveAction()))) : null;
    }
    render() {
        const description = this.textDescription && !this.compact ? (h("span", { class: CSS.description }, this.textDescription)) : null;
        return (h(Host, { role: "menuitemcheckbox", "aria-checked": this.selected.toString() },
            h("label", { class: CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, tabIndex: 0, ref: (focusEl) => (this.focusEl = focusEl), "aria-label": this.textLabel },
                this.renderIcon(),
                h("div", { class: CSS.textContainer },
                    h("span", { class: CSS.title }, this.textLabel),
                    description)),
            this.renderSecondaryAction()));
    }
    static get is() { return "calcite-pick-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./calcite-pick-list-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-pick-list-item.css"]
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
                "text": "Compact removes the selection icon (radio or checkbox) and adds a compact attribute.\nThis allows for a more compact version of the `calcite-pick-list-item`."
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
                "text": "When true, the item cannot be clicked and is visually muted."
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
                "tags": [],
                "text": "When false, the item cannot be deselected by user interaction."
            },
            "attribute": "disable-deselect",
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
            "optional": true,
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
                "text": "An optional description for this item.  This will appear below the label text."
            },
            "attribute": "text-description",
            "reflect": true
        },
        "textLabel": {
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
                "text": "The main label for this item. This will appear next to the icon."
            },
            "attribute": "text-label",
            "reflect": true
        },
        "textRemove": {
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
                "text": "The text for the remove item buttons. Only applicable if removable is true."
            },
            "attribute": "text-remove",
            "reflect": true,
            "defaultValue": "TEXT.remove"
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
    static get events() { return [{
            "method": "calciteListItemChange",
            "name": "calciteListItemChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calciteListItemChange",
                        "name": "event"
                    }],
                "text": "Emitted whenever the item is selected or unselected."
            },
            "complexType": {
                "original": "{\n    item: HTMLCalcitePickListItemElement;\n    value: string;\n    selected: boolean;\n    shiftPressed: boolean;\n  }",
                "resolved": "{ item: HTMLCalcitePickListItemElement; value: string; selected: boolean; shiftPressed: boolean; }",
                "references": {
                    "HTMLCalcitePickListItemElement": {
                        "location": "global"
                    }
                }
            }
        }, {
            "method": "calciteListItemRemove",
            "name": "calciteListItemRemove",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calciteListItemRemove",
                        "name": "event"
                    }],
                "text": "Emitted whenever the remove button is pressed."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "calciteListItemPropsChange",
            "name": "calciteListItemPropsChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calciteListItemPropsChange",
                        "name": "event"
                    }, {
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": "Emitted whenever the the item's textLabel, textDescription, value or metadata properties are modified."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "calciteListItemValueChange",
            "name": "calciteListItemValueChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calciteListItemValueChange",
                        "name": "event"
                    }, {
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": "Emitted whenever the the item's value property is modified."
            },
            "complexType": {
                "original": "{ oldValue: string; newValue: string }",
                "resolved": "{ oldValue: string; newValue: string; }",
                "references": {}
            }
        }]; }
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
                "text": "Used to toggle the selection state. By default this won't trigger an event.\nThe first argument allows the value to be coerced, rather than swapping values.",
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
    static get watchers() { return [{
            "propName": "metadata",
            "methodName": "metadataWatchHandler"
        }, {
            "propName": "selected",
            "methodName": "selectedWatchHandler"
        }, {
            "propName": "textDescription",
            "methodName": "textDescriptionWatchHandler"
        }, {
            "propName": "textLabel",
            "methodName": "textLabelWatchHandler"
        }, {
            "propName": "value",
            "methodName": "valueWatchHandler"
        }]; }
}
