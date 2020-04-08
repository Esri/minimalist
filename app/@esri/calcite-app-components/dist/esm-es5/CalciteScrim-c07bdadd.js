import { h } from './index-9fa39e2c.js';
var scrimDivStyle = {
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
var containerDivStyle = {
    position: "relative",
    zIndex: "1"
};
var CalciteScrim = function (_b, children) {
    var loading = _b.loading, disabled = _b.disabled;
    var _a;
    var renderScrim = disabled || loading;
    var hasChildren = (_a = children) === null || _a === void 0 ? void 0 : _a.length;
    var loaderNode = loading ? h("calcite-loader", { "is-active": true }) : null;
    var scrimContainerNode = h("div", { style: scrimDivStyle }, loaderNode);
    var childContainerNode = hasChildren ? h("div", { style: containerDivStyle }, children) : null;
    return renderScrim ? [scrimContainerNode, childContainerNode] : children;
};
export { CalciteScrim as C };
