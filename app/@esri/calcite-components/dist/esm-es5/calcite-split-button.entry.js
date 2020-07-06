import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d518aa55.js';
import { g as getElementDir } from './dom-d0864422.js';
var calciteSplitButtonCss = ":host([hidden]){display:none}:host{--calcite-button-light:#eaeaea;--calcite-button-light-text:#151515;--calcite-button-dark:#404040;--calcite-button-dark-text:#0b0b0b}:host .split-button__container{display:-ms-flexbox;display:flex}:host .split-button__container>calcite-dropdown>calcite-button{height:100%}:host([color=blue]) .split-button__divider-container{background-color:var(--calcite-ui-blue-1)}:host([color=blue]):host([theme=dark]) .split-button__divider{background-color:var(--calcite-button-dark-text)}:host([color=red]) .split-button__divider-container{background-color:var(--calcite-ui-red-1)}:host([color=red]):host([theme=dark]) .split-button__divider{background-color:var(--calcite-button-dark-text)}:host([color=light]) .split-button__divider-container{background-color:var(--calcite-button-light)}:host([color=light]) .split-button__divider{background-color:var(--calcite-button-light-text)}:host([color=dark]) .split-button__divider-container{background-color:var(--calcite-button-dark)}:host([disabled]) .split-button__divider-container{opacity:0.4}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}.split-button__divider-container{width:1px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transition:all 0.15s ease-in-out;transition:all 0.15s ease-in-out}.split-button__divider{width:1px;height:66.666%;display:inline-block;background-color:white}";
var CalciteButtonWithDropdown = /** @class */ (function () {
    function CalciteButtonWithDropdown(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /** specify the color of the control, defaults to blue */
        this.color = "blue";
        /** select theme (light or dark), defaults to light */
        this.theme = "light";
        /** specify the scale of the control, defaults to m */
        this.scale = "m";
        /** specify the icon used for the dropdown menu, defaults to chevron */
        this.dropdownIconType = "chevron";
        /** optionally add a calcite-loader component to the control,
          disabling interaction. with the primary button */
        this.loading = false;
        this.calciteSplitButtonPrimaryClickHandler = function (e) { return _this.calciteSplitButtonPrimaryClick.emit(e); };
        this.calciteSplitButtonPrimaryClick = createEvent(this, "calciteSplitButtonPrimaryClick", 7);
    }
    CalciteButtonWithDropdown.prototype.validateColor = function () {
        var color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
    };
    CalciteButtonWithDropdown.prototype.validateScale = function () {
        var scale = ["xs", "s", "m", "l", "xl"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    };
    CalciteButtonWithDropdown.prototype.validateTheme = function () {
        var theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
    };
    CalciteButtonWithDropdown.prototype.validateDropdownIconType = function () {
        var dropdownIconType = ["chevron", "caret"];
        if (!dropdownIconType.includes(this.dropdownIconType))
            this.dropdownIconType = "chevron";
    };
    CalciteButtonWithDropdown.prototype.connectedCallback = function () {
        this.validateColor();
        this.validateScale();
        this.validateTheme();
        this.validateDropdownIconType();
    };
    CalciteButtonWithDropdown.prototype.render = function () {
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "split-button__container" }, h("calcite-button", { "aria-label": this.primaryLabel, color: this.color, scale: this.buttonScale, loading: this.loading, icon: this.primaryIcon, iconPosition: "start", disabled: this.disabled, theme: this.theme, onClick: this.calciteSplitButtonPrimaryClickHandler }, this.primaryText), h("div", { class: "split-button__divider-container" }, h("div", { class: "split-button__divider" })), h("calcite-dropdown", { alignment: "end", dir: dir, theme: this.theme, scale: this.dropdownScale, width: this.dropdownScale }, h("calcite-button", { "aria-label": this.dropdownLabel, slot: "dropdown-trigger", scale: this.buttonScale, color: this.color, disabled: this.disabled, theme: this.theme, icon: this.dropdownIcon }), h("slot", null)))));
    };
    Object.defineProperty(CalciteButtonWithDropdown.prototype, "dropdownIcon", {
        get: function () {
            return this.dropdownIconType === "chevron" ? "chevronDown" : "caretDown";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteButtonWithDropdown.prototype, "buttonScale", {
        get: function () {
            var scaleLookup = {
                s: "xs",
                m: "s",
                l: "m",
            };
            return scaleLookup[this.scale];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteButtonWithDropdown.prototype, "dropdownScale", {
        get: function () {
            var scaleLookup = {
                s: "s",
                m: "s",
                l: "m",
            };
            return scaleLookup[this.scale];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteButtonWithDropdown.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteButtonWithDropdown, "watchers", {
        get: function () {
            return {
                "color": ["validateColor"],
                "scale": ["validateScale"],
                "theme": ["validateTheme"],
                "dropdownIconType": ["validateDropdownIconType"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return CalciteButtonWithDropdown;
}());
CalciteButtonWithDropdown.style = calciteSplitButtonCss;
export { CalciteButtonWithDropdown as calcite_split_button };
