import { Host, h } from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import classnames from "classnames";
import { getCalcitePosition } from "../utils/dom";
/**
 * @slot shell-header - A slot for adding header content. This content will be positioned at the top of the shell.
 * @slot shell-footer - A slot for adding footer content. This content will be positioned at the bottom of the shell.
 * @slot primary-panel - A slot for adding the leading `calcite-shell-panel`.
 * @slot contextual-panel - A slot for adding the trailing `calcite-shell-panel`.
 * @slot tip-manager - A slot for adding a `calcite-tip-manager`. This component will be absolutely positioned.
 * @slot - A slot for adding content to the shell. This content will appear between any leading and trailing panels added to the shell. (eg. a map)
 */
export class CalciteShell {
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        const hasHeader = !!this.el.querySelector(`[slot=${SLOTS.header}]`);
        return hasHeader ? h("slot", { name: SLOTS.header }) : null;
    }
    renderContent() {
        return (h("div", { class: CSS.content },
            h("slot", null)));
    }
    renderFooter() {
        const hasFooter = !!this.el.querySelector(`[slot=${SLOTS.footer}]`);
        return hasFooter ? (h("div", { class: CSS.footer },
            h("slot", { name: SLOTS.footer }))) : null;
    }
    renderMain() {
        var _a, _b;
        const primaryPanel = this.el.querySelector(`[slot=${SLOTS.primaryPanel}]`);
        const mainClasses = {
            [CSS.mainReversed]: getCalcitePosition((_a = primaryPanel) === null || _a === void 0 ? void 0 : _a.position, (_b = primaryPanel) === null || _b === void 0 ? void 0 : _b.layout) === "end"
        };
        return (h("div", { class: classnames(CSS.main, mainClasses) },
            h("slot", { name: SLOTS.primaryPanel }),
            this.renderContent(),
            h("slot", { name: SLOTS.contextualPanel }),
            h("slot", { name: SLOTS.tipManager })));
    }
    render() {
        return (h(Host, null,
            this.renderHeader(),
            this.renderMain(),
            this.renderFooter()));
    }
    static get is() { return "calcite-shell"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-shell.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-shell.css"]
    }; }
    static get properties() { return {
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
    static get elementRef() { return "el"; }
}
