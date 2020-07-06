import { r as registerInstance, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { a as getElementDir, g as getSlotted } from './dom-7d75fa2b.js';
import { c as classnames } from './index-bd855e89.js';
import { C as CSS_UTILITY } from './resources-34eb8923.js';
var CSS = {
    heading: "heading",
    container: "container",
    indented: "container--indented"
};
var SLOTS = {
    parentItem: "parent-item"
};
var calcitePickListGroupCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{background-color:var(--calcite-app-background-clear);display:block;margin-bottom:var(--calcite-app-cap-spacing-quarter)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}:host(:last-child){margin-bottom:0}h3.heading{font-size:var(--calcite-app-font-size-0);margin:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing)}.container--indented{margin-left:var(--calcite-app-side-spacing-plus-half)}.calcite--rtl.container--indented{margin-left:0;margin-right:var(--calcite-app-side-spacing-plus-half)}";
var CalcitePickListGroup = /** @class */ (function () {
    function CalcitePickListGroup(hostRef) {
        registerInstance(this, hostRef);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalcitePickListGroup.prototype.render = function () {
        var _a;
        var _b = this, el = _b.el, textGroupTitle = _b.textGroupTitle;
        var rtl = getElementDir(el) === "rtl";
        var hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
        var sectionClasses = (_a = {},
            _a[CSS.indented] = hasParentItem,
            _a[CSS_UTILITY.rtl] = rtl,
            _a);
        return (h(Host, null, textGroupTitle ? h("h3", { class: CSS.heading }, textGroupTitle) : null, h("slot", { name: SLOTS.parentItem }), h("section", { class: classnames(CSS.container, sectionClasses) }, h("slot", null))));
    };
    Object.defineProperty(CalcitePickListGroup.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalcitePickListGroup;
}());
CalcitePickListGroup.style = calcitePickListGroupCss;
export { CalcitePickListGroup as calcite_pick_list_group };
