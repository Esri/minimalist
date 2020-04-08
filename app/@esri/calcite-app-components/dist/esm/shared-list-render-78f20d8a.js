import { h, H as Host } from './index-1a2740c5.js';
import { C as CalciteScrim } from './CalciteScrim-16fe359e.js';
import { C as CSS } from './resources-1839192e.js';
import { d as debounce } from './lodash-7109ef43.js';

const sharedListMethods = {
    mutationObserverCallback() {
        this.setUpItems();
        this.setUpFilter();
    },
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    initialize() {
        this.setUpItems();
        this.setUpFilter();
        this.emitCalciteListChange = debounce(sharedListMethods.internalCalciteListChangeEvent.bind(this), 0);
    },
    initializeObserver() {
        this.observer.observe(this.el, { childList: true, subtree: true });
    },
    cleanUpObserver() {
        this.observer.disconnect();
    },
    // --------------------------------------------------------------------------
    //
    //  Listeners
    //
    // --------------------------------------------------------------------------
    calciteListItemChangeHandler(event) {
        const { selectedValues } = this;
        const { item, value, selected, shiftPressed } = event.detail;
        if (selected) {
            if (!this.multiple) {
                this.deselectSiblingItems(item);
            }
            if (this.multiple && shiftPressed) {
                this.selectSiblings(item);
            }
            selectedValues.set(value, item);
        }
        else {
            selectedValues.delete(value);
            if (this.multiple && shiftPressed) {
                this.selectSiblings(item, true);
            }
        }
        this.lastSelectedItem = item;
        this.emitCalciteListChange();
    },
    calciteListItemValueChangeHandler(event) {
        event.stopPropagation();
        const oldValue = event.detail.oldValue;
        if (this.selectedValues.has(oldValue)) {
            const item = this.selectedValues.get(oldValue);
            this.selectedValues.delete(oldValue);
            this.selectedValues.set(event.detail.newValue, item);
        }
    },
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    internalCalciteListChangeEvent() {
        this.calciteListChange.emit(this.selectedValues);
    },
    setUpItems(tagname) {
        this.items = Array.from(this.el.querySelectorAll(tagname));
        this.items.forEach((item) => {
            item.icon = this.getIconType();
            item.compact = this.compact;
            if (!this.multiple) {
                item.disableDeselect = true;
            }
            if (item.selected) {
                this.selectedValues.set(item.value, item);
            }
        });
    },
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    },
    deselectSiblingItems(item) {
        this.items.forEach((currentItem) => {
            if (currentItem.value !== item.value) {
                currentItem.toggleSelected(false);
                if (this.selectedValues.has(currentItem.value)) {
                    this.selectedValues.delete(currentItem.value);
                }
            }
        });
    },
    selectSiblings(item, deselect = false) {
        if (!this.lastSelectedItem) {
            return;
        }
        const { items } = this;
        const start = items.findIndex((currentItem) => {
            return currentItem.value === this.lastSelectedItem.value;
        });
        const end = items.findIndex((currentItem) => {
            return currentItem.value === item.value;
        });
        items.slice(Math.min(start, end), Math.max(start, end)).forEach((currentItem) => {
            currentItem.toggleSelected(!deselect);
            if (!deselect) {
                this.selectedValues.set(currentItem.value, currentItem);
            }
            else {
                this.selectedValues.delete(currentItem.value);
            }
        });
    },
    handleFilter(event) {
        const filteredData = event.detail;
        const values = filteredData.map((item) => item.value);
        this.items.forEach((item) => {
            const inGroup = item.parentElement.matches("calcite-pick-list-group");
            item.hidden = values.indexOf(item.value) === -1;
            // If item is in a group...
            if (inGroup) {
                const groupParent = item.parentElement.querySelector("[slot=parent-item]");
                // If there is a group parent
                if (groupParent !== null) {
                    // If the group parent is a match, show me.
                    if (values.indexOf(groupParent.value) !== -1) {
                        item.hidden = false;
                    }
                    // If I am a match, show my parent.
                    if (values.indexOf(item.value) !== -1) {
                        groupParent.hidden = false;
                    }
                }
            }
        });
    },
    getItemData() {
        const result = [];
        this.items.forEach((item) => {
            const obj = {};
            obj.label = item.textLabel;
            obj.description = item.textDescription;
            obj.metadata = item.metadata;
            obj.value = item.value;
            result.push(obj);
        });
        return result;
    }
};

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const renderScrim = (loading, disabled) => {
    return h(CalciteScrim, { loading: loading, disabled: disabled });
};
const List = (_a) => {
    var { props } = _a, rest = __rest(_a, ["props"]);
    const { disabled, loading, filterEnabled, dataForFilter, handleFilter, textFilterPlaceholder } = props;
    return (h(Host, Object.assign({ role: "menu", "aria-disabled": disabled.toString(), "aria-busy": loading.toString() }, rest),
        h("header", { class: { [CSS.sticky]: true } },
            filterEnabled ? (h("calcite-filter", { data: dataForFilter, textPlaceholder: textFilterPlaceholder, "aria-label": textFilterPlaceholder, onCalciteFilterChange: handleFilter })) : null,
            h("slot", { name: "menu-actions" })),
        h("slot", null),
        renderScrim(loading, disabled)));
};

export { List as L, sharedListMethods as s };
