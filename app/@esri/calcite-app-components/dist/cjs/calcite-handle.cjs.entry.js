'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-bed90626.js');

const CSS = {
    handle: "handle",
    handleActivated: "handle--activated"
};
const ICONS = {
    drag: "drag"
};

const calciteHandleCss = ":host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host{display:inline-block}.handle{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-pack:center;justify-content:center;margin-bottom:var(--calcite-app-cap-spacing-minimum);padding:var(--calcite-app-cap-spacing-three-quarters) var(--calcite-app-side-spacing-half);background-color:var(--calcite-app-background);border:none;color:var(--calcite-app-foreground-subtle);line-height:0;cursor:move}.handle:focus{outline-offset:var(--calcite-app-outline-inset)}.handle:focus{outline-offset:var(--calcite-app-outline-inset)}.handle--activated{background-color:var(--calcite-app-background-active);color:var(--calcite-app-foreground-active)}";

const CalciteHandle = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * @internal - stores the activated state of the drag handle.
         */
        this.activated = false;
        /**
         * Value for the button title attribute
         */
        this.textTitle = "handle";
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleKeyDown = (event) => {
            switch (event.key) {
                case " ":
                    this.activated = !this.activated;
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    if (!this.activated) {
                        return;
                    }
                    const direction = event.key.toLowerCase().replace("arrow", "");
                    this.calciteHandleNudge.emit({ handle: this.el, direction });
                    break;
            }
        };
        this.handleBlur = () => {
            this.activated = false;
        };
        this.calciteHandleNudge = index.createEvent(this, "calciteHandleNudge", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    async setFocus() {
        this.handleButton.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (
        // Needs to be a span because of https://github.com/SortableJS/Sortable/issues/1486
        index.h("span", { role: "button", tabindex: "0", "aria-pressed": this.activated.toString(), class: { [CSS.handle]: true, [CSS.handleActivated]: this.activated }, onKeyDown: this.handleKeyDown, onBlur: this.handleBlur, title: this.textTitle, ref: (el) => {
                this.handleButton = el;
            } }, index.h("calcite-icon", { scale: "s", icon: ICONS.drag })));
    }
    get el() { return index.getElement(this); }
};
CalciteHandle.style = calciteHandleCss;

exports.calcite_handle = CalciteHandle;
