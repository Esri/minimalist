function getElementDir(el) {
    return getElementProp(el, "dir", "ltr");
}
function getElementProp(el, prop, value) {
    const closestWithProp = el.closest(`[${prop}]`);
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
function focusElement(el) {
    if (!el) {
        return;
    }
    "setFocus" in el && typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}
function getCalcitePosition(position, layout) {
    if (position) {
        return position;
    }
    if (layout) {
        return layout === "trailing" ? "end" : "start";
    }
}
function getSlotted(element, slotName, options) {
    const slottedSelector = `[slot="${slotName}"]`;
    const selector = (options === null || options === void 0 ? void 0 : options.selector) ? `${slottedSelector} ${options.selector}` : slottedSelector;
    if (options === null || options === void 0 ? void 0 : options.all) {
        return Array.from(element.querySelectorAll(selector));
    }
    return element.querySelector(selector);
}

export { getElementDir as a, getCalcitePosition as b, focusElement as f, getSlotted as g };
