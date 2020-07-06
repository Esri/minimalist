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
import { r as registerInstance, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { a as guid } from './guid-80e40540.js';
import { I as ICON_TYPES } from './resources-3de36c7f.js';
import { C as CSS } from './resources-0ee2d40e.js';
var ICONS = {
    drag: "drag"
};
var calciteValueListItemCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-webkit-box-shadow:0 -1px 0 var(--calcite-app-border) inset;box-shadow:0 -1px 0 var(--calcite-app-border) inset;display:-ms-flexbox;display:flex;padding:var(--calcite-app-side-spacing-minimum);-webkit-transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host(:hover){background-color:var(--calcite-app-background-hover)}:host([selected]){-webkit-box-shadow:0 0 0 1px var(--calcite-app-border-active) inset;box-shadow:0 0 0 1px var(--calcite-app-border-active) inset}calcite-pick-list-item{background-color:var(--calcite-app-background-clear);-webkit-box-shadow:none;box-shadow:none;-ms-flex-positive:1;flex-grow:1;position:relative;margin:0}.handle{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-pack:center;justify-content:center;margin-bottom:var(--calcite-app-cap-spacing-minimum);padding:var(--calcite-app-cap-spacing-three-quarters) var(--calcite-app-side-spacing-half);background-color:var(--calcite-app-background-clear);border:none;color:var(--calcite-app-foreground-subtle);line-height:0;cursor:move}.handle:focus{outline-offset:var(--calcite-app-outline-inset)}.handle:focus{outline-offset:var(--calcite-app-outline-inset)}.handle--activated{background-color:var(--calcite-app-background-active);color:var(--calcite-app-foreground-active)}:host(:last-child) .handle{margin-bottom:0}";
var CalciteValueListItem = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Compact reduces the size of the item.
         *
         * @deprecated This property will be removed in a future release.
         */
        this.compact = false;
        /**
         * When true, the item cannot be clicked and is visually muted
         */
        this.disabled = false;
        /**
         * @internal When false, the item cannot be deselected by user interaction.
         */
        this.disableDeselect = false;
        /**
         * @internal - stores the activated state of the drag handle.
         */
        this.handleActivated = false;
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
        this.pickListItem = null;
        this.guid = "calcite-value-list-item-" + guid();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getPickListRef = function (el) { return (_this.pickListItem = el); };
        this.handleKeyDown = function (event) {
            if (event.key === " ") {
                _this.handleActivated = !_this.handleActivated;
            }
        };
        this.handleBlur = function () {
            _this.handleActivated = false;
        };
        this.handleSelectChange = function (event) {
            _this.selected = event.detail.selected;
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.toggleSelected = function (coerce) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.pickListItem.toggleSelected(coerce);
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                (_a = this.pickListItem) === null || _a === void 0 ? void 0 : _a.setFocus();
                return [2 /*return*/];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Events
    //
    // --------------------------------------------------------------------------
    class_1.prototype.calciteListItemChangeHandler = function (event) {
        // adjust item payload from wrapped item before bubbling
        event.detail.item = this.el;
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.renderHandle = function () {
        var _b;
        var icon = this.icon;
        if (icon === ICON_TYPES.grip) {
            return (h("span", { role: "button", class: (_b = {}, _b[CSS.handle] = true, _b[CSS.handleActivated] = this.handleActivated, _b), tabindex: "0", "data-js-handle": "true", "aria-pressed": this.handleActivated.toString(), onKeyDown: this.handleKeyDown, onBlur: this.handleBlur }, h("calcite-icon", { scale: "s", icon: ICONS.drag })));
        }
    };
    class_1.prototype.render = function () {
        return (h(Host, { "data-id": this.guid }, this.renderHandle(), h("calcite-pick-list-item", { compact: this.compact, ref: this.getPickListRef, disabled: this.disabled, disableDeselect: this.disableDeselect, selected: this.selected, metadata: this.metadata, removable: this.removable, textLabel: this.textLabel, textDescription: this.textDescription, onCalciteListItemChange: this.handleSelectChange, value: this.value }, h("slot", { name: "secondary-action", slot: "secondary-action" }))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalciteValueListItem.style = calciteValueListItemCss;
export { CalciteValueListItem as calcite_value_list_item };
