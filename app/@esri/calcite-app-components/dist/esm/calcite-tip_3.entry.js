import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-1a2740c5.js';
import { g as getElementDir, c as classnames } from './index-4570617c.js';

const CSS = {
    container: "container",
    header: "header",
    heading: "heading",
    close: "close",
    imageFrame: "image-frame",
    content: "content",
    info: "info"
};
const TEXT = {
    close: "Close"
};
const ICONS = {
    close: "x"
};
const SLOTS = {
    thumbnail: "thumbnail"
};

const CalciteTip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * No longer displays the tip.
         */
        this.dismissed = false;
        /**
         * Indicates whether the tip can be dismissed.
         */
        this.nonDismissible = false;
        /**
         * Alternate text for closing the tip.
         */
        this.textClose = TEXT.close;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.hideTip = () => {
            this.dismissed = true;
            this.calciteTipDismiss.emit();
        };
        this.calciteTipDismiss = createEvent(this, "calciteTipDismiss", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        const { nonDismissible, hideTip, textClose, heading } = this;
        const dismissButtonNode = !nonDismissible ? (h("calcite-action", { text: textClose, onClick: hideTip, class: CSS.close }, h("calcite-icon", { scale: "s", icon: ICONS.close }))) : null;
        const headingNode = heading ? h("h3", { class: CSS.heading }, heading) : null;
        return dismissButtonNode || headingNode ? (h("header", { class: CSS.header }, headingNode, dismissButtonNode)) : null;
    }
    renderImageFrame() {
        const { el } = this;
        return el.querySelector(`[slot=${SLOTS.thumbnail}]`) ? (h("div", { class: CSS.imageFrame }, h("slot", { name: SLOTS.thumbnail }))) : null;
    }
    renderInfoNode() {
        return (h("div", { class: CSS.info }, h("slot", null)));
    }
    renderContent() {
        return (h("div", { class: CSS.content }, this.renderImageFrame(), this.renderInfoNode()));
    }
    render() {
        return (h(Host, null, h("article", { class: CSS.container, hidden: this.dismissed }, this.renderHeader(), this.renderContent())));
    }
    get el() { return getElement(this); }
    static get style() { return ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:relative;display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;background-color:var(--calcite-app-background-clear)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}.container{background-color:var(--calcite-app-background);padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing) var(--calcite-app-cap-spacing);margin:var(--calcite-app-cap-spacing) var(--calcite-app-side-spacing);-webkit-box-shadow:var(--calcite-app-shadow-2);box-shadow:var(--calcite-app-shadow-2);border-radius:var(--calcite-app-border-radius)}:host([selected]) .container{-webkit-box-shadow:none;box-shadow:none;margin:0;padding:0}.header{-ms-flex-pack:end;justify-content:flex-end}.header .heading{padding-left:0;padding-right:0}.container[hidden]{display:none}.content{display:-ms-flexbox;display:flex;padding-top:var(--calcite-app-cap-spacing-half)}.info{padding:0 var(--calcite-app-side-spacing);width:70%}.info:only-child{width:100%;padding-left:0;padding-right:0}::slotted(p){margin-top:0}::slotted(a){color:var(--calcite-app-foreground-link)}.image-frame{width:25%}.image-frame img{max-width:100%}::slotted(img){max-width:100%}"; }
};

const TEXT$1 = {
    defaultGroupTitle: "Tips",
    defaultPaginationLabel: "Tip",
    close: "Close",
    previous: "Previous",
    next: "Next"
};
const CSS$1 = {
    header: "header",
    heading: "heading",
    close: "close",
    container: "container",
    tipContainer: "tip-container",
    tipContainerAdvancing: "tip-container--advancing",
    tipContainerRetreating: "tip-container--retreating",
    pagination: "pagination",
    pagePosition: "page-position",
    pageNext: "page-next",
    pagePrevious: "page-previous"
};
const ICONS$1 = {
    chevronLeft: "chevron-left",
    chevronRight: "chevron-right",
    close: "x"
};

const CalciteTipGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * The title used for all nested tips.
         */
        this.textGroupTitle = TEXT$1.defaultGroupTitle;
    }
    render() {
        return h("slot", null);
    }
    static get style() { return ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}::slotted(calcite-tip){max-width:540px;padding:0 var(--calcite-app-side-spacing-half)}"; }
};

const CalciteTipManager = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Alternate text for closing the `calcite-tip-manager`.
         */
        this.closed = false;
        /**
         * Alternate text for closing the `calcite-tip-manager`.
         */
        this.textClose = TEXT$1.close;
        /**
         * The default group title for the `calcite-tip-manager`.
         */
        this.textDefaultTitle = TEXT$1.defaultGroupTitle;
        /**
         * Alternate text for navigating to the next tip.
         */
        this.textNext = TEXT$1.next;
        /**
         * Label that appears on hover of pagination icon.
         */
        this.textPaginationLabel = TEXT$1.defaultPaginationLabel;
        /**
         * Alternate text for navigating to the previous tip.
         */
        this.textPrevious = TEXT$1.previous;
        this.groupTitle = this.textDefaultTitle;
        this.observer = new MutationObserver(() => this.setUpTips());
        this.hideTipManager = () => {
            this.closed = true;
            this.calciteTipManagerToggle.emit();
        };
        this.previousClicked = () => {
            this.previousTip();
        };
        this.nextClicked = () => {
            this.nextTip();
        };
        this.tipManagerKeyUpHandler = (event) => {
            if (event.target !== this.container) {
                return;
            }
            switch (event.key) {
                case "ArrowRight":
                    event.preventDefault();
                    this.nextTip();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    this.previousTip();
                    break;
                case "Home":
                    event.preventDefault();
                    this.selectedIndex = 0;
                    break;
                case "End":
                    event.preventDefault();
                    this.selectedIndex = this.total - 1;
                    break;
            }
        };
        this.storeContainerRef = (el) => {
            this.container = el;
        };
        this.calciteTipManagerToggle = createEvent(this, "calciteTipManagerToggle", 7);
    }
    closedChangeHandler() {
        this.direction = null;
        this.calciteTipManagerToggle.emit();
    }
    selectedChangeHandler() {
        this.showSelectedTip();
        this.updateGroupTitle();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.setUpTips();
    }
    componentDidLoad() {
        this.observer.observe(this.el, { childList: true, subtree: true });
    }
    componentDidUnload() {
        this.observer.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async nextTip() {
        this.direction = "advancing";
        const nextIndex = this.selectedIndex + 1;
        this.selectedIndex = (nextIndex + this.total) % this.total;
    }
    async previousTip() {
        this.direction = "retreating";
        const previousIndex = this.selectedIndex - 1;
        this.selectedIndex = (previousIndex + this.total) % this.total;
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpTips() {
        const tips = Array.from(this.el.querySelectorAll("calcite-tip"));
        this.total = tips.length;
        if (this.total === 0) {
            return;
        }
        const selectedTip = this.el.querySelector("calcite-tip[selected]");
        this.tips = tips;
        this.selectedIndex = selectedTip ? tips.indexOf(selectedTip) : 0;
        tips.forEach((tip) => {
            tip.nonDismissible = true;
        });
        this.showSelectedTip();
        this.updateGroupTitle();
    }
    showSelectedTip() {
        this.tips.forEach((tip, index) => {
            const isSelected = this.selectedIndex === index;
            tip.selected = isSelected;
            tip.hidden = !isSelected;
        });
    }
    updateGroupTitle() {
        const selectedTip = this.tips[this.selectedIndex];
        const tipParent = selectedTip.closest("calcite-tip-group");
        this.groupTitle = (tipParent && tipParent.textGroupTitle) || this.textDefaultTitle;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderPagination() {
        const dir = getElementDir(this.el);
        const { selectedIndex, tips, total } = this;
        return tips.length > 1 ? (h("footer", { class: CSS$1.pagination }, h("calcite-action", { text: this.textPrevious, onClick: this.previousClicked, class: CSS$1.pagePrevious }, h("calcite-icon", { scale: "s", icon: dir === "ltr" ? ICONS$1.chevronLeft : ICONS$1.chevronRight })), h("span", { class: CSS$1.pagePosition }, `${this.textPaginationLabel} ${selectedIndex + 1}/${total}`), h("calcite-action", { text: this.textNext, onClick: this.nextClicked, class: CSS$1.pageNext }, h("calcite-icon", { scale: "s", icon: dir === "ltr" ? ICONS$1.chevronRight : ICONS$1.chevronLeft })))) : null;
    }
    render() {
        const { closed, direction, groupTitle, selectedIndex, textClose, total } = this;
        if (total === 0) {
            return h(Host, null);
        }
        return (h(Host, null, h("div", { class: CSS$1.container, hidden: closed, "aria-hidden": closed.toString(), tabIndex: 0, onKeyUp: this.tipManagerKeyUpHandler, ref: this.storeContainerRef }, h("header", { class: CSS$1.header }, h("h2", { key: selectedIndex, class: CSS$1.heading }, groupTitle), h("calcite-action", { text: textClose, onClick: this.hideTipManager, class: CSS$1.close }, h("calcite-icon", { scale: "s", icon: ICONS$1.close }))), h("div", { tabIndex: 0, class: classnames(CSS$1.tipContainer, {
                [CSS$1.tipContainerAdvancing]: !closed && direction === "advancing",
                [CSS$1.tipContainerRetreating]: !closed && direction === "retreating"
            }), key: selectedIndex }, h("slot", null)), this.renderPagination())));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "closed": ["closedChangeHandler"],
        "selectedIndex": ["selectedChangeHandler"]
    }; }
    static get style() { return ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}\@-webkit-keyframes tip-advance{0%{opacity:0;-webkit-transform:translate3d(50px, 0, 0) scale(0.99);transform:translate3d(50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}\@keyframes tip-advance{0%{opacity:0;-webkit-transform:translate3d(50px, 0, 0) scale(0.99);transform:translate3d(50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}\@-webkit-keyframes tip-retreat{0%{opacity:0;-webkit-transform:translate3d(-50px, 0, 0) scale(0.99);transform:translate3d(-50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}\@keyframes tip-retreat{0%{opacity:0;-webkit-transform:translate3d(-50px, 0, 0) scale(0.99);transform:translate3d(-50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}:host{display:block}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}:host([closed]){display:none}.header .heading{padding-left:var(--calcite-app-side-spacing-half);padding-right:var(--calcite-app-side-spacing-half)}.container{overflow:hidden;position:relative;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half) 0;min-height:150px}.tip-container{-webkit-animation-name:none;animation-name:none;-webkit-animation-duration:var(--calcite-app-animation-time);animation-duration:var(--calcite-app-animation-time);-webkit-animation-timing-function:var(--calcite-app-easing-function);animation-timing-function:var(--calcite-app-easing-function);height:18vh;overflow:auto;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:start;align-items:flex-start}::slotted(calcite-tip-group){max-width:540px;padding:0 var(--calcite-app-side-spacing-half)}::slotted(calcite-tip){max-width:540px;padding:0 var(--calcite-app-side-spacing-half)}.tip-container--advancing{-webkit-animation-name:tip-advance;animation-name:tip-advance}.tip-container--retreating{-webkit-animation-name:tip-retreat;animation-name:tip-retreat}.pagination{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:var(--calcite-app-cap-spacing-quarter) 0}.page-position{font-size:var(--calcite-app-font-size--1);margin:0 var(--calcite-app-side-spacing-half)}"; }
};

export { CalciteTip as calcite_tip, CalciteTipGroup as calcite_tip_group, CalciteTipManager as calcite_tip_manager };
