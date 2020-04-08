export function getElementDir(el) {
    return getElementProp(el, "dir", "ltr");
}
export function getElementProp(el, prop, value) {
    const closestWithProp = el.closest(`[${prop}]`);
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
export function focusElement(el) {
    if (!el) {
        return;
    }
    "setFocus" in el && typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}
export function getCalcitePosition(position, layout) {
    if (position) {
        return position;
    }
    if (layout) {
        return layout === "trailing" ? "end" : "start";
    }
    return "start";
}
export function getSlotted(element, slotName) {
    const slottedSelector = `[slot="${slotName}"]`;
    return Array.from(element.querySelectorAll(slottedSelector));
}
