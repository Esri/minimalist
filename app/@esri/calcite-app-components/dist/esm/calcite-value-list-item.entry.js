import { r as registerInstance, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { a as guid } from './guid-80e40540.js';
import { I as ICON_TYPES } from './resources-3de36c7f.js';
import { C as CSS } from './resources-0ee2d40e.js';

const ICONS = {
    drag: "drag"
};

const calciteValueListItemCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-webkit-box-shadow:0 -1px 0 var(--calcite-app-border) inset;box-shadow:0 -1px 0 var(--calcite-app-border) inset;display:-ms-flexbox;display:flex;padding:var(--calcite-app-side-spacing-minimum);-webkit-transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host(:hover){background-color:var(--calcite-app-background-hover)}:host([selected]){-webkit-box-shadow:0 0 0 1px var(--calcite-app-border-active) inset;box-shadow:0 0 0 1px var(--calcite-app-border-active) inset}calcite-pick-list-item{background-color:var(--calcite-app-background-clear);-webkit-box-shadow:none;box-shadow:none;-ms-flex-positive:1;flex-grow:1;position:relative;margin:0}.handle{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-pack:center;justify-content:center;margin-bottom:var(--calcite-app-cap-spacing-minimum);padding:var(--calcite-app-cap-spacing-three-quarters) var(--calcite-app-side-spacing-half);background-color:var(--calcite-app-background-clear);border:none;color:var(--calcite-app-foreground-subtle);line-height:0;cursor:move}.handle:focus{outline-offset:var(--calcite-app-outline-inset)}.handle:focus{outline-offset:var(--calcite-app-outline-inset)}.handle--activated{background-color:var(--calcite-app-background-active);color:var(--calcite-app-foreground-active)}:host(:last-child) .handle{margin-bottom:0}";

const CalciteValueListItem = class {
    constructor(hostRef) {
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
        this.guid = `calcite-value-list-item-${guid()}`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getPickListRef = (el) => (this.pickListItem = el);
        this.handleKeyDown = (event) => {
            if (event.key === " ") {
                this.handleActivated = !this.handleActivated;
            }
        };
        this.handleBlur = () => {
            this.handleActivated = false;
        };
        this.handleSelectChange = (event) => {
            this.selected = event.detail.selected;
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async toggleSelected(coerce) {
        this.pickListItem.toggleSelected(coerce);
    }
    async setFocus() {
        var _a;
        (_a = this.pickListItem) === null || _a === void 0 ? void 0 : _a.setFocus();
    }
    // --------------------------------------------------------------------------
    //
    //  Events
    //
    // --------------------------------------------------------------------------
    calciteListItemChangeHandler(event) {
        // adjust item payload from wrapped item before bubbling
        event.detail.item = this.el;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHandle() {
        const { icon } = this;
        if (icon === ICON_TYPES.grip) {
            return (h("span", { role: "button", class: { [CSS.handle]: true, [CSS.handleActivated]: this.handleActivated }, tabindex: "0", "data-js-handle": "true", "aria-pressed": this.handleActivated.toString(), onKeyDown: this.handleKeyDown, onBlur: this.handleBlur }, h("calcite-icon", { scale: "s", icon: ICONS.drag })));
        }
    }
    render() {
        return (h(Host, { "data-id": this.guid }, this.renderHandle(), h("calcite-pick-list-item", { compact: this.compact, ref: this.getPickListRef, disabled: this.disabled, disableDeselect: this.disableDeselect, selected: this.selected, metadata: this.metadata, removable: this.removable, textLabel: this.textLabel, textDescription: this.textDescription, onCalciteListItemChange: this.handleSelectChange, value: this.value }, h("slot", { name: "secondary-action", slot: "secondary-action" }))));
    }
    get el() { return getElement(this); }
};
CalciteValueListItem.style = calciteValueListItemCss;

export { CalciteValueListItem as calcite_value_list_item };
