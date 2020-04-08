var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Host, h } from "@stencil/core";
import CalciteScrim from "../utils/CalciteScrim";
import { CSS } from "./resources";
const renderScrim = (loading, disabled) => {
    return h(CalciteScrim, { loading: loading, disabled: disabled });
};
export const List = (_a) => {
    var { props } = _a, rest = __rest(_a, ["props"]);
    const { disabled, loading, filterEnabled, dataForFilter, handleFilter, textFilterPlaceholder } = props;
    return (h(Host, Object.assign({ role: "menu", "aria-disabled": disabled.toString(), "aria-busy": loading.toString() }, rest),
        h("header", { class: { [CSS.sticky]: true } },
            filterEnabled ? (h("calcite-filter", { data: dataForFilter, textPlaceholder: textFilterPlaceholder, "aria-label": textFilterPlaceholder, onCalciteFilterChange: handleFilter })) : null,
            h("slot", { name: "menu-actions" })),
        h("slot", null),
        renderScrim(loading, disabled)));
};
export default List;
