import { r as registerInstance, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { f as focusElement, a as getElementDir } from './dom-7d75fa2b.js';

const CSS = {
    button: "button"
};
const ICONS = {
    plus: "plus"
};

const calciteFabCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{background-color:var(--calcite-app-background-transparent)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}";

const CalciteFab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Used to set the button's appearance. Default is outline.
         */
        this.appearance = "outline";
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * The name of the icon to display. The value of this property must match the icon name from https://esri.github.io/calcite-ui-icons/.
         */
        this.icon = ICONS.plus;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Specifies the size of the fab.
         */
        this.scale = "m";
        /**
         * Indicates whether the text is displayed.
         */
        this.textEnabled = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    async setFocus() {
        focusElement(this.buttonEl);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { appearance, disabled, el, loading, scale, theme, textEnabled, icon, label, text } = this;
        const titleText = !textEnabled && text;
        const title = label || titleText;
        const dir = getElementDir(el);
        return (h(Host, null, h("calcite-button", { class: CSS.button, loading: loading, disabled: disabled, title: title, "aria-label": label, theme: theme, dir: dir, scale: scale, icon: icon, round: true, floating: true, width: "auto", appearance: appearance, color: "blue", ref: (buttonEl) => {
                this.buttonEl = buttonEl;
            } }, this.textEnabled ? this.text : null)));
    }
    get el() { return getElement(this); }
};
CalciteFab.style = calciteFabCss;

export { CalciteFab as calcite_fab };
