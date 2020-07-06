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
import { r as registerInstance, f as forceUpdate, h, H as Host, g as getElement, c as createEvent } from './index-03e9a7ba.js';
import { a as getElementDir, g as getSlotted, b as getCalcitePosition$1 } from './dom-7d75fa2b.js';
import { c as classnames } from './index-bd855e89.js';
import { C as CSS_UTILITY } from './resources-34eb8923.js';
var CSS = {
    button: "button",
    buttonTextVisible: "button--text-visible",
    buttonCompact: "button--compact",
    iconContainer: "icon-container",
    slotContainer: "slot-container",
    slotContainerHidden: "slot-container--hidden",
    textContainer: "text-container",
    textContainerVisible: "text-container--visible"
};
var calciteActionCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;background-color:var(--calcite-app-background-clear)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.button{font-family:var(--calcite-app-font-family);display:-ms-flexbox;display:flex;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground);background-color:var(--calcite-app-background);outline-offset:var(--calcite-app-outline-inset);margin:0;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-align:center;align-items:center;border:none;width:auto;cursor:pointer;font-size:var(--calcite-app-font-size--1);line-height:normal;-webkit-transition:color 125ms ease-in-out, fill 125ms ease-in-out, background-color 125ms ease-in-out;transition:color 125ms ease-in-out, fill 125ms ease-in-out, background-color 125ms ease-in-out;text-align:unset;position:relative}.button:hover,.button:focus{background-color:var(--calcite-app-background-hover);color:var(--calcite-app-foreground-hover);fill:var(--calcite-app-foreground-hover)}.button:focus{outline-offset:var(--calcite-app-outline-inset)}.button .icon-container{min-width:var(--calcite-app-icon-size);min-height:var(--calcite-app-icon-size);margin:0;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;pointer-events:none}.button .text-container{line-height:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;opacity:0;width:0;-webkit-transition:opacity var(--calcite-app-animation-time) var(--calcite-app-easing-function), margin var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), width var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:opacity var(--calcite-app-animation-time) var(--calcite-app-easing-function), margin var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), width var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function)}.button .text-container--visible{-ms-flex:1 1 auto;flex:1 1 auto;opacity:1;width:auto}:host([scale=s]) .button{padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}:host([scale=m]) .button{padding:var(--calcite-app-cap-spacing) var(--calcite-app-side-spacing)}:host([scale=l]) .button{padding:var(--calcite-app-cap-spacing-plus-half) var(--calcite-app-side-spacing-plus-half)}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-left:var(--calcite-app-side-spacing-quarter);padding-right:var(--calcite-app-side-spacing-quarter)}.slot-container{display:-ms-flexbox;display:flex}.slot-container--hidden{display:none}.button--text-visible{width:100%}.button--text-visible .icon-container{margin:0 var(--calcite-app-side-spacing-half) 0 0}.button--text-visible .text-container--visible{margin:0 var(--calcite-app-side-spacing-half) 0 0}.button--text-visible.calcite--rtl .icon-container{margin:0 0 0 var(--calcite-app-side-spacing-half)}.button--text-visible.calcite--rtl .text-container--visible{margin:0 0 0 var(--calcite-app-side-spacing-half)}:host([active]) .button,:host([active]) .button:hover,:host([active]) .button:focus,:host([active][loading]) .button{color:var(--calcite-app-foreground-active);fill:var(--calcite-app-foreground-active);background-color:var(--calcite-app-background-active)}:host([appearance=clear]) .button{background-color:var(--calcite-app-background-clear);-webkit-transition:-webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:-webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function)}:host([appearance=clear]) .button:hover,:host([appearance=clear]) .button:focus{background-color:var(--calcite-app-background-clear);-webkit-box-shadow:0 0 0 2px var(--calcite-app-border-hover) inset;box-shadow:0 0 0 2px var(--calcite-app-border-hover) inset}:host([active][appearance=clear]) .button,:host([active][appearance=clear]) .button:hover,:host([active][appearance=clear]) .button:focus{color:var(--calcite-app-foreground-active);fill:var(--calcite-app-foreground-active);background-color:var(--calcite-app-background-active);-webkit-box-shadow:none;box-shadow:none}:host([appearance=clear][loading]) .button,:host([appearance=clear][disabled]) .button{background-color:var(--calcite-app-background-clear)}:host([loading]) .button,:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-app-background)}:host([loading]) calcite-loader[inline]{color:var(--calcite-app-foreground-subtle);margin-right:0}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;opacity:var(--calcite-app-disabled-opacity);background-color:var(--calcite-app-background)}:host([disabled][active]) .button,:host([disabled][active]) .button:hover,:host([disabled][active]) .button:focus{opacity:var(--calcite-app-disabled-opacity);background-color:var(--calcite-app-background-active)}:host([indicator]) .button--text-visible,:host([indicator][scale=s]) .button--text-visible,:host([indicator][scale=l]) .button--text-visible{padding-right:var(--calcite-app-side-spacing)}:host([indicator]) .button::after{content:\"\";border-radius:50%;width:var(--calcite-app-side-spacing-half);height:var(--calcite-app-side-spacing-half);border:var(--calcite-app-side-spacing-eighth) solid var(--calcite-app-background);background-color:var(--calcite-app-foreground-active);position:absolute;bottom:var(--calcite-app-cap-spacing-half);right:var(--calcite-app-side-spacing-half);z-index:1}:host([indicator][scale=s]) .button::after{bottom:var(--calcite-app-cap-spacing-quarter);right:var(--calcite-app-side-spacing-quarter)}:host([indicator][scale=l]) .button::after{bottom:var(--calcite-app-cap-spacing-half);right:var(--calcite-app-side-spacing-half)}:host([indicator]) .calcite--rtl::after{right:unset;left:var(--calcite-app-side-spacing-quarter)}:host([indicator]) .button--text-visible.calcite--rtl{padding-right:var(--calcite-app-side-spacing-three-quarters);padding-left:var(--calcite-app-side-spacing)}:host([indicator]) .button:hover::after,:host([indicator]) .button:focus::after{border-color:var(--calcite-app-background-hover)}:host([indicator][active]) .button::after{border-color:var(--calcite-app-background-active)}:host([indicator]) .button--text-visible::after,:host([indicator][scale=s]) .button--text-visible::after,:host([indicator][scale=l]) .button--text-visible::after{bottom:unset;right:var(--calcite-app-side-spacing-half)}:host([indicator]) .button--text-visible.calcite--rtl::after,:host([indicator][scale=s]) .button--text-visible.calcite--rtl::after,:host([indicator][scale=l]) .button--text-visible.calcite--rtl::after{right:unset;left:var(--calcite-app-side-spacing-half)}";
var CalciteAction = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /** Specify the appearance style of the action, defaults to solid. */
        this.appearance = "solid";
        /**
         * Indicates whether the action is highlighted.
         */
        this.active = false;
        /**
         * Compact mode is used internally by components to reduce side padding, e.g. calcite-block-section.
         */
        this.compact = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * Indicates unread changes.
         */
        this.indicator = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Specifies the size of the action.
         */
        this.scale = "m";
        /**
         * Indicates whether the text is displayed.
         */
        this.textEnabled = false;
        this.observer = new MutationObserver(function () { return forceUpdate(_this); });
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        this.observer.observe(this.el, { childList: true, subtree: true });
    };
    class_1.prototype.componentDidUnload = function () {
        this.observer.disconnect();
    };
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.buttonEl.focus();
                return [2 /*return*/];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.renderTextContainer = function () {
        var _b;
        var _c = this, text = _c.text, textEnabled = _c.textEnabled;
        var textContainerClasses = (_b = {},
            _b[CSS.textContainerVisible] = textEnabled,
            _b);
        return text ? (h("div", { key: "text-container", class: classnames(CSS.textContainer, textContainerClasses) }, text)) : null;
    };
    class_1.prototype.renderIconContainer = function () {
        var _b;
        var _a;
        var _c = this, loading = _c.loading, icon = _c.icon, scale = _c.scale, el = _c.el;
        var iconScale = scale === "l" ? "m" : "s";
        var calciteLoaderNode = loading ? h("calcite-loader", { "is-active": true, inline: true }) : null;
        var calciteIconNode = icon ? h("calcite-icon", { icon: icon, scale: iconScale }) : null;
        var iconNode = calciteLoaderNode || calciteIconNode;
        var hasIconToDisplay = iconNode || ((_a = el.children) === null || _a === void 0 ? void 0 : _a.length);
        var slotContainerNode = (h("div", { class: classnames(CSS.slotContainer, (_b = {},
                _b[CSS.slotContainerHidden] = loading,
                _b)) }, h("slot", null)));
        return hasIconToDisplay ? (h("div", { key: "icon-container", "aria-hidden": "true", class: CSS.iconContainer }, iconNode, slotContainerNode)) : null;
    };
    class_1.prototype.render = function () {
        var _b;
        var _this = this;
        var _c = this, compact = _c.compact, disabled = _c.disabled, loading = _c.loading, el = _c.el, textEnabled = _c.textEnabled, label = _c.label, text = _c.text;
        var ariaLabel = label || text;
        var rtl = getElementDir(el) === "rtl";
        var buttonClasses = (_b = {},
            _b[CSS.buttonTextVisible] = textEnabled,
            _b[CSS.buttonCompact] = compact,
            _b[CSS_UTILITY.rtl] = rtl,
            _b);
        return (h(Host, null, h("button", { class: classnames(CSS.button, buttonClasses), "aria-label": ariaLabel, disabled: disabled, "aria-disabled": disabled.toString(), "aria-busy": loading.toString(), ref: function (buttonEl) { return (_this.buttonEl = buttonEl); } }, this.renderIconContainer(), this.renderTextContainer())));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalciteAction.style = calciteActionCss;
var ICONS = {
    chevronsLeft: "chevrons-left",
    chevronsRight: "chevrons-right"
};
function getClosestShellPosition(el) {
    var shellNode = el.closest("calcite-shell-panel");
    if (!shellNode) {
        return;
    }
    if (shellNode.position) {
        return shellNode.position;
    }
    if (shellNode.layout) {
        return shellNode.layout === "trailing" ? "end" : "start";
    }
}
function getCalcitePosition(position, el) {
    return position || getClosestShellPosition(el) || "start";
}
function toggleChildActionText(_b) {
    var parent = _b.parent, expanded = _b.expanded;
    parent.querySelectorAll("calcite-action").forEach(function (action) { return (action.textEnabled = expanded); });
}
var setTooltipReference = function (tooltip, referenceElement, expanded) {
    if (tooltip) {
        tooltip.referenceElement = !expanded && referenceElement;
    }
    return referenceElement;
};
var CalciteExpandToggle = function (_b) {
    var expanded = _b.expanded, intlExpand = _b.intlExpand, intlCollapse = _b.intlCollapse, toggleExpand = _b.toggleExpand, el = _b.el, position = _b.position, tooltipExpand = _b.tooltipExpand;
    var rtl = getElementDir(el) === "rtl";
    var expandText = expanded ? intlCollapse : intlExpand;
    var icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
    if (rtl) {
        icons.reverse();
    }
    var end = getCalcitePosition(position, el) === "end";
    var expandIcon = end ? icons[1] : icons[0];
    var collapseIcon = end ? icons[0] : icons[1];
    var actionNode = (h("calcite-action", { ref: function (referenceElement) { return setTooltipReference(tooltipExpand, referenceElement, expanded); }, onClick: toggleExpand, textEnabled: expanded, text: expandText, icon: expanded ? expandIcon : collapseIcon }));
    return tooltipExpand ? (h("calcite-tooltip-manager", null, actionNode)) : (actionNode);
};
var CSS$1 = {
    actionGroupBottom: "action-group--bottom"
};
var SLOTS = {
    bottomActions: "bottom-actions"
};
var TEXT = {
    expand: "Expand",
    collapse: "Collapse"
};
var calciteActionBarCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-item-align:stretch;align-self:stretch;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;max-width:15vw;overflow-y:auto;pointer-events:auto}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host([expanded]){max-width:20vw}::slotted(calcite-action-group){border-bottom:1px solid var(--calcite-app-border)}::slotted(calcite-action-group:last-child){border-bottom:none}.action-group--bottom{padding-bottom:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-pack:end;justify-content:flex-end}";
var CalciteActionBar = /** @class */ (function () {
    function CalciteActionBar(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Indicates whether widget can be expanded.
         */
        this.expand = true;
        /**
         * Indicates whether widget is expanded.
         */
        this.expanded = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.toggleExpand = function () {
            _this.expanded = !_this.expanded;
        };
        this.calciteActionBarToggle = createEvent(this, "calciteActionBarToggle", 7);
    }
    CalciteActionBar.prototype.expandHandler = function (expand) {
        if (expand) {
            toggleChildActionText({ parent: this.el, expanded: this.expanded });
        }
    };
    CalciteActionBar.prototype.expandedHandler = function (expanded) {
        if (this.expand) {
            toggleChildActionText({ parent: this.el, expanded: expanded });
        }
        this.calciteActionBarToggle.emit();
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    CalciteActionBar.prototype.componentWillLoad = function () {
        var _b = this, el = _b.el, expand = _b.expand, expanded = _b.expanded;
        if (expand) {
            toggleChildActionText({ parent: el, expanded: expanded });
        }
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteActionBar.prototype.renderBottomActionGroup = function () {
        var _b = this, expanded = _b.expanded, expand = _b.expand, intlExpand = _b.intlExpand, intlCollapse = _b.intlCollapse, textExpand = _b.textExpand, textCollapse = _b.textCollapse, el = _b.el, layout = _b.layout, position = _b.position, toggleExpand = _b.toggleExpand, tooltipExpand = _b.tooltipExpand;
        var expandLabel = intlExpand || textExpand || TEXT.expand;
        var collapseLabel = intlCollapse || textCollapse || TEXT.collapse;
        var expandToggleNode = expand ? (h(CalciteExpandToggle, { expanded: expanded, intlExpand: expandLabel, intlCollapse: collapseLabel, el: el, position: getCalcitePosition$1(position, layout), toggleExpand: toggleExpand, tooltipExpand: tooltipExpand })) : null;
        return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (h("calcite-action-group", { class: CSS$1.actionGroupBottom }, h("slot", { name: SLOTS.bottomActions }), expandToggleNode)) : null;
    };
    CalciteActionBar.prototype.render = function () {
        return (h(Host, null, h("slot", null), this.renderBottomActionGroup()));
    };
    Object.defineProperty(CalciteActionBar.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteActionBar, "watchers", {
        get: function () {
            return {
                "expand": ["expandHandler"],
                "expanded": ["expandedHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return CalciteActionBar;
}());
CalciteActionBar.style = calciteActionBarCss;
var calciteActionGroupCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding:0;padding:var(--calcite-app-cap-spacing-half) 0}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host(:first-child){padding-top:0}::slotted(calcite-action){display:-ms-flexbox;display:flex;width:100%}";
var CalciteActionGroup = /** @class */ (function () {
    function CalciteActionGroup(hostRef) {
        registerInstance(this, hostRef);
    }
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    CalciteActionGroup.prototype.render = function () {
        return (h(Host, null, h("slot", null)));
    };
    return CalciteActionGroup;
}());
CalciteActionGroup.style = calciteActionGroupCss;
var CSS$2 = {
    actionGroupBottom: "action-group--bottom"
};
var TEXT$1 = {
    expand: "Expand",
    collapse: "Collapse"
};
var calciteActionPadCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-shadow:var(--calcite-app-shadow-2);box-shadow:var(--calcite-app-shadow-2);max-width:15vw;overflow-y:auto;-webkit-animation:calcite-app-fade-in var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);animation:calcite-app-fade-in var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}:host([expanded]){max-width:20vw}::slotted(calcite-action-group){border-bottom:1px solid var(--calcite-app-border);padding-bottom:0;padding-top:0}::slotted(calcite-action-group:last-child){border-bottom:none}.action-group--bottom{padding-bottom:0;-ms-flex-positive:1;flex-grow:1;-ms-flex-pack:end;justify-content:flex-end}";
var CalciteActionPad = /** @class */ (function () {
    function CalciteActionPad(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Indicates whether widget can be expanded.
         */
        this.expand = true;
        /**
         * Indicates whether widget is expanded.
         */
        this.expanded = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.toggleExpand = function () {
            _this.expanded = !_this.expanded;
        };
        this.calciteActionPadToggle = createEvent(this, "calciteActionPadToggle", 7);
    }
    CalciteActionPad.prototype.expandHandler = function (expand) {
        if (expand) {
            toggleChildActionText({ parent: this.el, expanded: this.expanded });
        }
    };
    CalciteActionPad.prototype.expandedHandler = function (expanded) {
        if (this.expand) {
            toggleChildActionText({ parent: this.el, expanded: expanded });
        }
        this.calciteActionPadToggle.emit();
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    CalciteActionPad.prototype.componentWillLoad = function () {
        var _b = this, el = _b.el, expand = _b.expand, expanded = _b.expanded;
        if (expand) {
            toggleChildActionText({ parent: el, expanded: expanded });
        }
    };
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    CalciteActionPad.prototype.renderBottomActionGroup = function () {
        var _b = this, expanded = _b.expanded, expand = _b.expand, intlExpand = _b.intlExpand, intlCollapse = _b.intlCollapse, textExpand = _b.textExpand, textCollapse = _b.textCollapse, el = _b.el, layout = _b.layout, position = _b.position, toggleExpand = _b.toggleExpand, tooltipExpand = _b.tooltipExpand;
        var expandLabel = intlExpand || textExpand || TEXT$1.expand;
        var collapseLabel = intlCollapse || textCollapse || TEXT$1.collapse;
        var expandToggleNode = expand ? (h(CalciteExpandToggle, { expanded: expanded, intlExpand: expandLabel, intlCollapse: collapseLabel, el: el, position: getCalcitePosition$1(position, layout), toggleExpand: toggleExpand, tooltipExpand: tooltipExpand })) : null;
        return expandToggleNode ? (h("calcite-action-group", { class: CSS$2.actionGroupBottom }, expandToggleNode)) : null;
    };
    CalciteActionPad.prototype.render = function () {
        return (h(Host, null, h("slot", null), this.renderBottomActionGroup()));
    };
    Object.defineProperty(CalciteActionPad.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteActionPad, "watchers", {
        get: function () {
            return {
                "expand": ["expandHandler"],
                "expanded": ["expandedHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return CalciteActionPad;
}());
CalciteActionPad.style = calciteActionPadCss;
export { CalciteAction as calcite_action, CalciteActionBar as calcite_action_bar, CalciteActionGroup as calcite_action_group, CalciteActionPad as calcite_action_pad };
