var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './index-03e9a7ba.js';
import { C as CalciteScrim } from './CalciteScrim-72de5de3.js';
import { f as focusElement, g as getSlotted, a as getElementDir } from './dom-7d75fa2b.js';
import { c as classnames } from './index-bd855e89.js';
import { g as getRoundRobinIndex } from './array-dbbc14b3.js';
import { C as CSS_UTILITY } from './resources-34eb8923.js';
var CSS = {
    frame: "frame",
    frameAdvancing: "frame--advancing",
    frameRetreating: "frame--retreating"
};
var calciteFlowCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;width:100%;height:100%;overflow:hidden;position:relative}:host .frame{-ms-flex-align:stretch;align-items:stretch;width:100%;padding:0;margin:0;display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;position:relative}:host .frame--advancing{-webkit-animation:calcite-flow-item-advance var(--calcite-app-animation-time) var(--calcite-app-easing-function);animation:calcite-flow-item-advance var(--calcite-app-animation-time) var(--calcite-app-easing-function)}:host .frame--retreating{-webkit-animation:calcite-flow-item-retreat var(--calcite-app-animation-time) var(--calcite-app-easing-function);animation:calcite-flow-item-retreat var(--calcite-app-animation-time) var(--calcite-app-easing-function)}@-webkit-keyframes calcite-flow-item-advance{0%{opacity:0.5;-webkit-transform:translate3d(50px, 0, 0);transform:translate3d(50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@keyframes calcite-flow-item-advance{0%{opacity:0.5;-webkit-transform:translate3d(50px, 0, 0);transform:translate3d(50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@-webkit-keyframes calcite-flow-item-retreat{0%{opacity:0.5;-webkit-transform:translate3d(-50px, 0, 0);transform:translate3d(-50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@keyframes calcite-flow-item-retreat{0%{opacity:0.5;-webkit-transform:translate3d(-50px, 0, 0);transform:translate3d(-50px, 0, 0)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}";
var CalciteFlow = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.flowCount = 0;
        this.flowDirection = null;
        this.flows = [];
        this.getFlowDirection = function (oldFlowCount, newFlowCount) {
            var allowRetreatingDirection = oldFlowCount > 1;
            var allowAdvancingDirection = oldFlowCount && newFlowCount > 1;
            if (!allowAdvancingDirection && !allowRetreatingDirection) {
                return null;
            }
            return newFlowCount < oldFlowCount ? "retreating" : "advancing";
        };
        this.updateFlowProps = function () {
            var flows = _this.flows;
            var newFlows = Array.from(_this.el.querySelectorAll("calcite-flow-item"));
            var oldFlowCount = flows.length;
            var newFlowCount = newFlows.length;
            var activeFlow = newFlows[newFlowCount - 1];
            var previousFlow = newFlows[newFlowCount - 2];
            if (newFlowCount && activeFlow) {
                newFlows.forEach(function (flowNode) {
                    flowNode.showBackButton = newFlowCount > 1;
                    flowNode.hidden = flowNode !== activeFlow;
                });
            }
            if (previousFlow) {
                previousFlow.menuOpen = false;
            }
            _this.flows = newFlows;
            if (oldFlowCount !== newFlowCount) {
                var flowDirection = _this.getFlowDirection(oldFlowCount, newFlowCount);
                _this.flowCount = newFlowCount;
                _this.flowDirection = flowDirection;
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
    class_1.prototype.back = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastItem, beforeBack;
            return __generator(this, function (_c) {
                lastItem = this.el.querySelector("calcite-flow-item:last-child");
                if (!lastItem) {
                    return [2 /*return*/];
                }
                beforeBack = lastItem.beforeBack
                    ? lastItem.beforeBack
                    : function () { return Promise.resolve(); };
                return [2 /*return*/, beforeBack.call(lastItem).then(function () {
                        lastItem.remove();
                        return lastItem;
                    })];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        this.flowItemObserver.observe(this.el, { childList: true, subtree: true });
        this.updateFlowProps();
    };
    class_1.prototype.componentDidUnload = function () {
        this.flowItemObserver.disconnect();
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.handleCalciteFlowItemBackClick = function () {
        this.back();
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.render = function () {
        var _c;
        var _d = this, flowDirection = _d.flowDirection, flowCount = _d.flowCount;
        var frameDirectionClasses = (_c = {},
            _c[CSS.frameAdvancing] = flowDirection === "advancing",
            _c[CSS.frameRetreating] = flowDirection === "retreating",
            _c);
        return (h(Host, null, h("div", { key: flowCount, class: classnames(CSS.frame, frameDirectionClasses) }, h("slot", null))));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalciteFlow.style = calciteFlowCss;
var BLACKLISTED_MENU_ACTIONS_COMPONENTS = ["calcite-pick-list", "calcite-value-list"];
var CSS$1 = {
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
var SLOTS = {
    menuActions: "menu-actions",
    fab: "fab",
    footerActions: "footer-actions"
};
var ICONS = {
    menu: "ellipsis",
    backLeft: "chevron-left",
    backRight: "chevron-right"
};
var TEXT = {
    back: "Back",
    open: "Open",
    close: "Close"
};
var CSS$2 = {
    container: "container",
    header: "header",
    headerLeadingContent: "header-leading-content",
    headerContent: "header-content",
    headerTrailingContent: "header-trailing-content",
    contentContainer: "content-container",
    fabContainer: "fab-container",
    footer: "footer"
};
var ICONS$1 = {
    close: "x"
};
var SLOTS$1 = {
    headerContent: "header-content",
    headerLeadingContent: "header-leading-content",
    headerTrailingContent: "header-trailing-content",
    fab: "fab",
    footer: "footer"
};
var TEXT$1 = {
    close: "Close"
};
var calciteFlowItemCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{background-color:var(--calcite-app-background-content);display:-ms-flexbox;display:flex;height:100%;width:100%}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}calcite-panel{width:100%;height:100%}.header-content{display:block}.header-content .heading{font-size:var(--calcite-app-font-size-1);margin:0 0 var(--calcite-app-cap-spacing-quarter)}.header-content .heading:only-child{margin-bottom:0}.header-content .summary{color:var(--calcite-app-foreground-subtle)}.header-content .heading,.header-content .summary{padding:0;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.menu-button{-ms-flex-item-align:stretch;align-self:stretch;-ms-flex:0 1 auto;flex:0 1 auto;height:100%;position:relative}.header-actions,.menu-container,.single-action-container{display:-ms-flexbox;display:flex}.menu{position:absolute;top:100%;z-index:1;background-color:var(--calcite-app-background);-webkit-box-shadow:var(--calcite-app-shadow-0);box-shadow:var(--calcite-app-shadow-0);padding:0;left:auto;min-width:var(--calcite-app-menu-min-width);right:var(--calcite-app-menu-offset);visibility:visible;-ms-flex-flow:column nowrap;flex-flow:column nowrap;border:1px solid var(--calcite-app-border);-webkit-animation:calcite-app-fade-in-down var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);animation:calcite-app-fade-in-down var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);display:none}.calcite--rtl .menu{left:var(--calcite-app-menu-offset);right:auto}.menu--open{display:block}.footer-actions{display:-ms-flexbox;display:flex;width:100%}.fab-container{display:inline-block}";
var SUPPORTED_ARROW_KEYS = ["ArrowUp", "ArrowDown"];
var CalciteFlowItem = /** @class */ (function () {
    function CalciteFlowItem(hostRef) {
        var _this = this;
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
        this.toggleMenuOpen = function () {
            _this.menuOpen = !_this.menuOpen;
        };
        this.backButtonClick = function () {
            _this.calciteFlowItemBackClick.emit();
        };
        this.menuButtonKeyDown = function (event) {
            var key = event.key;
            var menuOpen = _this.menuOpen;
            if (!_this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
                return;
            }
            var actions = _this.queryActions();
            var length = actions.length;
            if (!length) {
                return;
            }
            event.preventDefault();
            if (!menuOpen) {
                _this.menuOpen = true;
            }
            if (key === "ArrowUp") {
                var lastAction = actions[length - 1];
                focusElement(lastAction);
            }
            if (key === "ArrowDown") {
                var firstAction = actions[0];
                focusElement(firstAction);
            }
        };
        this.menuActionsKeydown = function (event) {
            var key = event.key, target = event.target;
            if (!_this.isValidKey(key, SUPPORTED_ARROW_KEYS)) {
                return;
            }
            var actions = _this.queryActions();
            var length = actions.length;
            var currentIndex = actions.indexOf(target);
            if (!length || currentIndex === -1) {
                return;
            }
            event.preventDefault();
            if (key === "ArrowUp") {
                var value = getRoundRobinIndex(currentIndex - 1, length);
                var previousAction = actions[value];
                focusElement(previousAction);
            }
            if (key === "ArrowDown") {
                var value = getRoundRobinIndex(currentIndex + 1, length);
                var nextAction = actions[value];
                focusElement(nextAction);
            }
        };
        this.menuActionsContainerKeyDown = function (event) {
            var key = event.key;
            if (key === "Escape") {
                _this.menuOpen = false;
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
    CalciteFlowItem.prototype.handleCalcitePanelScroll = function (event) {
        event.stopPropagation();
        this.calciteFlowItemScroll.emit();
    };
    CalciteFlowItem.prototype.queryActions = function () {
        return getSlotted(this.el, SLOTS.menuActions, {
            all: true
        });
    };
    CalciteFlowItem.prototype.isValidKey = function (key, supportedKeys) {
        return !!supportedKeys.find(function (k) { return k === key; });
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteFlowItem.prototype.renderBackButton = function (rtl) {
        var _c = this, showBackButton = _c.showBackButton, intlBack = _c.intlBack, textBack = _c.textBack, backButtonClick = _c.backButtonClick;
        var label = intlBack || textBack || TEXT.back;
        var icon = rtl ? ICONS.backRight : ICONS.backLeft;
        return showBackButton ? (h("calcite-action", { slot: SLOTS$1.headerLeadingContent, key: "back-button", "aria-label": label, text: label, class: CSS$1.backButton, onClick: backButtonClick, icon: icon })) : null;
    };
    CalciteFlowItem.prototype.renderMenuButton = function () {
        var _c = this, menuOpen = _c.menuOpen, textOpen = _c.textOpen, intlOpen = _c.intlOpen, intlClose = _c.intlClose, textClose = _c.textClose;
        var closeLabel = intlClose || textClose || TEXT.close;
        var openLabel = intlOpen || textOpen || TEXT.open;
        var menuLabel = menuOpen ? closeLabel : openLabel;
        return (h("calcite-action", { class: CSS$1.menuButton, "aria-label": menuLabel, text: menuLabel, onClick: this.toggleMenuOpen, onKeyDown: this.menuButtonKeyDown, icon: ICONS.menu }));
    };
    CalciteFlowItem.prototype.renderMenuActions = function () {
        var _c;
        var menuOpen = this.menuOpen;
        return (h("div", { class: classnames(CSS$1.menu, (_c = {}, _c[CSS$1.menuOpen] = menuOpen, _c)), onKeyDown: this.menuActionsKeydown }, h("slot", { name: SLOTS.menuActions })));
    };
    CalciteFlowItem.prototype.renderFooterActions = function () {
        var hasFooterActions = !!getSlotted(this.el, SLOTS.footerActions);
        return hasFooterActions ? (h("div", { slot: SLOTS$1.footer, class: CSS$1.footerActions }, h("slot", { name: SLOTS.footerActions }))) : null;
    };
    CalciteFlowItem.prototype.renderSingleActionContainer = function () {
        return (h("div", { class: CSS$1.singleActionContainer }, h("slot", { name: SLOTS.menuActions })));
    };
    CalciteFlowItem.prototype.renderMenuActionsContainer = function () {
        return (h("div", { class: CSS$1.menuContainer, onKeyDown: this.menuActionsContainerKeyDown }, this.renderMenuButton(), this.renderMenuActions()));
    };
    CalciteFlowItem.prototype.renderHeaderActions = function () {
        var menuActions = getSlotted(this.el, SLOTS.menuActions, { all: true });
        var filteredActions = menuActions.filter(function (el) { return !el.closest(BLACKLISTED_MENU_ACTIONS_COMPONENTS.join(",")); });
        var actionCount = filteredActions.length;
        var menuActionsNodes = actionCount === 1
            ? this.renderSingleActionContainer()
            : actionCount
                ? this.renderMenuActionsContainer()
                : null;
        return menuActionsNodes ? (h("div", { slot: SLOTS$1.headerTrailingContent, class: CSS$1.headerActions }, menuActionsNodes)) : null;
    };
    CalciteFlowItem.prototype.renderHeading = function () {
        var heading = this.heading;
        return heading ? (h("h2", { class: CSS$1.heading, slot: SLOTS$1.headerContent }, heading)) : null;
    };
    CalciteFlowItem.prototype.renderSummary = function () {
        var summary = this.summary;
        return summary ? h("span", { class: CSS$1.summary }, summary) : null;
    };
    CalciteFlowItem.prototype.renderHeader = function () {
        var headingNode = this.renderHeading();
        var summaryNode = this.renderSummary();
        return headingNode || summaryNode ? (h("div", { class: CSS$1.header, slot: SLOTS$1.headerContent }, headingNode, summaryNode)) : null;
    };
    CalciteFlowItem.prototype.renderFab = function () {
        var hasFab = getSlotted(this.el, SLOTS.fab);
        return hasFab ? (h("div", { class: CSS$1.fabContainer, slot: SLOTS$1.fab }, h("slot", { name: SLOTS.fab }))) : null;
    };
    CalciteFlowItem.prototype.render = function () {
        var el = this.el;
        var dir = getElementDir(el);
        return (h(Host, null, h("calcite-panel", { loading: this.loading, disabled: this.disabled, "height-scale": this.heightScale, dir: dir }, this.renderBackButton(dir === "rtl"), this.renderHeader(), this.renderHeaderActions(), h("slot", null), this.renderFooterActions(), this.renderFab())));
    };
    Object.defineProperty(CalciteFlowItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteFlowItem;
}());
CalciteFlowItem.style = calciteFlowItemCss;
var calcitePanelCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;position:relative;--calcite-app-panel-max-height-small:40vh;--calcite-app-panel-max-height-medium:60vh;--calcite-app-panel-max-height-large:80vh;--calcite-app-panel-min-header-height:calc(var(--calcite-app-icon-size) * 3)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}.container{-ms-flex-align:stretch;align-items:stretch;-webkit-transition:max-height var(--calcite-app-animation-time) var(--calcite-app-easing-function);transition:max-height var(--calcite-app-animation-time) var(--calcite-app-easing-function);width:100%;height:100%;padding:0;margin:0;display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column}:host([height-scale=s]) .container{max-height:var(--calcite-app-panel-max-height-small)}:host([height-scale=m]) .container{max-height:var(--calcite-app-panel-max-height-medium)}:host([height-scale=l]) .container{max-height:var(--calcite-app-panel-max-height-large)}.container[hidden]{display:none}:host([loading]) .container,:host([disabled]) .container{position:relative;z-index:1}.header{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-pack:start;justify-content:flex-start;min-height:var(--calcite-app-header-min-height);position:relative;z-index:2;border-bottom:1px solid var(--calcite-app-border);width:100%}.header-content{overflow:hidden;padding:var(--calcite-app-cap-spacing) var(--calcite-app-side-spacing)}.header-leading-content,.header-trailing-content{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap}.header-trailing-content{margin-left:auto}.header-leading-content+.header-content{padding-left:var(--calcite-app-side-spacing-half)}.content-container{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex:1 1 auto;flex:1 1 auto;background-color:var(--calcite-app-background-content);overflow:auto}.footer{border-top:1px solid var(--calcite-app-border);display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-pack:space-evenly;justify-content:space-evenly;min-height:var(--calcite-app-footer-min-height);padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}.calcite--rtl .header-leading-content+.header-content{padding-right:var(--calcite-app-side-spacing-half)}.calcite--rtl .header-trailing-content{margin-left:0;margin-right:auto}.fab-container{position:-webkit-sticky;position:sticky;bottom:0;display:inline-block;margin:0 auto;padding:var(--calcite-app-cap-spacing) 0}";
var CalcitePanel = /** @class */ (function () {
    function class_2(hostRef) {
        var _this = this;
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
        this.panelKeyUpHandler = function (event) {
            if (event.key === "Escape") {
                _this.dismiss();
            }
        };
        this.dismiss = function () {
            _this.dismissed = true;
        };
        this.panelScrollHandler = function () {
            _this.calcitePanelScroll.emit();
        };
        this.calcitePanelDismissedChange = createEvent(this, "calcitePanelDismissedChange", 7);
        this.calcitePanelScroll = createEvent(this, "calcitePanelScroll", 7);
    }
    class_2.prototype.dismissedHandler = function () {
        this.calcitePanelDismissedChange.emit();
    };
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    class_2.prototype.setFocus = function (focusId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                if (focusId === "dismiss-button") {
                    (_a = this.dismissButtonEl) === null || _a === void 0 ? void 0 : _a.setFocus();
                    return [2 /*return*/];
                }
                (_b = this.containerEl) === null || _b === void 0 ? void 0 : _b.focus();
                return [2 /*return*/];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_2.prototype.renderHeaderLeadingContent = function () {
        var hasLeadingContent = getSlotted(this.el, SLOTS$1.headerLeadingContent);
        return hasLeadingContent ? (h("div", { key: "header-leading-content", class: CSS$2.headerLeadingContent }, h("slot", { name: SLOTS$1.headerLeadingContent }))) : null;
    };
    class_2.prototype.renderHeaderContent = function () {
        return (h("div", { key: "header-content", class: CSS$2.headerContent }, h("slot", { name: SLOTS$1.headerContent })));
    };
    class_2.prototype.renderHeaderTrailingContent = function () {
        var _this = this;
        var _c = this, dismiss = _c.dismiss, dismissible = _c.dismissible, intlClose = _c.intlClose, textClose = _c.textClose;
        var text = intlClose || textClose || TEXT$1.close;
        var dismissibleNode = dismissible ? (h("calcite-action", { ref: function (dismissButtonEl) { return (_this.dismissButtonEl = dismissButtonEl); }, "aria-label": text, text: text, onClick: dismiss, icon: ICONS$1.close })) : null;
        var slotNode = h("slot", { name: SLOTS$1.headerTrailingContent });
        return (h("div", { key: "header-trailing-content", class: CSS$2.headerTrailingContent }, slotNode, dismissibleNode));
    };
    class_2.prototype.renderHeader = function () {
        var headerLeadingContentNode = this.renderHeaderLeadingContent();
        var headerContentNode = this.renderHeaderContent();
        var headerTrailingContentNode = this.renderHeaderTrailingContent();
        var canDisplayHeader = headerContentNode || headerLeadingContentNode || headerTrailingContentNode;
        return canDisplayHeader ? (h("header", { class: CSS$2.header }, headerLeadingContentNode, headerContentNode, headerTrailingContentNode)) : null;
    };
    class_2.prototype.renderFooter = function () {
        var el = this.el;
        var hasFooter = getSlotted(el, SLOTS$1.footer);
        return hasFooter ? (h("footer", { class: CSS$2.footer }, h("slot", { name: SLOTS$1.footer }))) : null;
    };
    class_2.prototype.renderContent = function () {
        return (h("section", { class: CSS$2.contentContainer, onScroll: this.panelScrollHandler }, h("slot", null), this.renderFab()));
    };
    class_2.prototype.renderFab = function () {
        var hasFab = getSlotted(this.el, SLOTS$1.fab);
        return hasFab ? (h("div", { class: CSS$2.fabContainer }, h("slot", { name: SLOTS$1.fab }))) : null;
    };
    class_2.prototype.render = function () {
        var _c;
        var _this = this;
        var _d = this, dismissed = _d.dismissed, disabled = _d.disabled, dismissible = _d.dismissible, el = _d.el, loading = _d.loading, panelKeyUpHandler = _d.panelKeyUpHandler;
        var rtl = getElementDir(el) === "rtl";
        return (h(Host, null, h("article", { "aria-busy": loading.toString(), onKeyUp: panelKeyUpHandler, tabIndex: dismissible ? 0 : -1, hidden: dismissible && dismissed, ref: function (containerEl) { return (_this.containerEl = containerEl); }, class: classnames(CSS$2.container, (_c = {},
                _c[CSS_UTILITY.rtl] = rtl,
                _c)) }, this.renderHeader(), this.renderContent(), this.renderFooter()), h(CalciteScrim, { loading: loading, disabled: disabled })));
    };
    Object.defineProperty(class_2.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "watchers", {
        get: function () {
            return {
                "dismissed": ["dismissedHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_2;
}());
CalcitePanel.style = calcitePanelCss;
export { CalciteFlow as calcite_flow, CalciteFlowItem as calcite_flow_item, CalcitePanel as calcite_panel };
