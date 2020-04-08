'use strict';

const CSS = {
    sticky: "sticky"
};
(function (ICON_TYPES) {
    ICON_TYPES["circle"] = "circle";
    ICON_TYPES["square"] = "square";
    ICON_TYPES["grip"] = "grip";
})(exports.ICON_TYPES || (exports.ICON_TYPES = {}));
const TEXT = {
    filterPlaceholder: "Filter results"
};

exports.CSS = CSS;
exports.TEXT = TEXT;
