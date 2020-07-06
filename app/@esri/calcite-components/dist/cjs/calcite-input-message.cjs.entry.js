'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8fc102d1.js');
const dom = require('./dom-581e28c5.js');

const calciteInputMessageCss = ":host([hidden]){display:none}:host([scale=s]){font-size:12px;--calcite-input-message-spacing-value:4px}:host([scale=m]){font-size:14px;--calcite-input-message-spacing-value:8px}:host([scale=l]){font-size:16px;--calcite-input-message-spacing-value:12px}:host{--calcite-input-message-floating-background:rgba(255, 255, 255, 0.96)}:host([theme=dark]){--calcite-input-message-floating-background:rgba(43, 43, 43, 0.96)}:host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-ui-text-2);font-weight:500;line-height:1.25;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;visibility:hidden;opacity:0;height:0}:host([active]){opacity:1;height:auto;visibility:visible;margin-top:var(--calcite-input-message-spacing-value)}:host([type=floating]){-webkit-transform:translate3d(0, -1.5rem, 0);transform:translate3d(0, -1.5rem, 0);background-color:var(--calcite-input-message-floating-background);position:absolute;width:100%;top:100%;left:0;right:0;height:auto;margin-top:-1.5rem;border-radius:var(--calcite-border-radius);-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);padding:var(--calcite-input-message-spacing-value);z-index:101}:host([type=floating][active]){-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}.calcite-input-message-icon{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-negative:0;flex-shrink:0;pointer-events:none;-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;margin:0 0.75rem 0 0;line-height:inherit;z-index:9;transition:150ms ease-in-out}:host([dir=rtl]) .calcite-input-message-icon{margin:0 0 0 0.75rem}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-ui-red-1)}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-ui-green-1)}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-ui-blue-1)}:host([type=floating][active]){-webkit-animation:floatingMessagePulse 0.5s ease-in-out;animation:floatingMessagePulse 0.5s ease-in-out;-webkit-animation-iteration-count:1;animation-iteration-count:1}@-webkit-keyframes floatingMessagePulse{0%{top:100%}25%{top:110%}50%{top:100%}75%{top:105%}100%{top:100%}}@keyframes floatingMessagePulse{0%{top:100%}25%{top:110%}50%{top:100%}75%{top:105%}100%{top:100%}}";

const CalciteInputMessage = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        this.active = false;
        /** specify the appearance type - minimal or default */
        this.appearance = "default";
        /** specify the appearance of any slotted message - default (displayed under input), or floating (positioned absolutely under input) */
        this.type = "default";
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        // icons for status and validation
        this.iconDefaults = {
            valid: "check-circle",
            invalid: "exclamation-mark-triangle",
            idle: "information",
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // validate props
        let appearance = ["default", "minimal"];
        if (!appearance.includes(this.appearance))
            this.appearance = "default";
        let statusOptions = ["invalid", "valid", "idle"];
        if (!statusOptions.includes(this.status))
            this.status = dom.getElementProp(this.el.parentElement, "status", "idle");
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = dom.getElementProp(this.el.parentElement, "scale", "m");
        let theme = ["light", "dark"];
        if (!theme.includes(this.theme))
            this.theme = dom.getElementProp(this.el.parentElement, "theme", "light");
        let type = ["default", "floating"];
        if (!type.includes(this.type))
            this.type = "default";
    }
    componentWillUpdate() {
        this.iconEl = this.setIcon(this.iconDefaults[this.status]);
    }
    render() {
        const dir = dom.getElementDir(this.el);
        this.iconEl = this.setIcon(this.iconDefaults[this.status]);
        return (index.h(index.Host, { theme: this.theme, dir: dir }, this.icon ? this.iconEl : null, index.h("slot", null)));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    setIcon(iconName) {
        return (index.h("calcite-icon", { class: "calcite-input-message-icon", scale: "s", icon: iconName }));
    }
    get el() { return index.getElement(this); }
};
CalciteInputMessage.style = calciteInputMessageCss;

exports.calcite_input_message = CalciteInputMessage;
