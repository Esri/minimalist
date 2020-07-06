'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-bed90626.js');
const dom = require('./dom-ead89a9a.js');
const index$1 = require('./index-f07acd1d.js');
const resources = require('./resources-c6a212f8.js');

const CSS = {
    heading: "heading",
    container: "container",
    indented: "container--indented"
};
const SLOTS = {
    parentItem: "parent-item"
};

const calcitePickListGroupCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{background-color:var(--calcite-app-background-clear);display:block;margin-bottom:var(--calcite-app-cap-spacing-quarter)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}:host(:last-child){margin-bottom:0}h3.heading{font-size:var(--calcite-app-font-size-0);margin:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing)}.container--indented{margin-left:var(--calcite-app-side-spacing-plus-half)}.calcite--rtl.container--indented{margin-left:0;margin-right:var(--calcite-app-side-spacing-plus-half)}";

const CalcitePickListGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { el, textGroupTitle } = this;
        const rtl = dom.getElementDir(el) === "rtl";
        const hasParentItem = dom.getSlotted(el, SLOTS.parentItem) !== null;
        const sectionClasses = {
            [CSS.indented]: hasParentItem,
            [resources.CSS_UTILITY.rtl]: rtl
        };
        return (index.h(index.Host, null, textGroupTitle ? index.h("h3", { class: CSS.heading }, textGroupTitle) : null, index.h("slot", { name: SLOTS.parentItem }), index.h("section", { class: index$1.classnames(CSS.container, sectionClasses) }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
CalcitePickListGroup.style = calcitePickListGroupCss;

exports.calcite_pick_list_group = CalcitePickListGroup;
