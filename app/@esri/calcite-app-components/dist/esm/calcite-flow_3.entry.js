import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './index-03e9a7ba.js';
import { C as CalciteScrim } from './CalciteScrim-72de5de3.js';
import { f as focusElement, g as getSlotted, a as getElementDir } from './dom-7d75fa2b.js';
import { c as classnames } from './index-bd855e89.js';
import { g as getRoundRobinIndex } from './array-dbbc14b3.js';
import { C as CSS_UTILITY } from './resources-34eb8923.js';

const CSS = {
    frame: "frame",
    frameAdvancing: "frame--advancing",
    frameRetreating: "frame--retreating"
};

const calciteFlowCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;width:100%;height:100%;overflow:hidden;position:relative}:host .frame{-ms-flex-align:stretch;align-items:stretch;width:100%;padding:0;margin:0;display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;position:relative}:host .frame--advancing{-webkit-animation:calcite-flow-item-advance var(--calcite-app-animation-time) var(--calcite-app-easing-function);animation:calcite-flow-item-advance var(--calcite-app-animation-time) var(--calcite-app-easing-function)}:host .frame--retreating{-webkit-animation:calcite-flow-item-retreat var(--calcite-app-animation-time) var(--calcite-app-easing-function);animation:calcite-flow-item-retreat var(--calcite-app-animation-time) var(--calcite-app-easing-function)}@-webkit-keyframes calcite-flow-item-advance{0%{opacity:0.5;-webkit-transform:translate3d(50px, 0, 0);transform:translate3d(50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@keyframes calcite-flow-item-advance{0%{opacity:0.5;-webkit-transform:translate3d(50px, 0, 0);transform:translate3d(50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@-webkit-keyframes calcite-flow-item-retreat{0%{opacity:0.5;-webkit-transform:translate3d(-50px, 0, 0);transform:translate3d(-50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@keyframes calcite-flow-item-retreat{0%{opacity:0.5;-webkit-transform:translate3d(-50px, 0, 0);transform:translate3d(-50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}";

const CalciteFlow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.flowCount = 0;
        this.flowDirection = null;
        this.flows = [];
        this.getFlowDirection = (oldFlowCount, newFlowCount) => {
            const allowRetreatingDirection = oldFlowCount > 1;
            const allowAdvancingDirection = oldFlowCount && newFlowCount > 1;
            if (!allowAdvancingDirection && !allowRetreatingDirection) {
                return null;
            }
            return newFlowCount < oldFlowCount ? "retreating" : "advancing";
        };
        this.updateFlowProps = () => {
            const { flows } = this;
            const newFlows = Array.from(this.el.querySelectorAll("calcite-flow-item"));
            const oldFlowCount = flows.length;
            const newFlowCount = newFlows.length;
            const activeFlow = newFlows[newFlowCount - 1];
            const previousFlow = newFlows[newFlowCount - 2];
            if (newFlowCount && activeFlow) {
                newFlows.forEach((flowNode) => {
                    flowNode.showBackButton = newFlowCount > 1;
                    flowNode.hidden = flowNode !== activeFlow;
                });
            }
            if (previousFlow) {
                previousFlow.menuOpen = false;
            }
            this.flows = newFlows;
            if (oldFlowCount !== newFlowCount) {
                const flowDirection = this.getFlowDirection(oldFlowCount, newFlowCount);
                this.flowCount = newFlowCount;
                this.flowDirection = flowDirection;
            }
        };
        this.flowItemObserver = new MutationObserver(this.updateFlowProps);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Removes the currently active `calcite-flow-item`.
     */
    async back() {
        const lastItem = this.el.querySelector("calcite-flow-item:last-child");
        if (!lastItem) {
            return;
        }
        const beforeBack = lastItem.beforeBack
            ? lastItem.beforeBack
            : () => Promise.resolve();
        return beforeBack.call(lastItem).then(() => {
            lastItem.remove();
            return lastItem;
        });
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.flowItemObserver.observe(this.el, { childList: true, subtree: true });
        this.updateFlowProps();
    }
    componentDidUnload() {
        this.flowItemObserver.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    handleCalciteFlowItemBackClick() {
        this.back();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { flowDirection, flowCount } = this;
        const frameDirectionClasses = {
            [CSS.frameAdvancing]: flowDirection === "advancing",
            [CSS.frameRetreating]: flowDirection === "retreating"
        };
        return (h(Host, null, h("div", { key: flowCount, class: classnames(CSS.frame, frameDirectionClasses) }, h("slot", null))));
    }
    get el() { return getElement(this); }
};
CalciteFlow.style = calciteFlowCss;

const BLACKLISTED_MENU_ACTIONS_COMPONENTS = ["calcite-pick-list", "calcite-value-list"];
const CSS$1 = {
    header: "header-content",
    heading: "heading",
    summary: "summary",
    backButton: "back-button",
    footerActions: "footer-actions",
    headerActions: "header-actions",
    singleActionContainer: "single-action-container",
    menuContainer: "menu-container",
    menuButton: "menu-button",
    menu: "menu",
    menuOpen: "menu--open",
    fabContainer: "fab-container"
};
const SLOTS = {
    menuActions: "menu-actions",
    fab: "fab",
    footerActions: "footer-actions"
};
const ICONS = {
    menu: "ellipsis",
    backLeft: "chevron-left",
    backRight: "chevron-right"
};
const TEXT = {
    back: "Back",
    open: "Open",
    close: "Close"
};

const CSS$2 = {
    container: "container",
    header: "header",
    headerLeadingContent: "header-leading-content",
    headerContent: "header-content",
    headerTrailingContent: "header-trailing-content",
    contentContainer: "content-container",
    fabContainer: "fab-container",
    footer: "footer"
};
const ICONS$1 = {
    close: "x"
};
const SLOTS$1 = {
    headerContent: "header-content",
    headerLeadingContent: "header-leading-content",
    headerTrailingContent: "header-trailing-content",
    fab: "fab",
    footer: "footer"
};
const TEXT$1 = {
    close: "Close"
};

const calciteFlowItemCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{background-color:var(--calcite-app-background-content);display:-ms-flexbox;display:flex;height:100%;width:100%}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}calcite-panel{width:100%;height:100%}.header-content{display:block}.header-content .heading{font-size:var(--calcite-app-font-size-1);margin:0 0 var(--calcite-app-cap-spacing-quarter)}.header-content .heading:only-child{margin-bottom:0}.header-content .summary{color:var(--calcite-app-foreground-subtle)}.header-content .heading,.header-content .summary{padding:0;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.menu-button{-ms-flex-item-align:stretch;align-self:stretch;-ms-flex:0 1 auto;flex:0 1 auto;height:100%;position:relative}.header-actions,.menu-container,.single-action-container{display:-ms-flexbox;display:flex}.menu{position:absolute;top:100%;z-index:1;background-color:var(--calcite-app-background);-webkit-box-shadow:var(--calcite-app-shadow-0);box-shadow:var(--calcite-app-shadow-0);padding:0;left:auto;min-width:var(--calcite-app-menu-min-width);right:var(--calcite-app-menu-offset);visibility:visible;-ms-flex-flow:column nowrap;flex-flow:column nowrap;border:1px solid var(--calcite-app-border);-webkit-animation:calcite-app-fade-in-down var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);animation:calcite-app-fade-in-down var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);display:none}.calcite--rtl .menu{left:var(--calcite-app-menu-offset);right:auto}.menu--open{display:block}.footer-actions{display:-ms-flexbox;display:flex;width:100%}.fab-container{display:inline-block}";

const SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];
const CalciteFlowItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Opens the action menu.
         */
        this.menuOpen = false;
        /**
         * Shows a back button in the header.
         */
        this.showBackButton = false;
        this.toggleMenuOpen = () => {
            this.menuOpen = !this.menuOpen;
        };
        this.backButtonClick = () => {
            this.calciteFlowItemBackClick.emit();
        };
        this.menuButtonKeyDown = (event) => {
            const { key } = event;
            const { menuOpen } = this;
            if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
                return;
            }
            const actions = this.queryActions();
            const { length } = actions;
            if (!length) {
                return;
            }
            event.preventDefault();
            if (!menuOpen) {
                this.menuOpen = true;
            }
            if (key === "ArrowUp") {
                const lastAction = actions[length - 1];
                focusElement(lastAction);
            }
            if (key === "ArrowDown") {
                const firstAction = actions[0];
                focusElement(firstAction);
            }
        };
        this.menuActionsKeydown = (event) => {
            const { key, target } = event;
            if (!this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
                return;
            }
            const actions = this.queryActions();
            const { length } = actions;
            const currentIndex = actions.indexOf(target);
            if (!length || currentIndex === -1) {
                return;
            }
            event.preventDefault();
            if (key === "ArrowUp") {
                const value = getRoundRobinIndex(currentIndex - 1, length);
                const previousAction = actions[value];
                focusElement(previousAction);
            }
            if (key === "ArrowDown") {
                const value = getRoundRobinIndex(currentIndex + 1, length);
                const nextAction = actions[value];
                focusElement(nextAction);
            }
        };
        this.menuActionsContainerKeyDown = (event) => {
            const { key } = event;
            if (key === "Escape") {
                this.menuOpen = false;
            }
        };
        this.calciteFlowItemBackClick = createEvent(this, "calciteFlowItemBackClick", 7);
        this.calciteFlowItemScroll = createEvent(this, "calciteFlowItemScroll", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    handleCalcitePanelScroll(event) {
        event.stopPropagation();
        this.calciteFlowItemScroll.emit();
    }
    queryActions() {
        return getSlotted(this.el, SLOTS.menuActions, {
            all: true
        });
    }
    isValidKey(key, supportedKeys) {
        return !!supportedKeys.find((k) => k === key);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderBackButton(rtl) {
        const { showBackButton, intlBack, textBack, backButtonClick } = this;
        const label = intlBack || textBack || TEXT.back;
        const icon = rtl ? ICONS.backRight : ICONS.backLeft;
        return showBackButton ? (h("calcite-action", { slot: SLOTS$1.headerLeadingContent, key: "back-button", "aria-label": label, text: label, class: CSS$1.backButton, onClick: backButtonClick, icon: icon })) : null;
    }
    renderMenuButton() {
        const { menuOpen, textOpen, intlOpen, intlClose, textClose } = this;
        const closeLabel = intlClose || textClose || TEXT.close;
        const openLabel = intlOpen || textOpen || TEXT.open;
        const menuLabel = menuOpen ? closeLabel : openLabel;
        return (h("calcite-action", { class: CSS$1.menuButton, "aria-label": menuLabel, text: menuLabel, onClick: this.toggleMenuOpen, onKeyDown: this.menuButtonKeyDown, icon: ICONS.menu }));
    }
    renderMenuActions() {
        const { menuOpen } = this;
        return (h("div", { class: classnames(CSS$1.menu, { [CSS$1.menuOpen]: menuOpen }), onKeyDown: this.menuActionsKeydown }, h("slot", { name: SLOTS.menuActions })));
    }
    renderFooterActions() {
        const hasFooterActions = !!getSlotted(this.el, SLOTS.footerActions);
        return hasFooterActions ? (h("div", { slot: SLOTS$1.footer, class: CSS$1.footerActions }, h("slot", { name: SLOTS.footerActions }))) : null;
    }
    renderSingleActionContainer() {
        return (h("div", { class: CSS$1.singleActionContainer }, h("slot", { name: SLOTS.menuActions })));
    }
    renderMenuActionsContainer() {
        return (h("div", { class: CSS$1.menuContainer, onKeyDown: this.menuActionsContainerKeyDown }, this.renderMenuButton(), this.renderMenuActions()));
    }
    renderHeaderActions() {
        const menuActions = getSlotted(this.el, SLOTS.menuActions, { all: true });
        const filteredActions = menuActions.filter((el) => !el.closest(BLACKLISTED_MENU_ACTIONS_COMPONENTS.join(",")));
        const actionCount = filteredActions.length;
        const menuActionsNodes = actionCount === 1
            ? this.renderSingleActionContainer()
            : actionCount
                ? this.renderMenuActionsContainer()
                : null;
        return menuActionsNodes ? (h("div", { slot: SLOTS$1.headerTrailingContent, class: CSS$1.headerActions }, menuActionsNodes)) : null;
    }
    renderHeading() {
        const { heading } = this;
        return heading ? (h("h2", { class: CSS$1.heading, slot: SLOTS$1.headerContent }, heading)) : null;
    }
    renderSummary() {
        const { summary } = this;
        return summary ? h("span", { class: CSS$1.summary }, summary) : null;
    }
    renderHeader() {
        const headingNode = this.renderHeading();
        const summaryNode = this.renderSummary();
        return headingNode || summaryNode ? (h("div", { class: CSS$1.header, slot: SLOTS$1.headerContent }, headingNode, summaryNode)) : null;
    }
    renderFab() {
        const hasFab = getSlotted(this.el, SLOTS.fab);
        return hasFab ? (h("div", { class: CSS$1.fabContainer, slot: SLOTS$1.fab }, h("slot", { name: SLOTS.fab }))) : null;
    }
    render() {
        const { el } = this;
        const dir = getElementDir(el);
        return (h(Host, null, h("calcite-panel", { loading: this.loading, disabled: this.disabled, "height-scale": this.heightScale, dir: dir }, this.renderBackButton(dir === "rtl"), this.renderHeader(), this.renderHeaderActions(), h("slot", null), this.renderFooterActions(), this.renderFab())));
    }
    get el() { return getElement(this); }
};
CalciteFlowItem.style = calciteFlowItemCss;

const calcitePanelCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;position:relative;--calcite-app-panel-max-height-small:40vh;--calcite-app-panel-max-height-medium:60vh;--calcite-app-panel-max-height-large:80vh;--calcite-app-panel-min-header-height:calc(var(--calcite-app-icon-size) * 3)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}.container{-ms-flex-align:stretch;align-items:stretch;-webkit-transition:max-height var(--calcite-app-animation-time) var(--calcite-app-easing-function);transition:max-height var(--calcite-app-animation-time) var(--calcite-app-easing-function);width:100%;height:100%;padding:0;margin:0;display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column}:host([height-scale=s]) .container{max-height:var(--calcite-app-panel-max-height-small)}:host([height-scale=m]) .container{max-height:var(--calcite-app-panel-max-height-medium)}:host([height-scale=l]) .container{max-height:var(--calcite-app-panel-max-height-large)}.container[hidden]{display:none}:host([loading]) .container,:host([disabled]) .container{position:relative;z-index:1}.header{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-pack:start;justify-content:flex-start;min-height:var(--calcite-app-header-min-height);position:relative;z-index:2;border-bottom:1px solid var(--calcite-app-border);width:100%}.header-content{overflow:hidden;padding:var(--calcite-app-cap-spacing) var(--calcite-app-side-spacing)}.header-leading-content,.header-trailing-content{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap}.header-trailing-content{margin-left:auto}.header-leading-content+.header-content{padding-left:var(--calcite-app-side-spacing-half)}.content-container{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex:1 1 auto;flex:1 1 auto;background-color:var(--calcite-app-background-content);overflow:auto}.footer{border-top:1px solid var(--calcite-app-border);display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-pack:space-evenly;justify-content:space-evenly;min-height:var(--calcite-app-footer-min-height);padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}.calcite--rtl .header-leading-content+.header-content{padding-right:var(--calcite-app-side-spacing-half)}.calcite--rtl .header-trailing-content{margin-left:0;margin-right:auto}.fab-container{position:-webkit-sticky;position:sticky;bottom:0;display:inline-block;margin:0 auto;padding:var(--calcite-app-cap-spacing) 0}";

const CalcitePanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Hides the panel.
         */
        this.dismissed = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * Displays a close button in the trailing side of the header.
         */
        this.dismissible = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.panelKeyUpHandler = (event) => {
            if (event.key === "Escape") {
                this.dismiss();
            }
        };
        this.dismiss = () => {
            this.dismissed = true;
        };
        this.panelScrollHandler = () => {
            this.calcitePanelScroll.emit();
        };
        this.calcitePanelDismissedChange = createEvent(this, "calcitePanelDismissedChange", 7);
        this.calcitePanelScroll = createEvent(this, "calcitePanelScroll", 7);
    }
    dismissedHandler() {
        this.calcitePanelDismissedChange.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    async setFocus(focusId) {
        var _a, _b;
        if (focusId === "dismiss-button") {
            (_a = this.dismissButtonEl) === null || _a === void 0 ? void 0 : _a.setFocus();
            return;
        }
        (_b = this.containerEl) === null || _b === void 0 ? void 0 : _b.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeaderLeadingContent() {
        const hasLeadingContent = getSlotted(this.el, SLOTS$1.headerLeadingContent);
        return hasLeadingContent ? (h("div", { key: "header-leading-content", class: CSS$2.headerLeadingContent }, h("slot", { name: SLOTS$1.headerLeadingContent }))) : null;
    }
    renderHeaderContent() {
        return (h("div", { key: "header-content", class: CSS$2.headerContent }, h("slot", { name: SLOTS$1.headerContent })));
    }
    renderHeaderTrailingContent() {
        const { dismiss, dismissible, intlClose, textClose } = this;
        const text = intlClose || textClose || TEXT$1.close;
        const dismissibleNode = dismissible ? (h("calcite-action", { ref: (dismissButtonEl) => (this.dismissButtonEl = dismissButtonEl), "aria-label": text, text: text, onClick: dismiss, icon: ICONS$1.close })) : null;
        const slotNode = h("slot", { name: SLOTS$1.headerTrailingContent });
        return (h("div", { key: "header-trailing-content", class: CSS$2.headerTrailingContent }, slotNode, dismissibleNode));
    }
    renderHeader() {
        const headerLeadingContentNode = this.renderHeaderLeadingContent();
        const headerContentNode = this.renderHeaderContent();
        const headerTrailingContentNode = this.renderHeaderTrailingContent();
        const canDisplayHeader = headerContentNode || headerLeadingContentNode || headerTrailingContentNode;
        return canDisplayHeader ? (h("header", { class: CSS$2.header }, headerLeadingContentNode, headerContentNode, headerTrailingContentNode)) : null;
    }
    renderFooter() {
        const { el } = this;
        const hasFooter = getSlotted(el, SLOTS$1.footer);
        return hasFooter ? (h("footer", { class: CSS$2.footer }, h("slot", { name: SLOTS$1.footer }))) : null;
    }
    renderContent() {
        return (h("section", { class: CSS$2.contentContainer, onScroll: this.panelScrollHandler }, h("slot", null), this.renderFab()));
    }
    renderFab() {
        const hasFab = getSlotted(this.el, SLOTS$1.fab);
        return hasFab ? (h("div", { class: CSS$2.fabContainer }, h("slot", { name: SLOTS$1.fab }))) : null;
    }
    render() {
        const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;
        const rtl = getElementDir(el) === "rtl";
        return (h(Host, null, h("article", { "aria-busy": loading.toString(), onKeyUp: panelKeyUpHandler, tabIndex: dismissible ? 0 : -1, hidden: dismissible && dismissed, ref: (containerEl) => (this.containerEl = containerEl), class: classnames(CSS$2.container, {
                [CSS_UTILITY.rtl]: rtl
            }) }, this.renderHeader(), this.renderContent(), this.renderFooter()), h(CalciteScrim, { loading: loading, disabled: disabled })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "dismissed": ["dismissedHandler"]
    }; }
};
CalcitePanel.style = calcitePanelCss;

export { CalciteFlow as calcite_flow, CalciteFlowItem as calcite_flow_item, CalcitePanel as calcite_panel };
