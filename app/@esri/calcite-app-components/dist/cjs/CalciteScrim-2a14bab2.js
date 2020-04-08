'use strict';

const index = require('./index-fd9e9986.js');

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
const CalciteScrim = ({ loading, disabled }, children) => {
    var _a;
    const renderScrim = disabled || loading;
    const hasChildren = (_a = children) === null || _a === void 0 ? void 0 : _a.length;
    const loaderNode = loading ? index.h("calcite-loader", { "is-active": true }) : null;
    const scrimContainerNode = index.h("div", { style: scrimDivStyle }, loaderNode);
    const childContainerNode = hasChildren ? index.h("div", { style: containerDivStyle }, children) : null;
    return renderScrim ? [scrimContainerNode, childContainerNode] : children;
};

exports.CalciteScrim = CalciteScrim;
