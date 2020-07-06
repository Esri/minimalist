'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-bed90626.js');
const dom = require('./dom-ead89a9a.js');
const resources = require('./resources-d30f8d23.js');
const resources$1 = require('./resources-1cdb028e.js');

const calcitePickListItemCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-align:center;align-items:center;background-color:var(--calcite-app-background-clear);display:-ms-flexbox;display:flex;margin:0;color:var(--calcite-app-foreground);-webkit-transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:background-color var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);-webkit-animation:calcite-app-fade-in var(--calcite-app-animation-time) var(--calcite-app-easing-function);animation:calcite-app-fade-in var(--calcite-app-animation-time) var(--calcite-app-easing-function)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host(:hover),:host(:focus){background-color:var(--calcite-app-background-hover)}.icon{color:var(--calcite-app-foreground-link);-ms-flex:0 0 0%;flex:0 0 0%;line-height:0;width:var(--calcite-app-icon-size);margin:0 var(--calcite-app-side-spacing-quarter);opacity:0}:host([selected]) .icon{-webkit-transition:opacity var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:opacity var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);opacity:1}.label{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half);-ms-flex-align:center;align-items:center;cursor:pointer}.label:focus{outline-offset:var(--calcite-app-outline-inset)}.text-container{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;overflow:hidden;pointer-events:none;padding:0 var(--calcite-app-side-spacing-quarter)}.title{font-size:var(--calcite-app-font-size-0);display:-webkit-box;overflow:hidden;white-space:pre-wrap;word-break:break-all;-webkit-line-clamp:2;-webkit-box-orient:vertical}.description{color:var(--calcite-app-foreground-subtle);font-family:var(--calcite-app-font-family-monospace);font-size:var(--calcite-app-font-size--1);margin-top:var(--calcite-app-cap-spacing-quarter);display:-webkit-box;overflow:hidden;white-space:pre-wrap;word-break:break-all;-webkit-line-clamp:2;-webkit-box-orient:vertical}.action{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;justify-self:flex-end;margin:var(--calcite-app-cap-spacing-quarter) var(--calcite-app-side-spacing-half)}";

const CalcitePickListItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.textRemove = resources$1.TEXT.remove;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.pickListClickHandler = (event) => {
            if (this.disabled || (this.disableDeselect && this.selected)) {
                return;
            }
            this.shiftPressed = event.shiftKey;
            this.selected = !this.selected;
        };
        this.pickListKeyDownHandler = (event) => {
            if (event.key === " ") {
                event.preventDefault();
                if (this.disableDeselect && this.selected) {
                    return;
                }
                this.selected = !this.selected;
            }
        };
        this.removeClickHandler = () => {
            this.calciteListItemRemove.emit();
        };
        this.calciteListItemChange = index.createEvent(this, "calciteListItemChange", 7);
        this.calciteListItemRemove = index.createEvent(this, "calciteListItemRemove", 7);
        this.calciteListItemPropsChange = index.createEvent(this, "calciteListItemPropsChange", 7);
        this.calciteListItemValueChange = index.createEvent(this, "calciteListItemValueChange", 7);
    }
    metadataWatchHandler() {
        this.calciteListItemPropsChange.emit();
    }
    selectedWatchHandler() {
        this.calciteListItemChange.emit({
            item: this.el,
            value: this.value,
            selected: this.selected,
            shiftPressed: this.shiftPressed
        });
        this.shiftPressed = false;
    }
    textDescriptionWatchHandler() {
        this.calciteListItemPropsChange.emit();
    }
    textLabelWatchHandler() {
        this.calciteListItemPropsChange.emit();
    }
    valueWatchHandler(newValue, oldValue) {
        this.calciteListItemValueChange.emit({ oldValue, newValue });
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    async toggleSelected(coerce) {
        if (this.disabled) {
            return;
        }
        this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
    }
    async setFocus() {
        var _a;
        (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon() {
        const { compact, icon, selected } = this;
        if (!icon || compact) {
            return null;
        }
        const iconName = icon === resources.ICON_TYPES.circle ? resources$1.ICONS.circle : selected ? resources$1.ICONS.checked : resources$1.ICONS.unchecked;
        return (index.h("span", { class: resources$1.CSS.icon }, index.h("calcite-icon", { scale: "s", icon: iconName })));
    }
    renderRemoveAction() {
        if (!this.removable) {
            return null;
        }
        return (index.h("calcite-action", { scale: "s", class: resources$1.CSS.remove, icon: resources$1.ICONS.remove, text: this.textRemove, onClick: this.removeClickHandler }));
    }
    renderSecondaryAction() {
        const hasSecondaryAction = dom.getSlotted(this.el, resources$1.SLOTS.secondaryAction);
        return hasSecondaryAction || this.removable ? (index.h("div", { class: resources$1.CSS.action }, index.h("slot", { name: resources$1.SLOTS.secondaryAction }, this.renderRemoveAction()))) : null;
    }
    render() {
        const description = this.textDescription && !this.compact ? (index.h("span", { class: resources$1.CSS.description }, this.textDescription)) : null;
        return (index.h(index.Host, { role: "menuitemcheckbox", "aria-checked": this.selected.toString() }, index.h("label", { class: resources$1.CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, tabIndex: 0, ref: (focusEl) => (this.focusEl = focusEl), "aria-label": this.textLabel }, this.renderIcon(), index.h("div", { class: resources$1.CSS.textContainer }, index.h("span", { class: resources$1.CSS.title }, this.textLabel), description)), this.renderSecondaryAction()));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "metadata": ["metadataWatchHandler"],
        "selected": ["selectedWatchHandler"],
        "textDescription": ["textDescriptionWatchHandler"],
        "textLabel": ["textLabelWatchHandler"],
        "value": ["valueWatchHandler"]
    }; }
};
CalcitePickListItem.style = calcitePickListItemCss;

exports.calcite_pick_list_item = CalcitePickListItem;
