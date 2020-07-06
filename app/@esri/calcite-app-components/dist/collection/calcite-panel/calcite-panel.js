import { Component, Element, Event, Host, Method, Prop, Watch, h } from "@stencil/core";
import { CSS, ICONS, SLOTS, TEXT } from "./resources";
import { getElementDir, getSlotted } from "../utils/dom";
import classnames from "classnames";
import { CSS_UTILITY } from "../utils/resources";
import CalciteScrim from "../utils/CalciteScrim";
/**
 * @slot header-content - A slot for adding content in the center of the header.
 * @slot header-leading-content - A slot for adding a `calcite-action` on the leading side of the header.
 * @slot header-trailing-content - A slot for adding a `calcite-action` on the trailing side of the header.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding `calcite-button`s to the footer.
 * @slot - A slot for adding content to the panel.
 */
export class CalcitePanel {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Hides the panel.
         */
        this.dismissed = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * Displays a close button in the trailing side of the header.
         */
        this.dismissible = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.panelKeyUpHandler = (event) => {
            if (event.key === "Escape") {
                this.dismiss();
            }
        };
        this.dismiss = () => {
            this.dismissed = true;
        };
        this.panelScrollHandler = () => {
            this.calcitePanelScroll.emit();
        };
    }
    dismissedHandler() {
        this.calcitePanelDismissedChange.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    async setFocus(focusId) {
        var _a, _b;
        if (focusId === "dismiss-button") {
            (_a = this.dismissButtonEl) === null || _a === void 0 ? void 0 : _a.setFocus();
            return;
        }
        (_b = this.containerEl) === null || _b === void 0 ? void 0 : _b.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeaderLeadingContent() {
        const hasLeadingContent = getSlotted(this.el, SLOTS.headerLeadingContent);
        return hasLeadingContent ? (h("div", { key: "header-leading-content", class: CSS.headerLeadingContent },
            h("slot", { name: SLOTS.headerLeadingContent }))) : null;
    }
    renderHeaderContent() {
        return (h("div", { key: "header-content", class: CSS.headerContent },
            h("slot", { name: SLOTS.headerContent })));
    }
    renderHeaderTrailingContent() {
        const { dismiss, dismissible, intlClose, textClose } = this;
        const text = intlClose || textClose || TEXT.close;
        const dismissibleNode = dismissible ? (h("calcite-action", { ref: (dismissButtonEl) => (this.dismissButtonEl = dismissButtonEl), "aria-label": text, text: text, onClick: dismiss, icon: ICONS.close })) : null;
        const slotNode = h("slot", { name: SLOTS.headerTrailingContent });
        return (h("div", { key: "header-trailing-content", class: CSS.headerTrailingContent },
            slotNode,
            dismissibleNode));
    }
    renderHeader() {
        const headerLeadingContentNode = this.renderHeaderLeadingContent();
        const headerContentNode = this.renderHeaderContent();
        const headerTrailingContentNode = this.renderHeaderTrailingContent();
        const canDisplayHeader = headerContentNode || headerLeadingContentNode || headerTrailingContentNode;
        return canDisplayHeader ? (h("header", { class: CSS.header },
            headerLeadingContentNode,
            headerContentNode,
            headerTrailingContentNode)) : null;
    }
    renderFooter() {
        const { el } = this;
        const hasFooter = getSlotted(el, SLOTS.footer);
        return hasFooter ? (h("footer", { class: CSS.footer },
            h("slot", { name: SLOTS.footer }))) : null;
    }
    renderContent() {
        return (h("section", { class: CSS.contentContainer, onScroll: this.panelScrollHandler },
            h("slot", null),
            this.renderFab()));
    }
    renderFab() {
        const hasFab = getSlotted(this.el, SLOTS.fab);
        return hasFab ? (h("div", { class: CSS.fabContainer },
            h("slot", { name: SLOTS.fab }))) : null;
    }
    render() {
        const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;
        const rtl = getElementDir(el) === "rtl";
        return (h(Host, null,
            h("article", { "aria-busy": loading.toString(), onKeyUp: panelKeyUpHandler, tabIndex: dismissible ? 0 : -1, hidden: dismissible && dismissed, ref: (containerEl) => (this.containerEl = containerEl), class: classnames(CSS.container, {
                    [CSS_UTILITY.rtl]: rtl
                }) },
                this.renderHeader(),
                this.renderContent(),
                this.renderFooter()),
            h(CalciteScrim, { loading: loading, disabled: disabled })));
    }
    static get is() { return "calcite-panel"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-panel.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-panel.css"]
    }; }
    static get properties() { return {
        "dismissed": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Hides the panel."
            },
            "attribute": "dismissed",
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
        "dismissible": {
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
                "text": "Displays a close button in the trailing side of the header."
            },
            "attribute": "dismissible",
            "reflect": true,
            "defaultValue": "false"
        },
        "heightScale": {
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
                "text": "Specifies the maxiumum height of the panel."
            },
            "attribute": "height-scale",
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "When true, content is waiting to be loaded. This state shows a busy indicator."
            },
            "attribute": "loading",
            "reflect": true,
            "defaultValue": "false"
        },
        "intlClose": {
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
                "text": "'Close' text string for the close button. The close button will only be shown when 'dismissible' is true."
            },
            "attribute": "intl-close",
            "reflect": false
        },
        "textClose": {
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
                "tags": [{
                        "text": "use \"intlClose\" instead.",
                        "name": "deprecated"
                    }],
                "text": "'Close' text string for the close button. The close button will only be shown when 'dismissible' is true."
            },
            "attribute": "text-close",
            "reflect": false
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
    static get events() { return [{
            "method": "calcitePanelDismissedChange",
            "name": "calcitePanelDismissedChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the close button has been clicked."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calcitePanelScroll",
            "name": "calcitePanelScroll",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the content has been scrolled."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "setFocus": {
            "complexType": {
                "signature": "(focusId?: \"dismiss-button\") => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "FocusId": {
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
    static get watchers() { return [{
            "propName": "dismissed",
            "methodName": "dismissedHandler"
        }]; }
}
