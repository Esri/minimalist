import { Host, h } from "@stencil/core";
import classnames from "classnames";
import { CSS, ICONS, TEXT } from "./resources";
import { getElementDir } from "../utils/dom";
/**
 * @slot - A slot for adding `calcite-tip`s.
 */
export class CalciteTipManager {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Alternate text for closing the `calcite-tip-manager`.
         */
        this.closed = false;
        /**
         * Alternate text for closing the `calcite-tip-manager`.
         */
        this.textClose = TEXT.close;
        /**
         * The default group title for the `calcite-tip-manager`.
         */
        this.textDefaultTitle = TEXT.defaultGroupTitle;
        /**
         * Alternate text for navigating to the next tip.
         */
        this.textNext = TEXT.next;
        /**
         * Label that appears on hover of pagination icon.
         */
        this.textPaginationLabel = TEXT.defaultPaginationLabel;
        /**
         * Alternate text for navigating to the previous tip.
         */
        this.textPrevious = TEXT.previous;
        this.groupTitle = this.textDefaultTitle;
        this.observer = new MutationObserver(() => this.setUpTips());
        this.hideTipManager = () => {
            this.closed = true;
            this.calciteTipManagerToggle.emit();
        };
        this.previousClicked = () => {
            this.previousTip();
        };
        this.nextClicked = () => {
            this.nextTip();
        };
        this.tipManagerKeyUpHandler = (event) => {
            if (event.target !== this.container) {
                return;
            }
            switch (event.key) {
                case "ArrowRight":
                    event.preventDefault();
                    this.nextTip();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    this.previousTip();
                    break;
                case "Home":
                    event.preventDefault();
                    this.selectedIndex = 0;
                    break;
                case "End":
                    event.preventDefault();
                    this.selectedIndex = this.total - 1;
                    break;
            }
        };
        this.storeContainerRef = (el) => {
            this.container = el;
        };
    }
    closedChangeHandler() {
        this.direction = null;
        this.calciteTipManagerToggle.emit();
    }
    selectedChangeHandler() {
        this.showSelectedTip();
        this.updateGroupTitle();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.setUpTips();
    }
    componentDidLoad() {
        this.observer.observe(this.el, { childList: true, subtree: true });
    }
    componentDidUnload() {
        this.observer.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async nextTip() {
        this.direction = "advancing";
        const nextIndex = this.selectedIndex + 1;
        this.selectedIndex = (nextIndex + this.total) % this.total;
    }
    async previousTip() {
        this.direction = "retreating";
        const previousIndex = this.selectedIndex - 1;
        this.selectedIndex = (previousIndex + this.total) % this.total;
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpTips() {
        const tips = Array.from(this.el.querySelectorAll("calcite-tip"));
        this.total = tips.length;
        if (this.total === 0) {
            return;
        }
        const selectedTip = this.el.querySelector("calcite-tip[selected]");
        this.tips = tips;
        this.selectedIndex = selectedTip ? tips.indexOf(selectedTip) : 0;
        tips.forEach((tip) => {
            tip.nonDismissible = true;
        });
        this.showSelectedTip();
        this.updateGroupTitle();
    }
    showSelectedTip() {
        this.tips.forEach((tip, index) => {
            const isSelected = this.selectedIndex === index;
            tip.selected = isSelected;
            tip.hidden = !isSelected;
        });
    }
    updateGroupTitle() {
        const selectedTip = this.tips[this.selectedIndex];
        const tipParent = selectedTip.closest("calcite-tip-group");
        this.groupTitle = (tipParent && tipParent.textGroupTitle) || this.textDefaultTitle;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderPagination() {
        const dir = getElementDir(this.el);
        const { selectedIndex, tips, total } = this;
        return tips.length > 1 ? (h("footer", { class: CSS.pagination },
            h("calcite-action", { text: this.textPrevious, onClick: this.previousClicked, class: CSS.pagePrevious },
                h("calcite-icon", { scale: "s", icon: dir === "ltr" ? ICONS.chevronLeft : ICONS.chevronRight })),
            h("span", { class: CSS.pagePosition }, `${this.textPaginationLabel} ${selectedIndex + 1}/${total}`),
            h("calcite-action", { text: this.textNext, onClick: this.nextClicked, class: CSS.pageNext },
                h("calcite-icon", { scale: "s", icon: dir === "ltr" ? ICONS.chevronRight : ICONS.chevronLeft })))) : null;
    }
    render() {
        const { closed, direction, groupTitle, selectedIndex, textClose, total } = this;
        if (total === 0) {
            return h(Host, null);
        }
        return (h(Host, null,
            h("div", { class: CSS.container, hidden: closed, "aria-hidden": closed.toString(), tabIndex: 0, onKeyUp: this.tipManagerKeyUpHandler, ref: this.storeContainerRef },
                h("header", { class: CSS.header },
                    h("h2", { key: selectedIndex, class: CSS.heading }, groupTitle),
                    h("calcite-action", { text: textClose, onClick: this.hideTipManager, class: CSS.close },
                        h("calcite-icon", { scale: "s", icon: ICONS.close }))),
                h("div", { tabIndex: 0, class: classnames(CSS.tipContainer, {
                        [CSS.tipContainerAdvancing]: !closed && direction === "advancing",
                        [CSS.tipContainerRetreating]: !closed && direction === "retreating"
                    }), key: selectedIndex },
                    h("slot", null)),
                this.renderPagination())));
    }
    static get is() { return "calcite-tip-manager"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./calcite-tip-manager.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-tip-manager.css"]
    }; }
    static get properties() { return {
        "closed": {
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
                "text": "Alternate text for closing the `calcite-tip-manager`."
            },
            "attribute": "closed",
            "reflect": true,
            "defaultValue": "false"
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
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Alternate text for closing the `calcite-tip-manager`."
            },
            "attribute": "text-close",
            "reflect": false,
            "defaultValue": "TEXT.close"
        },
        "textDefaultTitle": {
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
                "text": "The default group title for the `calcite-tip-manager`."
            },
            "attribute": "text-default-title",
            "reflect": true,
            "defaultValue": "TEXT.defaultGroupTitle"
        },
        "textNext": {
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
                "text": "Alternate text for navigating to the next tip."
            },
            "attribute": "text-next",
            "reflect": false,
            "defaultValue": "TEXT.next"
        },
        "textPaginationLabel": {
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
                "text": "Label that appears on hover of pagination icon."
            },
            "attribute": "text-pagination-label",
            "reflect": true,
            "defaultValue": "TEXT.defaultPaginationLabel"
        },
        "textPrevious": {
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
                "text": "Alternate text for navigating to the previous tip."
            },
            "attribute": "text-previous",
            "reflect": false,
            "defaultValue": "TEXT.previous"
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
    static get states() { return {
        "selectedIndex": {},
        "tips": {},
        "total": {},
        "direction": {},
        "groupTitle": {}
    }; }
    static get events() { return [{
            "method": "calciteTipManagerToggle",
            "name": "calciteTipManagerToggle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the `calcite-tip-manager` has been toggled open or closed."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "nextTip": {
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
        },
        "previousTip": {
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
    static get watchers() { return [{
            "propName": "closed",
            "methodName": "closedChangeHandler"
        }, {
            "propName": "selectedIndex",
            "methodName": "selectedChangeHandler"
        }]; }
}
