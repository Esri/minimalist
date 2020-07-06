import { h } from "@stencil/core";
import { getElementDir } from "./dom";
const ICONS = {
    chevronsLeft: "chevrons-left",
    chevronsRight: "chevrons-right"
};
function getClosestShellPosition(el) {
    const shellNode = el.closest("calcite-shell-panel");
    if (!shellNode) {
        return;
    }
    if (shellNode.position) {
        return shellNode.position;
    }
    if (shellNode.layout) {
        return shellNode.layout === "trailing" ? "end" : "start";
    }
}
function getCalcitePosition(position, el) {
    return position || getClosestShellPosition(el) || "start";
}
export function toggleChildActionText({ parent, expanded }) {
    parent.querySelectorAll("calcite-action").forEach((action) => (action.textEnabled = expanded));
}
const setTooltipReference = (tooltip, referenceElement, expanded) => {
    if (tooltip) {
        tooltip.referenceElement = !expanded && referenceElement;
    }
    return referenceElement;
};
export const CalciteExpandToggle = ({ expanded, intlExpand, intlCollapse, toggleExpand, el, position, tooltipExpand }) => {
    const rtl = getElementDir(el) === "rtl";
    const expandText = expanded ? intlCollapse : intlExpand;
    const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
    if (rtl) {
        icons.reverse();
    }
    const end = getCalcitePosition(position, el) === "end";
    const expandIcon = end ? icons[1] : icons[0];
    const collapseIcon = end ? icons[0] : icons[1];
    const actionNode = (h("calcite-action", { ref: (referenceElement) => setTooltipReference(tooltipExpand, referenceElement, expanded), onClick: toggleExpand, textEnabled: expanded, text: expandText, icon: expanded ? expandIcon : collapseIcon }));
    return tooltipExpand ? (h("calcite-tooltip-manager", null, actionNode)) : (actionNode);
};
