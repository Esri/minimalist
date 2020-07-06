'use strict';

const index = require('./index-bed90626.js');
const CalciteScrim = require('./CalciteScrim-1f0f6712.js');
const dom = require('./dom-ead89a9a.js');
const array = require('./array-d5ecc334.js');
const resources = require('./resources-d30f8d23.js');
const lodash = require('./lodash-7ff3eef0.js');

function mutationObserverCallback() {
    this.setUpItems();
    this.setUpFilter();
}
const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];
// --------------------------------------------------------------------------
//
//  Lifecycle
//
// --------------------------------------------------------------------------
function initialize() {
    this.setUpItems();
    this.setUpFilter();
    this.emitCalciteListChange = lodash.debounce(internalCalciteListChangeEvent.bind(this), 0);
}
function initializeObserver() {
    this.observer.observe(this.el, { childList: true, subtree: true });
}
function cleanUpObserver() {
    this.observer.disconnect();
}
// --------------------------------------------------------------------------
//
//  Listeners
//
// --------------------------------------------------------------------------
function calciteListItemChangeHandler(event) {
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
    if (!this.multiple) {
        toggleSingleSelectItemTabbing(item, selected);
    }
    this.lastSelectedItem = item;
    this.emitCalciteListChange();
}
function calciteListItemValueChangeHandler(event) {
    event.stopPropagation();
    const oldValue = event.detail.oldValue;
    const selectedValues = this.selectedValues;
    if (selectedValues.has(oldValue)) {
        const item = selectedValues.get(oldValue);
        selectedValues.delete(oldValue);
        selectedValues.set(event.detail.newValue, item);
    }
}
// --------------------------------------------------------------------------
//
//  Private Methods
//
// --------------------------------------------------------------------------
function isValidNavigationKey(key) {
    return !!SUPPORTED_ARROW_KEYS.find((k) => k === key);
}
function keyDownHandler(event) {
    const { key, target } = event;
    if (!isValidNavigationKey(key)) {
        return;
    }
    const { items, multiple } = this;
    const { length: totalItems } = items;
    const currentIndex = items.indexOf(target);
    if (!totalItems || currentIndex === -1) {
        return;
    }
    event.preventDefault();
    const index = array.getRoundRobinIndex(currentIndex + (key === "ArrowUp" ? -1 : 1), totalItems);
    const item = items[index];
    toggleSingleSelectItemTabbing(item, true);
    dom.focusElement(item);
    if (!multiple) {
        item.selected = true;
    }
}
function internalCalciteListChangeEvent() {
    this.calciteListChange.emit(this.selectedValues);
}
function toggleSingleSelectItemTabbing(item, selectable) {
    // using attribute intentionally
    if (selectable) {
        item.removeAttribute("tabindex");
    }
    else {
        item.setAttribute("tabindex", "-1");
    }
}
function setFocus() {
    const { multiple, items } = this;
    if (items.length === 0) {
        return;
    }
    if (multiple) {
        return items[0].setFocus();
    }
    const selected = items.find((item) => item.selected);
    return (selected ? selected : items[0]).setFocus();
}
function setUpItems(tagName) {
    this.items = Array.from(this.el.querySelectorAll(tagName));
    let hasSelected = false;
    const { items } = this;
    items.forEach((item) => {
        item.icon = this.getIconType();
        item.compact = this.compact;
        if (!this.multiple) {
            item.disableDeselect = true;
            toggleSingleSelectItemTabbing(item, false);
        }
        if (item.selected) {
            hasSelected = true;
            toggleSingleSelectItemTabbing(item, true);
            this.selectedValues.set(item.value, item);
        }
    });
    const [first] = items;
    if (!hasSelected && first) {
        toggleSingleSelectItemTabbing(first, true);
    }
}
function deselectSiblingItems(item) {
    this.items.forEach((currentItem) => {
        if (currentItem.value !== item.value) {
            currentItem.toggleSelected(false);
            if (this.selectedValues.has(currentItem.value)) {
                this.selectedValues.delete(currentItem.value);
            }
        }
    });
}
function selectSiblings(item, deselect = false) {
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
}
function handleFilter(event) {
    const filteredData = event.detail;
    const values = filteredData.map((item) => item.value);
    this.items.forEach((item) => {
        const inGroup = item.parentElement.matches("calcite-pick-list-group");
        item.hidden = values.indexOf(item.value) === -1;
        // If item is in a group...
        if (inGroup) {
            const groupParent = dom.getSlotted(item.parentElement, "parent-item");
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
}
function getItemData() {
    return this.items.map((item) => ({
        label: item.textLabel,
        description: item.textDescription,
        metadata: item.metadata,
        value: item.value
    }));
}

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
    return index.h(CalciteScrim.CalciteScrim, { loading: loading, disabled: disabled });
};
const List = (_a) => {
    var { props } = _a, rest = __rest(_a, ["props"]);
    const { disabled, loading, filterEnabled, dataForFilter, handleFilter, textFilterPlaceholder } = props;
    return (index.h(index.Host, Object.assign({ role: "menu", "aria-disabled": disabled.toString(), "aria-busy": loading.toString() }, rest),
        index.h("header", { class: { [resources.CSS.sticky]: true } },
            filterEnabled ? (index.h("calcite-filter", { data: dataForFilter, textPlaceholder: textFilterPlaceholder, "aria-label": textFilterPlaceholder, onCalciteFilterChange: handleFilter })) : null,
            index.h("slot", { name: "menu-actions" })),
        index.h("slot", null),
        renderScrim(loading, disabled)));
};

exports.List = List;
exports.calciteListItemChangeHandler = calciteListItemChangeHandler;
exports.calciteListItemValueChangeHandler = calciteListItemValueChangeHandler;
exports.cleanUpObserver = cleanUpObserver;
exports.deselectSiblingItems = deselectSiblingItems;
exports.getItemData = getItemData;
exports.handleFilter = handleFilter;
exports.initialize = initialize;
exports.initializeObserver = initializeObserver;
exports.keyDownHandler = keyDownHandler;
exports.mutationObserverCallback = mutationObserverCallback;
exports.selectSiblings = selectSiblings;
exports.setFocus = setFocus;
exports.setUpItems = setUpItems;
