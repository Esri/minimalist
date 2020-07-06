import { h } from "@stencil/core";
const scrimDivStyle = {
    alignItems: "center",
    animation: "calcite-app-fade-in var(--calcite-app-animation-time) var(--calcite-app-easing-function)",
    backgroundColor: "var(--calcite-app-scrim)",
    bottom: "0",
    display: "flex",
    justifyContent: "center",
    left: "0",
    position: "absolute",
    right: "0",
    top: "0",
    userSelect: "none",
    zIndex: "2"
};
const containerDivStyle = {
    position: "relative",
    zIndex: "1"
};
export const CalciteScrim = ({ loading, disabled }, children) => {
    const renderScrim = disabled || loading;
    const hasChildren = children === null || children === void 0 ? void 0 : children.length;
    const loaderNode = loading ? h("calcite-loader", { "is-active": true }) : null;
    const scrimContainerNode = h("div", { style: scrimDivStyle }, loaderNode);
    const childContainerNode = hasChildren ? h("div", { style: containerDivStyle }, children) : null;
    return renderScrim ? [scrimContainerNode, childContainerNode] : children;
};
export default CalciteScrim;
