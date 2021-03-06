import { debounce } from "lodash-es";
import { focusElement, getSlotted } from "../utils/dom";
import { getRoundRobinIndex } from "../utils/array";
export function mutationObserverCallback() {
    this.setUpItems();
    this.setUpFilter();
}
const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];
// --------------------------------------------------------------------------
//
//  Lifecycle
//
// --------------------------------------------------------------------------
export function initialize() {
    this.setUpItems();
    this.setUpFilter();
    this.emitCalciteListChange = debounce(internalCalciteListChangeEvent.bind(this), 0);
}
export function initializeObserver() {
    this.observer.observe(this.el, { childList: true, subtree: true });
}
export function cleanUpObserver() {
    this.observer.disconnect();
}
// --------------------------------------------------------------------------
//
//  Listeners
//
// --------------------------------------------------------------------------
export function calciteListItemChangeHandler(event) {
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
export function calciteListItemValueChangeHandler(event) {
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
export function keyDownHandler(event) {
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
    const index = getRoundRobinIndex(currentIndex + (key === "ArrowUp" ? -1 : 1), totalItems);
    const item = items[index];
    toggleSingleSelectItemTabbing(item, true);
    focusElement(item);
    if (!multiple) {
        item.selected = true;
    }
}
export function internalCalciteListChangeEvent() {
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
export function setFocus() {
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
export function setUpItems(tagName) {
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
export function setUpFilter() {
    if (this.filterEnabled) {
        this.dataForFilter = this.getItemData();
    }
}
export function deselectSiblingItems(item) {
    this.items.forEach((currentItem) => {
        if (currentItem.value !== item.value) {
            currentItem.toggleSelected(false);
            if (this.selectedValues.has(currentItem.value)) {
                this.selectedValues.delete(currentItem.value);
            }
        }
    });
}
export function selectSiblings(item, deselect = false) {
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
export function handleFilter(event) {
    const filteredData = event.detail;
    const values = filteredData.map((item) => item.value);
    this.items.forEach((item) => {
        const inGroup = item.parentElement.matches("calcite-pick-list-group");
        item.hidden = values.indexOf(item.value) === -1;
        // If item is in a group...
        if (inGroup) {
            const groupParent = getSlotted(item.parentElement, "parent-item");
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
export function getItemData() {
    return this.items.map((item) => ({
        label: item.textLabel,
        description: item.textDescription,
        metadata: item.metadata,
        value: item.value
    }));
}
