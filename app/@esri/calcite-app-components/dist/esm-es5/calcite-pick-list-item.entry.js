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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { g as getSlotted } from './dom-7d75fa2b.js';
import { I as ICON_TYPES } from './resources-3de36c7f.js';
import { T as TEXT, C as CSS, S as SLOTS, I as ICONS } from './resources-0ee2d40e.js';
var calcitePickListItemCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-align:center;align-items:center;background-color:var(--calcite-app-background-clear);display:-ms-flexbox;display:flex;margin:0;color:var(--calcite-app-foreground);-webkit-transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);-webkit-animation:calcite-app-fade-in var(--calcite-app-animation-time) var(--calcite-app-easing-function);animation:calcite-app-fade-in var(--calcite-app-animation-time) var(--calcite-app-easing-function)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host(:hover),:host(:focus){background-color:var(--calcite-app-background-hover)}.icon{color:var(--calcite-app-foreground-link);-ms-flex:0 0 0%;flex:0 0 0%;line-height:0;width:var(--calcite-app-icon-size);margin:0 var(--calcite-app-side-spacing-quarter);opacity:0}:host([selected]) .icon{-webkit-transition:opacity var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:opacity var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);opacity:1}.label{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half);-ms-flex-align:center;align-items:center;cursor:pointer}.label:focus{outline-offset:var(--calcite-app-outline-inset)}.text-container{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;overflow:hidden;pointer-events:none;padding:0 var(--calcite-app-side-spacing-quarter)}.title{font-size:var(--calcite-app-font-size-0);display:-webkit-box;overflow:hidden;white-space:pre-wrap;word-break:break-all;-webkit-line-clamp:2;-webkit-box-orient:vertical}.description{color:var(--calcite-app-foreground-subtle);font-family:var(--calcite-app-font-family-monospace);font-size:var(--calcite-app-font-size--1);margin-top:var(--calcite-app-cap-spacing-quarter);display:-webkit-box;overflow:hidden;white-space:pre-wrap;word-break:break-all;-webkit-line-clamp:2;-webkit-box-orient:vertical}.action{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;justify-self:flex-end;margin:var(--calcite-app-cap-spacing-quarter) var(--calcite-app-side-spacing-half)}";
var CalcitePickListItem = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
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
        this.pickListClickHandler = function (event) {
            if (_this.disabled || (_this.disableDeselect && _this.selected)) {
                return;
            }
            _this.shiftPressed = event.shiftKey;
            _this.selected = !_this.selected;
        };
        this.pickListKeyDownHandler = function (event) {
            if (event.key === " ") {
                event.preventDefault();
                if (_this.disableDeselect && _this.selected) {
                    return;
                }
                _this.selected = !_this.selected;
            }
        };
        this.removeClickHandler = function () {
            _this.calciteListItemRemove.emit();
        };
        this.calciteListItemChange = createEvent(this, "calciteListItemChange", 7);
        this.calciteListItemRemove = createEvent(this, "calciteListItemRemove", 7);
        this.calciteListItemPropsChange = createEvent(this, "calciteListItemPropsChange", 7);
        this.calciteListItemValueChange = createEvent(this, "calciteListItemValueChange", 7);
    }
    class_1.prototype.metadataWatchHandler = function () {
        this.calciteListItemPropsChange.emit();
    };
    class_1.prototype.selectedWatchHandler = function () {
        this.calciteListItemChange.emit({
            item: this.el,
            value: this.value,
            selected: this.selected,
            shiftPressed: this.shiftPressed
        });
        this.shiftPressed = false;
    };
    class_1.prototype.textDescriptionWatchHandler = function () {
        this.calciteListItemPropsChange.emit();
    };
    class_1.prototype.textLabelWatchHandler = function () {
        this.calciteListItemPropsChange.emit();
    };
    class_1.prototype.valueWatchHandler = function (newValue, oldValue) {
        this.calciteListItemValueChange.emit({ oldValue: oldValue, newValue: newValue });
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    class_1.prototype.toggleSelected = function (coerce) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (this.disabled) {
                    return [2 /*return*/];
                }
                this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.focus();
                return [2 /*return*/];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.renderIcon = function () {
        var _b = this, compact = _b.compact, icon = _b.icon, selected = _b.selected;
        if (!icon || compact) {
            return null;
        }
        var iconName = icon === ICON_TYPES.circle ? ICONS.circle : selected ? ICONS.checked : ICONS.unchecked;
        return (h("span", { class: CSS.icon }, h("calcite-icon", { scale: "s", icon: iconName })));
    };
    class_1.prototype.renderRemoveAction = function () {
        if (!this.removable) {
            return null;
        }
        return (h("calcite-action", { scale: "s", class: CSS.remove, icon: ICONS.remove, text: this.textRemove, onClick: this.removeClickHandler }));
    };
    class_1.prototype.renderSecondaryAction = function () {
        var hasSecondaryAction = getSlotted(this.el, SLOTS.secondaryAction);
        return hasSecondaryAction || this.removable ? (h("div", { class: CSS.action }, h("slot", { name: SLOTS.secondaryAction }, this.renderRemoveAction()))) : null;
    };
    class_1.prototype.render = function () {
        var _this = this;
        var description = this.textDescription && !this.compact ? (h("span", { class: CSS.description }, this.textDescription)) : null;
        return (h(Host, { role: "menuitemcheckbox", "aria-checked": this.selected.toString() }, h("label", { class: CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, tabIndex: 0, ref: function (focusEl) { return (_this.focusEl = focusEl); }, "aria-label": this.textLabel }, this.renderIcon(), h("div", { class: CSS.textContainer }, h("span", { class: CSS.title }, this.textLabel), description)), this.renderSecondaryAction()));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "metadata": ["metadataWatchHandler"],
                "selected": ["selectedWatchHandler"],
                "textDescription": ["textDescriptionWatchHandler"],
                "textLabel": ["textLabelWatchHandler"],
                "value": ["valueWatchHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalcitePickListItem.style = calcitePickListItemCss;
export { CalcitePickListItem as calcite_pick_list_item };
