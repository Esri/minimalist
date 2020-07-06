import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d518aa55.js';
import { b as getElementProp, g as getElementDir } from './dom-d0864422.js';
import { g as getKey } from './key-3b974aad.js';

const CSS = {
    icon: "combobox-item-icon",
    label: "combobox-item-label",
    nested: "combobox-item-nested",
    parent: "combobox-item-parent",
    selected: "selected",
    title: "title",
    textContainer: "text-container"
};

const calciteComboboxItemCss = ":host([hidden]){display:none}:host([scale=xs]){font-size:10px;--calcite-combobox-item-spacing-unit-l:8px;--calcite-combobox-item-spacing-unit-s:4px}:host([scale=s]){font-size:12px;--calcite-combobox-item-spacing-unit-l:12px;--calcite-combobox-item-spacing-unit-s:8px}:host([scale=m]){font-size:14px;--calcite-combobox-item-spacing-unit-l:16px;--calcite-combobox-item-spacing-unit-s:12px}:host([scale=l]){font-size:16px;--calcite-combobox-item-spacing-unit-l:20px;--calcite-combobox-item-spacing-unit-s:16px}:host([scale=xl]){font-size:18px;--calcite-combobox-item-spacing-unit-l:24px;--calcite-combobox-item-spacing-unit-s:20px}:host,:host ul{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;margin:0;padding:0;outline:none}:host .combobox-item-label{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .combobox-item-label{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}:host .combobox-item-label{display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;min-width:100%;-ms-flex-align:center;align-items:center;color:var(--calcite-ui-text-3);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;padding:var(--calcite-combobox-item-spacing-unit-s);cursor:pointer;text-decoration:none;position:relative}:host .combobox-item-label .combobox-item-icon{display:-ms-inline-flexbox;display:inline-flex;opacity:0;margin-right:var(--calcite-combobox-item-spacing-unit-s);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;color:var(--calcite-ui-border-1)}:host([dir=rtl]) .combobox-item-label .combobox-item-icon{margin-left:var(--calcite-combobox-item-spacing-unit-l);margin-right:unset}:host .combobox-item-label.combobox-item-nested{padding-left:var(--calcite-combobox-item-spacing-unit-s)}:host .combobox-item-label.combobox-item-nested .combobox-item-icon{padding-left:var(--calcite-combobox-item-spacing-unit-l)}:host([dir=rtl]) .combobox-item-label.combobox-item-nested{padding-right:var(--calcite-combobox-item-spacing-unit-s);padding-left:unset}:host([dir=rtl]) .combobox-item-label.combobox-item-nested .combobox-item-icon{padding-right:var(--calcite-combobox-item-spacing-unit-l);padding-left:unset}:host(:not([disabled])) .combobox-item-label:hover,:host(:not([disabled])) .combobox-item-label:active{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);text-decoration:none;-webkit-box-shadow:none;box-shadow:none}:host(:not([disabled])) .combobox-item-label:hover .combobox-item-icon,:host(:not([disabled])) .combobox-item-label:active .combobox-item-icon{opacity:1}:host(:focus:not([disabled])) .combobox-item-label{color:var(--calcite-ui-text-1);text-decoration:none;-webkit-box-shadow:none;box-shadow:none}:host(:focus:not([disabled])) .combobox-item-label .combobox-item-icon{opacity:1}:host([disabled]) .combobox-item-label:hover .combobox-item-icon{opacity:1}:host([disabled]) .combobox-item-label:hover{cursor:default}:host(:focus){-webkit-box-shadow:none;box-shadow:none}:host .combobox-item-label.selected{color:var(--calcite-ui-text-1);font-weight:500}:host .combobox-item-label.selected .combobox-item-icon{color:var(--calcite-ui-blue-1);opacity:1}";

const CalciteComboboxItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /* When true, the item cannot be clicked and is visually muted. */
        this.disabled = false;
        /* Set this to true to pre-select an item. Toggles when an item is checked/unchecked. */
        this.selected = false;
        this.isSelected = this.selected;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.itemClickHandler = (event) => {
            event.preventDefault();
            if (this.disabled) {
                return;
            }
            this.isSelected = !this.isSelected;
            this.calciteComboboxItemChange.emit(this.el);
        };
        this.calciteComboboxItemChange = createEvent(this, "calciteComboboxItemChange", 7);
        this.calciteComboboxItemKeyEvent = createEvent(this, "calciteComboboxItemKeyEvent", 7);
    }
    selectedWatchHandler(newValue) {
        this.isSelected = newValue;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentWillLoad() {
        this.isNested = this.getDepth();
        this.hasDefaultSlot = this.el.querySelector(":not([slot])") !== null;
    }
    // --------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    // --------------------------------------------------------------------------
    keyDownHandler(event) {
        event.stopPropagation();
        switch (getKey(event.key)) {
            case " ":
            case "Enter":
                this.isSelected = !this.isSelected;
                this.calciteComboboxItemChange.emit(this.el);
                event.preventDefault();
                break;
            case "ArrowUp":
            case "ArrowDown":
            case "Home":
            case "End":
            case "Tab":
            case "Escape":
                this.calciteComboboxItemKeyEvent.emit({
                    event: event,
                    item: this.el,
                });
                event.preventDefault();
                break;
        }
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
        this.isSelected = typeof coerce === "boolean" ? coerce : !this.isSelected;
    }
    getDepth() {
        var _a;
        return !!((_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-combobox-item"));
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon(scale) {
        const iconScale = scale === "xs" || scale === "s" || scale === "m"
            ? "s"
            : scale === "l"
                ? "m"
                : "l";
        const iconPath = this.disabled ? "circle-disallowed" : "check";
        return h("calcite-icon", { class: CSS.icon, scale: iconScale, icon: iconPath });
    }
    renderChildren() {
        if (!this.hasDefaultSlot) {
            return null;
        }
        return (h("ul", null, h("slot", null)));
    }
    render() {
        const classes = {
            [CSS.label]: true,
            [CSS.selected]: this.isSelected,
            [CSS.nested]: this.isNested,
            [CSS.parent]: !this.isNested,
        };
        const scale = getElementProp(this.el, "scale", "m");
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir, scale: scale, role: "option", "aria-selected": this.isSelected, disabled: this.disabled, tabIndex: this.disabled ? null : 0 }, h("div", { class: classes, onClick: this.itemClickHandler, ref: (el) => (this.comboboxItemEl = el) }, this.renderIcon(scale), h("span", { class: CSS.title }, this.textLabel)), this.renderChildren()));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selected": ["selectedWatchHandler"]
    }; }
};
CalciteComboboxItem.style = calciteComboboxItemCss;

export { CalciteComboboxItem as calcite_combobox_item };
