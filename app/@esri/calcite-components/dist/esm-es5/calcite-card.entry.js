import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d518aa55.js';
import { g as getElementDir } from './dom-d0864422.js';
import { g as getKey } from './key-3b974aad.js';
var CSS = {
    container: "container",
    header: "header",
    footer: "footer",
    title: "title",
    subtitle: "subtitle",
    thumbnailWrapper: "thumbnail-wrapper",
    checkboxWrapper: "checkbox-wrapper"
};
var calciteCardCss = ":host([hidden]){display:none}:host{max-width:100%}:host .calcite-card-container{display:-ms-flexbox;display:flex;height:100%;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;background-color:var(--calcite-ui-foreground-1);-webkit-transition:150ms ease-in-out;transition:150ms ease-in-out;position:relative;border:1px solid var(--calcite-ui-border-2);color:var(--calcite-ui-text-3);-webkit-box-shadow:0 0 0 rgba(0, 0, 0, 0);box-shadow:0 0 0 rgba(0, 0, 0, 0)}:host .calcite-card-container:hover{-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.08);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.08);z-index:1}:host .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);z-index:1}:host([loading]) .calcite-card-container *:not(calcite-loader):not(.calcite-card-loader-container){opacity:0;pointer-events:none}:host([loading]) .calcite-card-loader-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;left:0;right:0;top:0;bottom:0}:host .header,:host .footer{padding:0.75rem;display:-ms-flexbox;display:flex}:host .header{-ms-flex-direction:column;flex-direction:column}:host .footer{padding:0.75rem;-ms-flex-direction:row;flex-direction:row;-ms-flex-line-pack:justify;align-content:space-between;-ms-flex-pack:justify;justify-content:space-between}:host .card-content{padding:0 0.75rem;color:var(--calcite-ui-text-3);font-size:0.875rem;line-height:1.5}:host([selectable]) .calcite-card-container:active{-webkit-box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}:host([selected]) .calcite-card-container{border-color:var(--calcite-ui-blue-1)}slot[name=title]::slotted(*),*::slotted([slot=title]){font-weight:500;color:var(--calcite-ui-text-1);margin:0;font-size:0.9375rem;line-height:1.5}slot[name=subtitle]::slotted(*),*::slotted([slot=subtitle]){font-weight:400;color:var(--calcite-ui-text-2);margin:0;margin-top:0.375rem;font-size:0.875rem;line-height:1.5}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){max-width:100%;min-width:100%}slot[name=footer-leading]::slotted(*),*::slotted([slot=footer-leading]){-webkit-margin-end:auto;margin-inline-end:auto;-ms-flex-item-align:center;align-self:center;font-size:0.875rem;line-height:1.5}slot[name=footer-trailing]::slotted(*),*::slotted([slot=footer-trailing]){-ms-flex-item-align:center;align-self:center;font-size:0.875rem;line-height:1.5}:host .thumbnail-wrapper{font-size:0}:host .checkbox-wrapper{position:absolute;top:0.375rem;right:0.375rem;margin:0;padding:0}:host([dir=rtl]) .checkbox-wrapper{left:0.375rem;right:auto}";
var CalciteCard = /** @class */ (function () {
    function CalciteCard(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /**  When true, the cards content is waiting to be loaded. This state shows a busy indicator.*/
        this.loading = false;
        /** Indicates whether the card is selected. */
        this.selected = false;
        /** Indicates whether the card is selectable. */
        this.selectable = false;
        this.calciteCardSelected = createEvent(this, "calciteCardSelected", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    CalciteCard.prototype.render = function () {
        var _a;
        var dir = getElementDir(this.el);
        return (h(Host, { dir: dir }, h("div", { class: "calcite-card-container" }, this.loading ? (h("div", { class: "calcite-card-loader-container" }, h("calcite-loader", { "is-active": true }))) : null, h("section", { class: (_a = {}, _a[CSS.container] = true, _a), "aria-busy": this.loading }, this.selectable ? this.renderCheckbox() : null, this.renderThumbnail(), this.renderHeader(), h("div", { class: "card-content" }, h("slot", null)), this.renderFooter()))));
    };
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    CalciteCard.prototype.cardSelectClick = function () {
        this.selectCard();
    };
    CalciteCard.prototype.cardSelectKeyDown = function (e) {
        switch (getKey(e.key)) {
            case " ":
            case "Enter":
                this.selectCard();
                e.preventDefault();
                break;
        }
    };
    CalciteCard.prototype.selectCard = function () {
        this.selected = !this.selected;
        this.calciteCardSelected.emit({
            element: this.el,
            selected: this.selected,
        });
    };
    CalciteCard.prototype.renderThumbnail = function () {
        var hasThumbnail = this.el.querySelector("[slot=" + "thumbnail" /* thumbnail */ + "]");
        return hasThumbnail ? (h("div", { class: CSS.thumbnailWrapper }, h("slot", { name: "thumbnail" /* thumbnail */ }))) : null;
    };
    CalciteCard.prototype.renderCheckbox = function () {
        var _this = this;
        return (h("div", { class: CSS.checkboxWrapper, onClick: function () { return _this.cardSelectClick(); }, onKeyDown: function (e) { return _this.cardSelectKeyDown(e); } }, h("calcite-checkbox", { checked: this.selected })));
    };
    CalciteCard.prototype.renderHeader = function () {
        var title = this.el.querySelector("[slot=" + "title" /* title */ + "]");
        var subtitle = this.el.querySelector("[slot=" + "subtitle" /* subtitle */ + "]");
        var hasHeader = title || subtitle;
        return hasHeader ? (h("header", { class: CSS.header }, h("slot", { name: "title" /* title */ }), h("slot", { name: "subtitle" /* subtitle */ }))) : null;
    };
    CalciteCard.prototype.renderFooter = function () {
        var leadingFooter = this.el.querySelector("[slot=" + "footer-leading" /* footerLeading */ + "]");
        var trailingFooter = this.el.querySelector("[slot=" + "footer-trailing" /* footerTrailing */ + "]");
        var hasFooter = leadingFooter || trailingFooter;
        return hasFooter ? (h("footer", { class: CSS.footer }, h("slot", { name: "footer-leading" /* footerLeading */ }), h("slot", { name: "footer-trailing" /* footerTrailing */ }))) : null;
    };
    Object.defineProperty(CalciteCard.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteCard;
}());
CalciteCard.style = calciteCardCss;
export { CalciteCard as calcite_card };
