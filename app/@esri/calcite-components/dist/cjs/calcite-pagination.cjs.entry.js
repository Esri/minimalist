'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-8fc102d1.js');

const CSS = {
    page: "page",
    selected: "is-selected",
    previous: "previous",
    next: "next",
    disabled: "is-disabled",
    ellipsis: "ellipsis",
    ellipsisStart: "ellipsis--start",
    ellipsisEnd: "ellipsis--end"
};
const TEXT = {
    nextLabel: "next",
    previousLabel: "previous"
};

const calcitePaginationCss = ":host([hidden]){display:none}:host([scale=s]){--calcite-pagination-spacing:4px 8px}:host([scale=s]) .previous,:host([scale=s]) .next,:host([scale=s]) .page{font-size:12px}:host([scale=m]){--calcite-pagination-spacing:8px 12px}:host([scale=m]) .previous,:host([scale=m]) .next,:host([scale=m]) .page{font-size:16px}:host([scale=l]){--calcite-pagination-spacing:12px 16px}:host([scale=l]) .previous,:host([scale=l]) .next,:host([scale=l]) .page{font-size:20px}:host{display:-ms-inline-flexbox;display:inline-flex;background-color:transparent;-webkit-writing-mode:horizontal-tb;-ms-writing-mode:lr-tb;writing-mode:horizontal-tb}:host button{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus{outline:2px solid var(--calcite-ui-blue-1);outline-offset:-2px}.previous,.next,.page{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background-color:transparent;border:none;border-top:3px solid transparent;border-bottom:3px solid transparent;font-family:inherit;font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-3);cursor:pointer}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}.page:hover{border-bottom-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:500;color:var(--calcite-ui-text-1);border-bottom-color:var(--calcite-ui-blue-1)}.previous,.next{padding:var(--calcite-pagination-spacing)}.previous:hover,.next:hover{color:var(--calcite-ui-blue-1);background-color:var(--calcite-ui-foreground-2)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{background-color:transparent;pointer-events:none}.previous.is-disabled>calcite-icon,.next.is-disabled>calcite-icon{opacity:0.4}.next{margin-right:0}.page,.ellipsis{padding:var(--calcite-pagination-spacing)}.ellipsis{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;color:var(--calcite-ui-text-3)}";

const maxPagesDisplayed = 5;
const CalcitePagination = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Public Properties
        //
        //--------------------------------------------------------------------------
        /** number of items per page */
        this.num = 20;
        /** index of item that should begin the page */
        this.start = 1;
        /** total number of items */
        this.total = 0;
        /** title of the next button */
        this.textLabelNext = TEXT.nextLabel;
        /** title of the previous button */
        this.textLabelPrevious = TEXT.previousLabel;
        /** The scale of the pagination */
        this.scale = "m";
        this.previousClicked = () => {
            this.previousPage().then();
            this.emitUpdate();
        };
        this.nextClicked = () => {
            this.nextPage();
            this.emitUpdate();
        };
        this.calcitePaginationUpdate = index.createEvent(this, "calcitePaginationUpdate", 7);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Go to the next page of results */
    async nextPage() {
        this.start = Math.min(this.getLastStart(), this.start + this.num);
    }
    /** Go to the previous page of results */
    async previousPage() {
        this.start = Math.max(1, this.start - this.num);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    getLastStart() {
        const { total, num } = this;
        const lastStart = total % num === 0 ? total - num : Math.floor(total / num) * num;
        return lastStart + 1;
    }
    showLeftEllipsis() {
        return Math.floor(this.start / this.num) > 3;
    }
    showRightEllipsis() {
        return (this.total - this.start) / this.num > 3;
    }
    emitUpdate() {
        this.calcitePaginationUpdate.emit({
            start: this.start,
            total: this.total,
            num: this.num,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderPages() {
        let lastStart = this.getLastStart();
        let end;
        let nextStart;
        // if we don't need ellipses render the whole set
        if (this.total / this.num <= maxPagesDisplayed) {
            nextStart = 1 + this.num;
            end = lastStart - this.num;
        }
        else {
            // if we're within max pages of page 1
            if (this.start / this.num < maxPagesDisplayed - 1) {
                nextStart = 1 + this.num;
                end = 1 + 4 * this.num;
            }
            else {
                // if we're within max pages of last page
                if (this.start + 3 * this.num >= this.total) {
                    nextStart = lastStart - 4 * this.num;
                    end = lastStart - this.num;
                }
                else {
                    nextStart = this.start - this.num;
                    end = this.start + this.num;
                }
            }
        }
        const pages = [];
        while (nextStart <= end) {
            pages.push(nextStart);
            nextStart = nextStart + this.num;
        }
        return pages.map((page) => this.renderPage(page));
    }
    renderPage(start) {
        const page = Math.floor(start / this.num) + 1;
        return (index.h("button", { class: {
                [CSS.page]: true,
                [CSS.selected]: start === this.start,
            }, onClick: () => {
                this.start = start;
                this.emitUpdate();
            } }, page));
    }
    renderLeftEllipsis(iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
            return (index.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` }, index.h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    renderRightEllipsis(iconScale) {
        if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
            return (index.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` }, index.h("calcite-icon", { scale: iconScale, icon: "ellipsis" })));
        }
    }
    render() {
        const { total, num, start } = this;
        const iconScale = this.scale === "l" ? "m" : "s";
        return (index.h(index.Host, null, index.h("button", { class: {
                [CSS.previous]: true,
                [CSS.disabled]: start < num,
            }, "aria-label": this.textLabelPrevious, onClick: this.previousClicked, disabled: start < num }, index.h("calcite-icon", { scale: iconScale, icon: "chevronLeft" })), this.renderPage(1), this.renderLeftEllipsis(iconScale), this.renderPages(), this.renderRightEllipsis(iconScale), this.renderPage(this.getLastStart()), index.h("button", { class: {
                [CSS.next]: true,
                [CSS.disabled]: start + num >= total,
            }, "aria-label": this.textLabelNext, onClick: this.nextClicked, disabled: start + num >= total }, index.h("calcite-icon", { scale: iconScale, icon: "chevronRight" }))));
    }
    get el() { return index.getElement(this); }
};
CalcitePagination.style = calcitePaginationCss;

exports.calcite_pagination = CalcitePagination;
