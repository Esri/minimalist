var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-03e9a7ba.js';
import './CalciteScrim-72de5de3.js';
import './dom-7d75fa2b.js';
import { a as guid } from './guid-80e40540.js';
import './array-dbbc14b3.js';
import './resources-3de36c7f.js';
import './lodash-f605e937.js';
import { m as mutationObserverCallback, d as deselectSiblingItems, s as selectSiblings, h as handleFilter, g as getItemData, k as keyDownHandler, i as initialize, a as initializeObserver, c as cleanUpObserver, b as calciteListItemChangeHandler, e as calciteListItemValueChangeHandler, f as setUpItems, j as setFocus, L as List } from './shared-list-render-615607f5.js';
import { S as Sortable } from './sortable.esm-12e4e153.js';
var CSS = {
    container: "container",
    handle: "handle"
};
var ICON_TYPES;
(function (ICON_TYPES) {
    ICON_TYPES["grip"] = "grip";
})(ICON_TYPES || (ICON_TYPES = {}));
var TEXT = {
    filterPlaceholder: "Filter results"
};
var calciteValueListCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-align:stretch;align-items:stretch;background-color:var(--calcite-app-background-clear);display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-flow:column;flex-flow:column;position:relative}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}header{background-color:var(--calcite-app-background);display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center;margin-bottom:var(--calcite-app-cap-spacing-quarter);-webkit-box-shadow:0 -1px 0 var(--calcite-app-border) inset;box-shadow:0 -1px 0 var(--calcite-app-border) inset}header.sticky{position:-webkit-sticky;position:sticky;top:0;z-index:1}calcite-filter{margin-bottom:1px}slot[name=menu-actions]::slotted(calcite-action){padding:0 var(--calcite-app-side-spacing-half)}";
var CalciteValueList = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
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
        this.guid = "calcite-value-list-" + guid();
        this.observer = new MutationObserver(mutationObserverCallback.bind(this));
        this.sortables = [];
        this.deselectSiblingItems = deselectSiblingItems.bind(this);
        this.selectSiblings = selectSiblings.bind(this);
        this.handleFilter = handleFilter.bind(this);
        this.getItemData = getItemData.bind(this);
        this.keyDownHandler = function (event) {
            var handleElement = event
                .composedPath()
                .find(function (item) { var _a; return (_a = item.dataset) === null || _a === void 0 ? void 0 : _a.jsHandle; });
            var valueListElement = event
                .composedPath()
                .find(function (item) { var _a; return ((_a = item.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "calcite-value-list-item"; });
            // Only trigger keyboard sorting when the internal drag handle is focused and activated
            if (!handleElement || !valueListElement.handleActivated) {
                keyDownHandler.call(_this, event);
                return;
            }
            var lastIndex = _this.items.length - 1;
            var value = valueListElement.value;
            var startingIndex = _this.items.findIndex(function (item) {
                return item.value === value;
            });
            var appendInstead = false;
            var buddyIndex;
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
                valueListElement.parentElement.insertBefore(valueListElement, _this.items[buddyIndex]);
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
    class_1.prototype.connectedCallback = function () {
        initialize.call(this);
        initializeObserver.call(this);
    };
    class_1.prototype.componentDidLoad = function () {
        this.setUpDragAndDrop();
    };
    class_1.prototype.componentDidUnload = function () {
        cleanUpObserver.call(this);
        this.cleanUpDragAndDrop();
    };
    class_1.prototype.calciteListItemChangeHandler = function (event) {
        calciteListItemChangeHandler.call(this, event);
    };
    class_1.prototype.calciteListItemPropsChangeHandler = function (event) {
        event.stopPropagation();
        this.setUpFilter();
    };
    class_1.prototype.calciteListItemValueChangeHandler = function (event) {
        calciteListItemValueChangeHandler.call(this, event);
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.setUpItems = function () {
        setUpItems.call(this, "calcite-value-list-item");
    };
    class_1.prototype.setUpFilter = function () {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    };
    class_1.prototype.setUpDragAndDrop = function () {
        var _this = this;
        if (!this.dragEnabled) {
            return;
        }
        this.sortables.push(Sortable.create(this.el, {
            group: this.guid,
            handle: "." + CSS.handle,
            draggable: "calcite-value-list-item",
            onUpdate: function () {
                _this.items = Array.from(_this.el.querySelectorAll("calcite-value-list-item"));
                var values = _this.items.map(function (item) { return item.value; });
                _this.calciteListOrderChange.emit(values);
            }
        }));
    };
    class_1.prototype.cleanUpDragAndDrop = function () {
        if (!this.dragEnabled) {
            return;
        }
        this.sortables.forEach(function (sortable) {
            sortable.destroy();
        });
        this.sortables = [];
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.getSelectedItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.selectedValues];
            });
        });
    };
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, setFocus.call(this)];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.getIconType = function () {
        var type = null;
        if (this.dragEnabled) {
            type = ICON_TYPES.grip;
        }
        return type;
    };
    class_1.prototype.render = function () {
        return h(List, { props: this, onKeyDown: this.keyDownHandler });
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalciteValueList.style = calciteValueListCss;
export { CalciteValueList as calcite_value_list };
