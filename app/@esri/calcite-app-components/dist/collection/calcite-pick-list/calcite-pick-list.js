import { Component, Element, Event, Listen, Method, Prop, State, h } from "@stencil/core";
import { ICON_TYPES, TEXT } from "./resources";
import { calciteListItemChangeHandler, calciteListItemValueChangeHandler, cleanUpObserver, deselectSiblingItems, getItemData, handleFilter, initialize, initializeObserver, mutationObserverCallback, selectSiblings, setUpItems, keyDownHandler, setFocus } from "./shared-list-logic";
import List from "./shared-list-render";
/**
 * @slot - A slot for adding `calcite-pick-list-item` elements or `calcite-pick-list-group` elements. Items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button + menu combo for performing actions like sorting.
 */
export class CalcitePickList {
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
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
         */
        this.filterEnabled = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Multiple works similar to standard radio buttons and checkboxes.
         * When true, a user can select multiple items at a time.
         * When false, only a single item can be selected at a time
         * and selecting a new item will deselect any other selected items.
         */
        this.multiple = false;
        /**
         * Placeholder text for the filter input field.
         */
        this.textFilterPlaceholder = TEXT.filterPlaceholder;
        // --------------------------------------------------------------------------
        //
        //  Private Properties
        //
        // --------------------------------------------------------------------------
        this.selectedValues = new Map();
        this.dataForFilter = [];
        this.lastSelectedItem = null;
        this.observer = new MutationObserver(mutationObserverCallback.bind(this));
        this.deselectSiblingItems = deselectSiblingItems.bind(this);
        this.selectSiblings = selectSiblings.bind(this);
        this.handleFilter = handleFilter.bind(this);
        this.getItemData = getItemData.bind(this);
        this.keyDownHandler = keyDownHandler.bind(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        initialize.call(this);
        initializeObserver.call(this);
    }
    componentDidUnload() {
        cleanUpObserver.call(this);
    }
    calciteListItemChangeHandler(event) {
        calciteListItemChangeHandler.call(this, event);
    }
    calciteListItemPropsChangeHandler(event) {
        event.stopPropagation();
        this.setUpFilter();
    }
    calciteListItemValueChangeHandler(event) {
        calciteListItemValueChangeHandler.call(this, event);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpItems() {
        setUpItems.call(this, "calcite-pick-list-item");
    }
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async getSelectedItems() {
        return this.selectedValues;
    }
    async setFocus() {
        return setFocus.call(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    getIconType() {
        return this.multiple ? ICON_TYPES.square : ICON_TYPES.circle;
    }
    render() {
        return h(List, { props: this, onKeyDown: this.keyDownHandler });
    }
    static get is() { return "calcite-pick-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./calcite-pick-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-pick-list.css"]
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
            "optional": false,
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "When true, disabled prevents interaction. This state shows items with lower opacity/grayed."
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "filterEnabled": {
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
                "text": "When true, an input appears at the top of the list that can be used by end users to filter items in the list."
            },
            "attribute": "filter-enabled",
            "reflect": true,
            "defaultValue": "false"
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
        "multiple": {
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
                "text": "Multiple works similar to standard radio buttons and checkboxes.\nWhen true, a user can select multiple items at a time.\nWhen false, only a single item can be selected at a time\nand selecting a new item will deselect any other selected items."
            },
            "attribute": "multiple",
            "reflect": true,
            "defaultValue": "false"
        },
        "textFilterPlaceholder": {
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
                "text": "Placeholder text for the filter input field."
            },
            "attribute": "text-filter-placeholder",
            "reflect": true,
            "defaultValue": "TEXT.filterPlaceholder"
        }
    }; }
    static get states() { return {
        "selectedValues": {},
        "dataForFilter": {}
    }; }
    static get events() { return [{
            "method": "calciteListChange",
            "name": "calciteListChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calciteListChange",
                        "name": "event"
                    }],
                "text": "Emitted when any of the item selections have changed."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "getSelectedItems": {
            "complexType": {
                "signature": "() => Promise<Map<string, object>>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Map": {
                        "location": "global"
                    }
                },
                "return": "Promise<Map<string, object>>"
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
        }, {
            "name": "calciteListItemPropsChange",
            "method": "calciteListItemPropsChangeHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "calciteListItemValueChange",
            "method": "calciteListItemValueChangeHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
