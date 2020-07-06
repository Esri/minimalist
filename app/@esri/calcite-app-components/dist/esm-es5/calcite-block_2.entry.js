import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { C as CalciteScrim } from './CalciteScrim-72de5de3.js';
import { g as getSlotted, a as getElementDir } from './dom-7d75fa2b.js';
import { g as guid } from './guid-80e40540.js';
import { c as classnames } from './index-bd855e89.js';
var CSS = {
    content: "content",
    headerContainer: "header-container",
    icon: "icon",
    toggle: "toggle",
    toggleIcon: "toggle-icon",
    title: "title",
    heading: "heading",
    header: "header",
    button: "button",
    summary: "summary",
    control: "control"
};
var TEXT = {
    collapse: "Collapse",
    expand: "Expand"
};
var calciteBlockCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-direction:column;flex-direction:column;border-radius:var(--calcite-app-border-radius);margin:var(--calcite-app-cap-spacing-quarter) var(--calcite-app-side-spacing-quarter) 0;-webkit-box-shadow:0 -1px 0 var(--calcite-app-border) inset;box-shadow:0 -1px 0 var(--calcite-app-border) inset}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}.header{-ms-flex-positive:1;flex-grow:1;-ms-flex-pack:start;justify-content:flex-start}.header-container{display:grid;grid-template:auto/auto auto 1fr;grid-template-areas:\"handle header control\";-ms-flex-align:center;align-items:center}.header-container>.header{padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-three-quarters)}:host([disabled]){pointer-events:none;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none}:host([disabled]) .header-container{opacity:var(--calcite-app-disabled-opacity)}calcite-loader[inline]{color:var(--calcite-app-foreground-subtle)}calcite-handle{grid-area:handle}.title{margin:0}.header .title .heading{padding:0 0 var(--calcite-app-cap-spacing-quarter)}.summary{font-size:var(--calcite-app-font-size--1);padding:0 0 var(--calcite-app-cap-spacing-quarter)}.toggle{grid-column:header-start/control-end;grid-row:1/2;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-positive:1;flex-grow:1;margin:0;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-three-quarters);background-color:transparent;border:none;cursor:pointer;font-family:var(--calcite-app-font-family);text-align:unset;color:var(--calcite-app-foreground)}.toggle:focus{outline-offset:var(--calcite-app-outline-inset)}.icon{margin-right:var(--calcite-app-side-spacing-third)}.toggle-icon{fill:currentColor;-ms-flex:0 0 var(--calcite-app-icon-size);flex:0 0 var(--calcite-app-icon-size);margin:0 var(--calcite-app-side-spacing-half)}.content{padding:0 var(--calcite-app-side-spacing-three-quarters) var(--calcite-app-cap-spacing-half);position:relative}::slotted([slot=control]){grid-area:control;justify-self:end;margin:auto var(--calcite-app-side-spacing-three-quarters) auto auto}.calcite--rtl ::slotted([slot=control]){left:var(--calcite-app-side-spacing-three-quarters);right:unset}";
var CalciteBlock = /** @class */ (function () {
    function CalciteBlock(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * When true, this block will be collapsible.
         */
        this.collapsible = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, displays a drag handle in the header.
         */
        this.dragHandle = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * When true, the block's content will be displayed.
         */
        this.open = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.onHeaderClick = function () {
            _this.open = !_this.open;
            _this.calciteBlockToggle.emit();
        };
        this.calciteBlockToggle = createEvent(this, "calciteBlockToggle", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteBlock.prototype.render = function () {
        var _a = this, collapsible = _a.collapsible, disabled = _a.disabled, el = _a.el, heading = _a.heading, intlCollapse = _a.intlCollapse, intlExpand = _a.intlExpand, loading = _a.loading, open = _a.open, summary = _a.summary, textCollapse = _a.textCollapse, textExpand = _a.textExpand;
        var toggleLabel = open
            ? intlCollapse || textCollapse || TEXT.collapse
            : intlExpand || textExpand || TEXT.expand;
        var hasIcon = getSlotted(el, "icon" /* icon */);
        var headerContent = (h("header", { class: CSS.header }, hasIcon ? (h("div", { class: CSS.icon }, h("slot", { name: "icon" /* icon */ }))) : null, h("div", { class: CSS.title }, h("h3", { class: CSS.heading }, heading), summary ? h("div", { class: CSS.summary }, summary) : null)));
        var headerNode = (h("div", { class: CSS.headerContainer }, this.dragHandle ? h("calcite-handle", null) : null, collapsible ? (h("button", { "aria-label": toggleLabel, class: CSS.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent)) : (headerContent), loading ? (h("calcite-loader", { inline: true, "is-active": true })) : (h("slot", { name: "control" /* control */ }))));
        return (h(Host, { tabIndex: disabled ? -1 : null }, h("article", { "aria-expanded": collapsible ? open.toString() : null, "aria-busy": loading }, headerNode, h("div", { class: CSS.content, hidden: !open }, h(CalciteScrim, { loading: loading, disabled: disabled }, h("slot", null))))));
    };
    Object.defineProperty(CalciteBlock.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteBlock;
}());
CalciteBlock.style = calciteBlockCss;
var CSS$1 = {
    content: "content",
    toggle: "toggle",
    toggleSwitch: "toggle--switch"
};
var TEXT$1 = {
    collapse: "Collapse",
    expand: "Expand"
};
var ICONS = {
    menuOpen: "caret-down",
    menuClosedLeft: "caret-left",
    menuClosedRight: "caret-right"
};
var calciteBlockSectionCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{border-bottom:1px solid var(--calcite-app-border);display:block}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host(:last-child){border-bottom:none}.toggle--switch{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;margin:var(--calcite-app-cap-spacing-quarter) 0;padding:var(--calcite-app-cap-spacing-half) 0;-webkit-user-select:none;-ms-user-select:none;-moz-user-select:none;user-select:none}.toggle--switch calcite-switch{pointer-events:none;margin:var(--calcite-app-cap-spacing-third) 0 0 var(--calcite-app-side-spacing-half)}.calcite--rtl .toggle--switch calcite-switch{margin-left:0;margin-right:var(--calcite-app-side-spacing-half)}";
var CalciteBlockSection = /** @class */ (function () {
    function CalciteBlockSection(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /**
         * When true, the block's section content will be displayed.
         */
        this.open = false;
        /**
         * This property determines the look of the section toggle.
         * If the value is "switch", a toggle-switch will be displayed.
         * If the value is "button", a clickable header is displayed.
         *
         * @todo revisit doc
         */
        this.toggleDisplay = "button";
        this.guid = "calcite-block-section-" + guid();
        this.toggleSection = function () {
            _this.open = !_this.open;
            _this.calciteBlockSectionToggle.emit();
        };
        this.calciteBlockSectionToggle = createEvent(this, "calciteBlockSectionToggle", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    CalciteBlockSection.prototype.handleHeaderLabelKeyDown = function (event) {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            this.click();
        }
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteBlockSection.prototype.render = function () {
        var _a = this, el = _a.el, id = _a.guid, intlCollapse = _a.intlCollapse, intlExpand = _a.intlExpand, open = _a.open, text = _a.text, textCollapse = _a.textCollapse, textExpand = _a.textExpand, toggleDisplay = _a.toggleDisplay;
        var dir = getElementDir(el);
        var arrowIcon = open
            ? ICONS.menuOpen
            : dir === "rtl"
                ? ICONS.menuClosedLeft
                : ICONS.menuClosedRight;
        var toggleLabel = open
            ? intlCollapse || textCollapse || TEXT$1.collapse
            : intlExpand || textExpand || TEXT$1.expand;
        var labelId = id + "__label";
        var headerNode = toggleDisplay === "switch" ? (h("label", { "aria-label": toggleLabel, class: classnames(CSS$1.toggle, CSS$1.toggleSwitch), id: labelId, onKeyDown: this.handleHeaderLabelKeyDown, tabIndex: 0 }, text, h("calcite-switch", { "aria-labelledby": labelId, switched: open, onChange: this.toggleSection, scale: "s", tabIndex: -1 }))) : (h("calcite-action", { "aria-label": toggleLabel, class: CSS$1.toggle, onClick: this.toggleSection, text: text, textEnabled: true, compact: true, icon: arrowIcon }));
        return (h("section", { "aria-expanded": open.toString() }, headerNode, h("div", { class: CSS$1.content, hidden: !open }, h("slot", null))));
    };
    Object.defineProperty(CalciteBlockSection.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteBlockSection;
}());
CalciteBlockSection.style = calciteBlockSectionCss;
export { CalciteBlock as calcite_block, CalciteBlockSection as calcite_block_section };
