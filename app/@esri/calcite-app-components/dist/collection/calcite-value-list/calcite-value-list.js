import Sortable from "sortablejs";
import { Component, Element, Event, Listen, Method, Prop, State, h } from "@stencil/core";
import guid from "../utils/guid";
import { CSS, ICON_TYPES, TEXT } from "./resources";
import { calciteListItemChangeHandler, calciteListItemValueChangeHandler, cleanUpObserver, deselectSiblingItems, getItemData, handleFilter, initialize, initializeObserver, mutationObserverCallback, selectSiblings, setUpItems, keyDownHandler, setFocus } from "../calcite-pick-list/shared-list-logic";
import List from "../calcite-pick-list/shared-list-render";
/**
 * @slot - A slot for adding `calcite-pick-list-item` elements or `calcite-pick-list-group` elements. Items are displayed as a vertical list.
 * @slot menu-actions - A slot for adding a button + menu combo for performing actions like sorting.
 */
export class CalciteValueList {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Compact reduces the size of all items in the list.
         *
         * @deprecated This property will be removed in a future release.
         */
        this.compact = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, the items will be sortable via drag and drop.
         */
        this.dragEnabled = false;
        /**
         * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
         */
        this.filterEnabled = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Multiple Works similar to standard radio buttons and checkboxes.
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
        this.guid = `calcite-value-list-${guid()}`;
        this.observer = new MutationObserver(mutationObserverCallback.bind(this));
        this.sortables = [];
        this.deselectSiblingItems = deselectSiblingItems.bind(this);
        this.selectSiblings = selectSiblings.bind(this);
        this.handleFilter = handleFilter.bind(this);
        this.getItemData = getItemData.bind(this);
        this.keyDownHandler = (event) => {
            const handleElement = event
                .composedPath()
                .find((item) => { var _a; return (_a = item.dataset) === null || _a === void 0 ? void 0 : _a.jsHandle; });
            const valueListElement = event
                .composedPath()
                .find((item) => { var _a; return ((_a = item.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "calcite-value-list-item"; });
            // Only trigger keyboard sorting when the internal drag handle is focused and activated
            if (!handleElement || !valueListElement.handleActivated) {
                keyDownHandler.call(this, event);
                return;
            }
            const lastIndex = this.items.length - 1;
            const value = valueListElement.value;
            const startingIndex = this.items.findIndex((item) => {
                return item.value === value;
            });
            let appendInstead = false;
            let buddyIndex;
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    if (startingIndex === 0) {
                        appendInstead = true;
                    }
                    else {
                        buddyIndex = startingIndex - 1;
                    }
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    if (startingIndex === lastIndex) {
                        buddyIndex = 0;
                    }
                    else if (startingIndex === lastIndex - 1) {
                        appendInstead = true;
                    }
                    else {
                        buddyIndex = startingIndex + 2;
                    }
                    break;
                default:
                    return;
            }
            if (appendInstead) {
                valueListElement.parentElement.appendChild(valueListElement);
            }
            else {
                valueListElement.parentElement.insertBefore(valueListElement, this.items[buddyIndex]);
            }
            handleElement.focus();
            valueListElement.handleActivated = true;
        };
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
    componentDidLoad() {
        this.setUpDragAndDrop();
    }
    componentDidUnload() {
        cleanUpObserver.call(this);
        this.cleanUpDragAndDrop();
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
        setUpItems.call(this, "calcite-value-list-item");
    }
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    }
    setUpDragAndDrop() {
        if (!this.dragEnabled) {
            return;
        }
        this.sortables.push(Sortable.create(this.el, {
            group: this.guid,
            handle: `.${CSS.handle}`,
            draggable: "calcite-value-list-item",
            onUpdate: () => {
                this.items = Array.from(this.el.querySelectorAll("calcite-value-list-item"));
                const values = this.items.map((item) => item.value);
                this.calciteListOrderChange.emit(values);
            }
        }));
    }
    cleanUpDragAndDrop() {
        if (!this.dragEnabled) {
            return;
        }
        this.sortables.forEach((sortable) => {
            sortable.destroy();
        });
        this.sortables = [];
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
        let type = null;
        if (this.dragEnabled) {
            type = ICON_TYPES.grip;
        }
        return type;
    }
    render() {
        return h(List, { props: this, onKeyDown: this.keyDownHandler });
    }
    static get is() { return "calcite-value-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./calcite-value-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-value-list.css"]
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
                "text": "Compact reduces the size of all items in the list."
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
        "dragEnabled": {
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
                "text": "When true, the items will be sortable via drag and drop."
            },
            "attribute": "drag-enabled",
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
                "text": "Multiple Works similar to standard radio buttons and checkboxes.\nWhen true, a user can select multiple items at a time.\nWhen false, only a single item can be selected at a time\nand selecting a new item will deselect any other selected items."
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
        }, {
            "method": "calciteListOrderChange",
            "name": "calciteListOrderChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "calciteListOrderChange",
                        "name": "event"
                    }],
                "text": "Emmitted when the order of the list has changed."
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
