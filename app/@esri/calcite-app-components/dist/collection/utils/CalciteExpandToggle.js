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
    return shellNode.position;
}
function getCalcitePosition(position, el) {
    return position || getClosestShellPosition(el) || "start";
}
export function toggleChildActionText({ parent, expanded }) {
    parent.querySelectorAll("calcite-action").forEach((action) => (action.textEnabled = expanded));
}
export const CalciteExpandToggle = ({ expanded, textExpand, textCollapse, toggleExpand, el, position }) => {
    const rtl = getElementDir(el) === "rtl";
    const expandText = expanded ? textCollapse : textExpand;
    const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
    if (rtl) {
        icons.reverse();
    }
    const end = getCalcitePosition(position, el) === "end";
    const expandIcon = end ? icons[1] : icons[0];
    const collapseIcon = end ? icons[0] : icons[1];
    return (h("calcite-action", { onClick: toggleExpand, textEnabled: expanded, text: expandText },
        h("calcite-icon", { scale: "s", icon: expanded ? expandIcon : collapseIcon })));
};
