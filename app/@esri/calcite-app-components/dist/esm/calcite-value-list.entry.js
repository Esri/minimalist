import { r as registerInstance, c as createEvent, h, g as getElement } from './index-03e9a7ba.js';
import './CalciteScrim-72de5de3.js';
import './dom-7d75fa2b.js';
import { a as guid } from './guid-80e40540.js';
import './array-dbbc14b3.js';
import './resources-3de36c7f.js';
import './lodash-f605e937.js';
import { m as mutationObserverCallback, d as deselectSiblingItems, s as selectSiblings, h as handleFilter, g as getItemData, k as keyDownHandler, i as initialize, a as initializeObserver, c as cleanUpObserver, b as calciteListItemChangeHandler, e as calciteListItemValueChangeHandler, f as setUpItems, j as setFocus, L as List } from './shared-list-render-615607f5.js';
import { S as Sortable } from './sortable.esm-12e4e153.js';

const CSS = {
    container: "container",
    handle: "handle"
};
var ICON_TYPES;
(function (ICON_TYPES) {
    ICON_TYPES["grip"] = "grip";
})(ICON_TYPES || (ICON_TYPES = {}));
const TEXT = {
    filterPlaceholder: "Filter results"
};

const calciteValueListCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-align:stretch;align-items:stretch;background-color:var(--calcite-app-background-clear);display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-flow:column;flex-flow:column;position:relative}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}header{background-color:var(--calcite-app-background);display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center;margin-bottom:var(--calcite-app-cap-spacing-quarter);-webkit-box-shadow:0 -1px 0 var(--calcite-app-border) inset;box-shadow:0 -1px 0 var(--calcite-app-border) inset}header.sticky{position:-webkit-sticky;position:sticky;top:0;z-index:1}calcite-filter{margin-bottom:1px}slot[name=menu-actions]::slotted(calcite-action){padding:0 var(--calcite-app-side-spacing-half)}";

const CalciteValueList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.calciteListChange = createEvent(this, "calciteListChange", 7);
        this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 7);
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
    get el() { return getElement(this); }
};
CalciteValueList.style = calciteValueListCss;

export { CalciteValueList as calcite_value_list };
