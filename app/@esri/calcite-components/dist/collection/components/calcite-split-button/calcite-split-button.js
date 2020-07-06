import { Component, Element, Event, h, Host, Prop, Watch, } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
export class CalciteButtonWithDropdown {
    constructor() {
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
        this.calciteSplitButtonPrimaryClickHandler = (e) => this.calciteSplitButtonPrimaryClick.emit(e);
    }
    validateColor() {
        let color = ["blue", "red", "dark", "light"];
        if (!color.includes(this.color))
            this.color = "blue";
    }
    validateScale() {
        let scale = ["xs", "s", "m", "l", "xl"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    validateTheme() {
        let theme = ["dark", "light"];
        if (!theme.includes(this.theme))
            this.theme = "light";
    }
    validateDropdownIconType() {
        let dropdownIconType = ["chevron", "caret"];
        if (!dropdownIconType.includes(this.dropdownIconType))
            this.dropdownIconType = "chevron";
    }
    connectedCallback() {
        this.validateColor();
        this.validateScale();
        this.validateTheme();
        this.validateDropdownIconType();
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { dir: dir },
            h("div", { class: "split-button__container" },
                h("calcite-button", { "aria-label": this.primaryLabel, color: this.color, scale: this.buttonScale, loading: this.loading, icon: this.primaryIcon, iconPosition: "start", disabled: this.disabled, theme: this.theme, onClick: this.calciteSplitButtonPrimaryClickHandler }, this.primaryText),
                h("div", { class: "split-button__divider-container" },
                    h("div", { class: "split-button__divider" })),
                h("calcite-dropdown", { alignment: "end", dir: dir, theme: this.theme, scale: this.dropdownScale, width: this.dropdownScale },
                    h("calcite-button", { "aria-label": this.dropdownLabel, slot: "dropdown-trigger", scale: this.buttonScale, color: this.color, disabled: this.disabled, theme: this.theme, icon: this.dropdownIcon }),
                    h("slot", null)))));
    }
    get dropdownIcon() {
        return this.dropdownIconType === "chevron" ? "chevronDown" : "caretDown";
    }
    get buttonScale() {
        const scaleLookup = {
            s: "xs",
            m: "s",
            l: "m",
        };
        return scaleLookup[this.scale];
    }
    get dropdownScale() {
        const scaleLookup = {
            s: "s",
            m: "s",
            l: "m",
        };
        return scaleLookup[this.scale];
    }
    static get is() { return "calcite-split-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-split-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-split-button.css"]
    }; }
    static get properties() { return {
        "color": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"blue\"\n    | \"dark\"\n    | \"light\"\n    | \"red\"",
                "resolved": "\"blue\" | \"dark\" | \"light\" | \"red\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the color of the control, defaults to blue"
            },
            "attribute": "color",
            "reflect": true,
            "defaultValue": "\"blue\""
        },
        "theme": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"light\" | \"dark\"",
                "resolved": "\"dark\" | \"light\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "select theme (light or dark), defaults to light"
            },
            "attribute": "theme",
            "reflect": true,
            "defaultValue": "\"light\""
        },
        "scale": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of the control, defaults to m"
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "dropdownIconType": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "| \"chevron\"\n    | \"caret\"",
                "resolved": "\"caret\" | \"chevron\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the icon used for the dropdown menu, defaults to chevron"
            },
            "attribute": "dropdown-icon-type",
            "reflect": true,
            "defaultValue": "\"chevron\""
        },
        "primaryText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "text for primary action button"
            },
            "attribute": "primary-text",
            "reflect": true
        },
        "primaryIcon": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "optionally pass an icon to display on the primary button - accepts Calcite UI icon names"
            },
            "attribute": "primary-icon",
            "reflect": true
        },
        "primaryLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "optionally pass an aria-label for the primary button"
            },
            "attribute": "primary-label",
            "reflect": true
        },
        "dropdownLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "aria label for overflow button"
            },
            "attribute": "dropdown-label",
            "reflect": true
        },
        "loading": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "optionally add a calcite-loader component to the control,\ndisabling interaction. with the primary button"
            },
            "attribute": "loading",
            "reflect": true,
            "defaultValue": "false"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "is the control disabled"
            },
            "attribute": "disabled",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteSplitButtonPrimaryClick",
            "name": "calciteSplitButtonPrimaryClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "fired when the primary button is clicked"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "color",
            "methodName": "validateColor"
        }, {
            "propName": "scale",
            "methodName": "validateScale"
        }, {
            "propName": "theme",
            "methodName": "validateTheme"
        }, {
            "propName": "dropdownIconType",
            "methodName": "validateDropdownIconType"
        }]; }
}
