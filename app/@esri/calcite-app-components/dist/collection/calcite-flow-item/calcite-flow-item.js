import { Component, Element, Event, Host, Listen, Prop, h } from "@stencil/core";
import { focusElement, getElementDir, getSlotted } from "../utils/dom";
import classnames from "classnames";
import { BLACKLISTED_MENU_ACTIONS_COMPONENTS, CSS, ICONS, SLOTS, TEXT } from "./resources";
import { SLOTS as PANEL_SLOTS } from "../calcite-panel/resources";
import { getRoundRobinIndex } from "../utils/array";
const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];
/**
 * @slot menu-actions - A slot for adding `calcite-action`s to a menu under the `...` in the header. These actions are displayed when the menu is open.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - A slot for adding `calcite-button`s to the footer.
 * @slot - A slot for adding content to the flow item.
 */
export class CalciteFlowItem {
    constructor() {
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Opens the action menu.
         */
        this.menuOpen = false;
        /**
         * Shows a back button in the header.
         */
        this.showBackButton = false;
        this.toggleMenuOpen = () => {
            this.menuOpen = !this.menuOpen;
        };
        this.backButtonClick = () => {
            this.calciteFlowItemBackClick.emit();
        };
        this.menuButtonKeyDown = (event) => {
            const { key } = event;
            const { menuOpen } = this;
            if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
                return;
            }
            const actions = this.queryActions();
            const { length } = actions;
            if (!length) {
                return;
            }
            event.preventDefault();
            if (!menuOpen) {
                this.menuOpen = true;
            }
            if (key === "ArrowUp") {
                const lastAction = actions[length - 1];
                focusElement(lastAction);
            }
            if (key === "ArrowDown") {
                const firstAction = actions[0];
                focusElement(firstAction);
            }
        };
        this.menuActionsKeydown = (event) => {
            const { key, target } = event;
            if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
                return;
            }
            const actions = this.queryActions();
            const { length } = actions;
            const currentIndex = actions.indexOf(target);
            if (!length || currentIndex === -1) {
                return;
            }
            event.preventDefault();
            if (key === "ArrowUp") {
                const value = getRoundRobinIndex(currentIndex - 1, length);
                const previousAction = actions[value];
                focusElement(previousAction);
            }
            if (key === "ArrowDown") {
                const value = getRoundRobinIndex(currentIndex + 1, length);
                const nextAction = actions[value];
                focusElement(nextAction);
            }
        };
        this.menuActionsContainerKeyDown = (event) => {
            const { key } = event;
            if (key === "Escape") {
                this.menuOpen = false;
            }
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    handleCalcitePanelScroll(event) {
        event.stopPropagation();
        this.calciteFlowItemScroll.emit();
    }
    queryActions() {
        return getSlotted(this.el, SLOTS.menuActions, {
            all: true
        });
    }
    isValidKey(key, supportedKeys) {
        return !!supportedKeys.find((k) => k === key);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderBackButton(rtl) {
        const { showBackButton, intlBack, textBack, backButtonClick } = this;
        const label = intlBack || textBack || TEXT.back;
        const icon = rtl ? ICONS.backRight : ICONS.backLeft;
        return showBackButton ? (h("calcite-action", { slot: PANEL_SLOTS.headerLeadingContent, key: "back-button", "aria-label": label, text: label, class: CSS.backButton, onClick: backButtonClick, icon: icon })) : null;
    }
    renderMenuButton() {
        const { menuOpen, textOpen, intlOpen, intlClose, textClose } = this;
        const closeLabel = intlClose || textClose || TEXT.close;
        const openLabel = intlOpen || textOpen || TEXT.open;
        const menuLabel = menuOpen ? closeLabel : openLabel;
        return (h("calcite-action", { class: CSS.menuButton, "aria-label": menuLabel, text: menuLabel, onClick: this.toggleMenuOpen, onKeyDown: this.menuButtonKeyDown, icon: ICONS.menu }));
    }
    renderMenuActions() {
        const { menuOpen } = this;
        return (h("div", { class: classnames(CSS.menu, { [CSS.menuOpen]: menuOpen }), onKeyDown: this.menuActionsKeydown },
            h("slot", { name: SLOTS.menuActions })));
    }
    renderFooterActions() {
        const hasFooterActions = !!getSlotted(this.el, SLOTS.footerActions);
        return hasFooterActions ? (h("div", { slot: PANEL_SLOTS.footer, class: CSS.footerActions },
            h("slot", { name: SLOTS.footerActions }))) : null;
    }
    renderSingleActionContainer() {
        return (h("div", { class: CSS.singleActionContainer },
            h("slot", { name: SLOTS.menuActions })));
    }
    renderMenuActionsContainer() {
        return (h("div", { class: CSS.menuContainer, onKeyDown: this.menuActionsContainerKeyDown },
            this.renderMenuButton(),
            this.renderMenuActions()));
    }
    renderHeaderActions() {
        const menuActions = getSlotted(this.el, SLOTS.menuActions, { all: true });
        const filteredActions = menuActions.filter((el) => !el.closest(BLACKLISTED_MENU_ACTIONS_COMPONENTS.join(",")));
        const actionCount = filteredActions.length;
        const menuActionsNodes = actionCount === 1
            ? this.renderSingleActionContainer()
            : actionCount
                ? this.renderMenuActionsContainer()
                : null;
        return menuActionsNodes ? (h("div", { slot: PANEL_SLOTS.headerTrailingContent, class: CSS.headerActions }, menuActionsNodes)) : null;
    }
    renderHeading() {
        const { heading } = this;
        return heading ? (h("h2", { class: CSS.heading, slot: PANEL_SLOTS.headerContent }, heading)) : null;
    }
    renderSummary() {
        const { summary } = this;
        return summary ? h("span", { class: CSS.summary }, summary) : null;
    }
    renderHeader() {
        const headingNode = this.renderHeading();
        const summaryNode = this.renderSummary();
        return headingNode || summaryNode ? (h("div", { class: CSS.header, slot: PANEL_SLOTS.headerContent },
            headingNode,
            summaryNode)) : null;
    }
    renderFab() {
        const hasFab = getSlotted(this.el, SLOTS.fab);
        return hasFab ? (h("div", { class: CSS.fabContainer, slot: PANEL_SLOTS.fab },
            h("slot", { name: SLOTS.fab }))) : null;
    }
    render() {
        const { el } = this;
        const dir = getElementDir(el);
        return (h(Host, null,
            h("calcite-panel", { loading: this.loading, disabled: this.disabled, "height-scale": this.heightScale, dir: dir },
                this.renderBackButton(dir === "rtl"),
                this.renderHeader(),
                this.renderHeaderActions(),
                h("slot", null),
                this.renderFooterActions(),
                this.renderFab())));
    }
    static get is() { return "calcite-flow-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-flow-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-flow-item.css"]
    }; }
    static get properties() { return {
        "beforeBack": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "() => Promise<void>",
                "resolved": "() => Promise<void>",
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "When provided, this method will be called before it is removed from the parent flow."
            }
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
                "text": "Specifies the maxiumum height of the panel that this wraps."
            },
            "attribute": "height-scale",
            "reflect": true
        },
        "heading": {
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
                "text": "Heading text."
            },
            "attribute": "heading",
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
        "menuOpen": {
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
                "text": "Opens the action menu."
            },
            "attribute": "menu-open",
            "reflect": true,
            "defaultValue": "false"
        },
        "showBackButton": {
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
                "text": "Shows a back button in the header."
            },
            "attribute": "show-back-button",
            "reflect": false,
            "defaultValue": "false"
        },
        "summary": {
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
                "text": "Summary text. A description displayed underneath the heading."
            },
            "attribute": "summary",
            "reflect": false
        },
        "intlBack": {
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
                "text": "'Back' text string."
            },
            "attribute": "intl-back",
            "reflect": false
        },
        "textBack": {
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
                        "text": "use \"intlBack\" instead.",
                        "name": "deprecated"
                    }],
                "text": "'Back' text string."
            },
            "attribute": "text-back",
            "reflect": false
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
                "text": "'Close' text string for the menu."
            },
            "attribute": "text-close",
            "reflect": false
        },
        "intlOpen": {
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
                "text": "'Open' text string for the menu."
            },
            "attribute": "intl-open",
            "reflect": false
        },
        "textOpen": {
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
                        "text": "use \"intlOpen\" instead.",
                        "name": "deprecated"
                    }],
                "text": "'Open' text string for the menu."
            },
            "attribute": "text-open",
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
            "method": "calciteFlowItemBackClick",
            "name": "calciteFlowItemBackClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the back button has been clicked."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "calciteFlowItemScroll",
            "name": "calciteFlowItemScroll",
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
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "calcitePanelScroll",
            "method": "handleCalcitePanelScroll",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
