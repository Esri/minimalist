import { h, H as Host } from './index-9fa39e2c.js';
import { C as CalciteScrim } from './CalciteScrim-c07bdadd.js';
import { C as CSS } from './resources-1839192e.js';
import { d as debounce } from './lodash-7109ef43.js';
var sharedListMethods = {
    mutationObserverCallback: function () {
        this.setUpItems();
        this.setUpFilter();
    },
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    initialize: function () {
        this.setUpItems();
        this.setUpFilter();
        this.emitCalciteListChange = debounce(sharedListMethods.internalCalciteListChangeEvent.bind(this), 0);
    },
    initializeObserver: function () {
        this.observer.observe(this.el, { childList: true, subtree: true });
    },
    cleanUpObserver: function () {
        this.observer.disconnect();
    },
    // --------------------------------------------------------------------------
    //
    //  Listeners
    //
    // --------------------------------------------------------------------------
    calciteListItemChangeHandler: function (event) {
        var selectedValues = this.selectedValues;
        var _b = event.detail, item = _b.item, value = _b.value, selected = _b.selected, shiftPressed = _b.shiftPressed;
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
    calciteListItemValueChangeHandler: function (event) {
        event.stopPropagation();
        var oldValue = event.detail.oldValue;
        if (this.selectedValues.has(oldValue)) {
            var item = this.selectedValues.get(oldValue);
            this.selectedValues.delete(oldValue);
            this.selectedValues.set(event.detail.newValue, item);
        }
    },
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    internalCalciteListChangeEvent: function () {
        this.calciteListChange.emit(this.selectedValues);
    },
    setUpItems: function (tagname) {
        var _this = this;
        this.items = Array.from(this.el.querySelectorAll(tagname));
        this.items.forEach(function (item) {
            item.icon = _this.getIconType();
            item.compact = _this.compact;
            if (!_this.multiple) {
                item.disableDeselect = true;
            }
            if (item.selected) {
                _this.selectedValues.set(item.value, item);
            }
        });
    },
    setUpFilter: function () {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    },
    deselectSiblingItems: function (item) {
        var _this = this;
        this.items.forEach(function (currentItem) {
            if (currentItem.value !== item.value) {
                currentItem.toggleSelected(false);
                if (_this.selectedValues.has(currentItem.value)) {
                    _this.selectedValues.delete(currentItem.value);
                }
            }
        });
    },
    selectSiblings: function (item, deselect) {
        var _this = this;
        if (deselect === void 0) { deselect = false; }
        if (!this.lastSelectedItem) {
            return;
        }
        var items = this.items;
        var start = items.findIndex(function (currentItem) {
            return currentItem.value === _this.lastSelectedItem.value;
        });
        var end = items.findIndex(function (currentItem) {
            return currentItem.value === item.value;
        });
        items.slice(Math.min(start, end), Math.max(start, end)).forEach(function (currentItem) {
            currentItem.toggleSelected(!deselect);
            if (!deselect) {
                _this.selectedValues.set(currentItem.value, currentItem);
            }
            else {
                _this.selectedValues.delete(currentItem.value);
            }
        });
    },
    handleFilter: function (event) {
        var filteredData = event.detail;
        var values = filteredData.map(function (item) { return item.value; });
        this.items.forEach(function (item) {
            var inGroup = item.parentElement.matches("calcite-pick-list-group");
            item.hidden = values.indexOf(item.value) === -1;
            // If item is in a group...
            if (inGroup) {
                var groupParent = item.parentElement.querySelector("[slot=parent-item]");
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
    getItemData: function () {
        var result = [];
        this.items.forEach(function (item) {
            var obj = {};
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
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var renderScrim = function (loading, disabled) {
    return h(CalciteScrim, { loading: loading, disabled: disabled });
};
var List = function (_a) {
    var _b;
    var props = _a.props, rest = __rest(_a, ["props"]);
    var disabled = props.disabled, loading = props.loading, filterEnabled = props.filterEnabled, dataForFilter = props.dataForFilter, handleFilter = props.handleFilter, textFilterPlaceholder = props.textFilterPlaceholder;
    return (h(Host, Object.assign({ role: "menu", "aria-disabled": disabled.toString(), "aria-busy": loading.toString() }, rest), h("header", { class: (_b = {}, _b[CSS.sticky] = true, _b) }, filterEnabled ? (h("calcite-filter", { data: dataForFilter, textPlaceholder: textFilterPlaceholder, "aria-label": textFilterPlaceholder, onCalciteFilterChange: handleFilter })) : null, h("slot", { name: "menu-actions" })), h("slot", null), renderScrim(loading, disabled)));
};
export { List as L, sharedListMethods as s };
