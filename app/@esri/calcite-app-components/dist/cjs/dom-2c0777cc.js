'use strict';

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

exports.focusElement = focusElement;
exports.getElementDir = getElementDir;
