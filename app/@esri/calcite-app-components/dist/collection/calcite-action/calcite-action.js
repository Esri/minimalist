import { Host, h } from "@stencil/core";
import classnames from "classnames";
import { CSS } from "./resources";
import { CSS_UTILITY } from "../utils/resources";
import { getElementDir } from "../utils/dom";
/**
 * @slot - A slot for adding a `calcite-icon`.
 */
export class CalciteAction {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /** Specify the appearance style of the action, defaults to solid. */
        this.appearance = "solid";
        /**
         * Indicates whether the action is highlighted.
         */
        this.active = false;
        /**
         * Compact mode is used internally by components to reduce side padding, e.g. calcite-block-section.
         */
        this.compact = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * Indicates unread changes.
         */
        this.indicator = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Specifies the size of the action.
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
        this.buttonEl.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderTextContainer() {
        const { text, textEnabled } = this;
        const textContainerClasses = {
            [CSS.textContainerVisible]: textEnabled
        };
        return text ? (h("div", { key: "text-container", class: classnames(CSS.textContainer, textContainerClasses) }, text)) : null;
    }
    renderIconContainer() {
        const { loading } = this;
        const calciteLoaderNode = h("calcite-loader", { "is-active": true, inline: true });
        const slotContainerNode = (h("div", { class: classnames(CSS.slotContainer, {
                [CSS.slotContainerHidden]: loading
            }) },
            h("slot", null)));
        const iconNode = loading
            ? calciteLoaderNode
            : this.el.querySelector("calcite-icon, svg")
                ? slotContainerNode
                : null;
        return iconNode ? (h("div", { key: "icon-container", "aria-hidden": "true", class: CSS.iconContainer }, iconNode)) : null;
    }
    render() {
        const { compact, disabled, loading, el, textEnabled, label, text } = this;
        const titleText = !textEnabled && text;
        const title = label || titleText;
        const rtl = getElementDir(el) === "rtl";
        const buttonClasses = {
            [CSS.buttonTextVisible]: textEnabled,
            [CSS.buttonCompact]: compact,
            [CSS_UTILITY.rtl]: rtl
        };
        return (h(Host, null,
            h("button", { class: classnames(CSS.button, buttonClasses), title: title, "aria-label": title, disabled: disabled, "aria-disabled": disabled.toString(), "aria-busy": loading.toString(), ref: (buttonEl) => (this.buttonEl = buttonEl) },
                this.renderIconContainer(),
                this.renderTextContainer())));
    }
    static get is() { return "calcite-action"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-action.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-action.css"]
    }; }
    static get properties() { return {
        "appearance": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalciteAppearance",
                "resolved": "\"clear\" | \"solid\"",
                "references": {
                    "CalciteAppearance": {
                        "location": "import",
                        "path": "../interfaces"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Specify the appearance style of the action, defaults to solid."
            },
            "attribute": "appearance",
            "reflect": true,
            "defaultValue": "\"solid\""
        },
        "active": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether the action is highlighted."
            },
            "attribute": "active",
            "reflect": true,
            "defaultValue": "false"
        },
        "compact": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Compact mode is used internally by components to reduce side padding, e.g. calcite-block-section."
            },
            "attribute": "compact",
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "When true, disabled prevents interaction. This state shows items with lower opacity/grayed."
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "indicator": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates unread changes."
            },
            "attribute": "indicator",
            "reflect": true,
            "defaultValue": "false"
        },
        "label": {
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
                "text": "Label of the action, exposed on hover. If no label is provided, the label inherits what's provided for the `text` prop."
            },
            "attribute": "label",
            "reflect": false
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "When true, content is waiting to be loaded. This state shows a busy indicator."
            },
            "attribute": "loading",
            "reflect": true,
            "defaultValue": "false"
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalciteScale",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {
                    "CalciteScale": {
                        "location": "import",
                        "path": "../interfaces"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Specifies the size of the action."
            },
            "attribute": "scale",
            "reflect": true,
            "defaultValue": "\"m\""
        },
        "text": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": true,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Text that accompanies the action icon."
            },
            "attribute": "text",
            "reflect": false
        },
        "textEnabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Indicates whether the text is displayed."
            },
            "attribute": "text-enabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "CalciteTheme",
                "resolved": "\"dark\" | \"light\"",
                "references": {
                    "CalciteTheme": {
                        "location": "import",
                        "path": "../interfaces"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Used to set the component's color scheme."
            },
            "attribute": "theme",
            "reflect": true
        }
    }; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
