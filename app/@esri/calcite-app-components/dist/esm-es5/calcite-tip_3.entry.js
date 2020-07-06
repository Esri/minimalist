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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { g as getSlotted, a as getElementDir } from './dom-7d75fa2b.js';
import { c as classnames } from './index-bd855e89.js';
var CSS = {
    container: "container",
    header: "header",
    heading: "heading",
    close: "close",
    imageFrame: "image-frame",
    content: "content",
    info: "info"
};
var ICONS = {
    close: "x"
};
var SLOTS = {
    thumbnail: "thumbnail"
};
var TEXT = {
    close: "Close"
};
var calciteTipCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:relative;display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;background-color:var(--calcite-app-background-clear)}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}.container{background-color:var(--calcite-app-background);padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing) var(--calcite-app-cap-spacing);margin:var(--calcite-app-cap-spacing) var(--calcite-app-side-spacing);-webkit-box-shadow:var(--calcite-app-shadow-2);box-shadow:var(--calcite-app-shadow-2);border-radius:var(--calcite-app-border-radius)}:host([selected]) .container{-webkit-box-shadow:none;box-shadow:none;margin:0;padding:0}.header{-ms-flex-pack:end;justify-content:flex-end}.header .heading{padding-left:0;padding-right:0}.container[hidden]{display:none}.content{display:-ms-flexbox;display:flex;padding-top:var(--calcite-app-cap-spacing-half)}.info{padding:0 var(--calcite-app-side-spacing);width:70%}.info:only-child{width:100%;padding-left:0;padding-right:0}::slotted(p){margin-top:0}::slotted(a){color:var(--calcite-app-foreground-link)}.image-frame{width:25%}.image-frame img{max-width:100%}::slotted(img){max-width:100%}";
var CalciteTip = /** @class */ (function () {
    function CalciteTip(hostRef) {
        var _this = this;
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
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.hideTip = function () {
            _this.dismissed = true;
            _this.calciteTipDismiss.emit();
        };
        this.calciteTipDismiss = createEvent(this, "calciteTipDismiss", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    CalciteTip.prototype.renderHeader = function () {
        var _a = this, nonDismissible = _a.nonDismissible, hideTip = _a.hideTip, intlClose = _a.intlClose, textClose = _a.textClose, heading = _a.heading;
        var text = intlClose || textClose || TEXT.close;
        var dismissButtonNode = !nonDismissible ? (h("calcite-action", { text: text, onClick: hideTip, class: CSS.close, icon: ICONS.close })) : null;
        var headingNode = heading ? h("h3", { class: CSS.heading }, heading) : null;
        return dismissButtonNode || headingNode ? (h("header", { class: CSS.header }, headingNode, dismissButtonNode)) : null;
    };
    CalciteTip.prototype.renderImageFrame = function () {
        var el = this.el;
        return getSlotted(el, SLOTS.thumbnail) ? (h("div", { class: CSS.imageFrame }, h("slot", { name: SLOTS.thumbnail }))) : null;
    };
    CalciteTip.prototype.renderInfoNode = function () {
        return (h("div", { class: CSS.info }, h("slot", null)));
    };
    CalciteTip.prototype.renderContent = function () {
        return (h("div", { class: CSS.content }, this.renderImageFrame(), this.renderInfoNode()));
    };
    CalciteTip.prototype.render = function () {
        return (h(Host, null, h("article", { class: CSS.container, hidden: this.dismissed }, this.renderHeader(), this.renderContent())));
    };
    Object.defineProperty(CalciteTip.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return CalciteTip;
}());
CalciteTip.style = calciteTipCss;
var calciteTipGroupCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}::slotted(calcite-tip){max-width:540px;padding:0 var(--calcite-app-side-spacing-half)}";
var CalciteTipGroup = /** @class */ (function () {
    function CalciteTipGroup(hostRef) {
        registerInstance(this, hostRef);
    }
    CalciteTipGroup.prototype.render = function () {
        return h("slot", null);
    };
    return CalciteTipGroup;
}());
CalciteTipGroup.style = calciteTipGroupCss;
var CSS$1 = {
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
var ICONS$1 = {
    chevronLeft: "chevron-left",
    chevronRight: "chevron-right",
    close: "x"
};
var TEXT$1 = {
    defaultGroupTitle: "Tips",
    defaultPaginationLabel: "Tip",
    close: "Close",
    previous: "Previous",
    next: "Next"
};
var calciteTipManagerCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}@-webkit-keyframes tip-advance{0%{opacity:0;-webkit-transform:translate3d(50px, 0, 0) scale(0.99);transform:translate3d(50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}@keyframes tip-advance{0%{opacity:0;-webkit-transform:translate3d(50px, 0, 0) scale(0.99);transform:translate3d(50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}@-webkit-keyframes tip-retreat{0%{opacity:0;-webkit-transform:translate3d(-50px, 0, 0) scale(0.99);transform:translate3d(-50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}@keyframes tip-retreat{0%{opacity:0;-webkit-transform:translate3d(-50px, 0, 0) scale(0.99);transform:translate3d(-50px, 0, 0) scale(0.99)}100%{opacity:1;-webkit-transform:translate3d(0, 0, 0) scale(1);transform:translate3d(0, 0, 0) scale(1)}}:host{display:block}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}.header{margin:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:var(--calcite-app-foreground);fill:var(--calcite-app-foreground)}.heading{padding:0;margin:0;font-weight:var(--calcite-app-font-weight-demi)}.header .heading{-ms-flex:1 0 auto;flex:1 0 auto;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half)}h1.heading{font-size:var(--calcite-app-font-size-3)}h2.heading{font-size:var(--calcite-app-font-size-2)}h3.heading{font-size:var(--calcite-app-font-size-1)}h4.heading,h5.heading{font-size:var(--calcite-app-font-size-0)}:host([closed]){display:none}.header .heading{padding-left:var(--calcite-app-side-spacing-half);padding-right:var(--calcite-app-side-spacing-half)}.container{overflow:hidden;position:relative;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half) 0;min-height:150px}.tip-container{-webkit-animation-name:none;animation-name:none;-webkit-animation-duration:var(--calcite-app-animation-time);animation-duration:var(--calcite-app-animation-time);-webkit-animation-timing-function:var(--calcite-app-easing-function);animation-timing-function:var(--calcite-app-easing-function);height:18vh;overflow:auto;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:start;align-items:flex-start}::slotted(calcite-tip-group){max-width:540px;padding:0 var(--calcite-app-side-spacing-half)}::slotted(calcite-tip){max-width:540px;padding:0 var(--calcite-app-side-spacing-half)}.tip-container--advancing{-webkit-animation-name:tip-advance;animation-name:tip-advance}.tip-container--retreating{-webkit-animation-name:tip-retreat;animation-name:tip-retreat}.pagination{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:var(--calcite-app-cap-spacing-quarter) 0}.page-position{font-size:var(--calcite-app-font-size--1);margin:0 var(--calcite-app-side-spacing-half)}";
var CalciteTipManager = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
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
        this.observer = new MutationObserver(function () { return _this.setUpTips(); });
        this.hideTipManager = function () {
            _this.closed = true;
            _this.calciteTipManagerToggle.emit();
        };
        this.previousClicked = function () {
            _this.previousTip();
        };
        this.nextClicked = function () {
            _this.nextTip();
        };
        this.tipManagerKeyUpHandler = function (event) {
            if (event.target !== _this.container) {
                return;
            }
            switch (event.key) {
                case "ArrowRight":
                    event.preventDefault();
                    _this.nextTip();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    _this.previousTip();
                    break;
                case "Home":
                    event.preventDefault();
                    _this.selectedIndex = 0;
                    break;
                case "End":
                    event.preventDefault();
                    _this.selectedIndex = _this.total - 1;
                    break;
            }
        };
        this.storeContainerRef = function (el) {
            _this.container = el;
        };
        this.calciteTipManagerToggle = createEvent(this, "calciteTipManagerToggle", 7);
    }
    class_1.prototype.closedChangeHandler = function () {
        this.direction = null;
        this.calciteTipManagerToggle.emit();
    };
    class_1.prototype.selectedChangeHandler = function () {
        this.showSelectedTip();
        this.updateGroupTitle();
    };
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    class_1.prototype.connectedCallback = function () {
        this.setUpTips();
        this.observer.observe(this.el, { childList: true, subtree: true });
    };
    class_1.prototype.componentDidUnload = function () {
        this.observer.disconnect();
    };
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.nextTip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nextIndex;
            return __generator(this, function (_a) {
                this.direction = "advancing";
                nextIndex = this.selectedIndex + 1;
                this.selectedIndex = (nextIndex + this.total) % this.total;
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.previousTip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var previousIndex;
            return __generator(this, function (_a) {
                this.direction = "retreating";
                previousIndex = this.selectedIndex - 1;
                this.selectedIndex = (previousIndex + this.total) % this.total;
                return [2 /*return*/];
            });
        });
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.setUpTips = function () {
        var tips = Array.from(this.el.querySelectorAll("calcite-tip"));
        this.total = tips.length;
        if (this.total === 0) {
            return;
        }
        var selectedTip = this.el.querySelector("calcite-tip[selected]");
        this.tips = tips;
        this.selectedIndex = selectedTip ? tips.indexOf(selectedTip) : 0;
        tips.forEach(function (tip) {
            tip.nonDismissible = true;
        });
        this.showSelectedTip();
        this.updateGroupTitle();
    };
    class_1.prototype.showSelectedTip = function () {
        var _this = this;
        this.tips.forEach(function (tip, index) {
            var isSelected = _this.selectedIndex === index;
            tip.selected = isSelected;
            tip.hidden = !isSelected;
        });
    };
    class_1.prototype.updateGroupTitle = function () {
        var selectedTip = this.tips[this.selectedIndex];
        var tipParent = selectedTip.closest("calcite-tip-group");
        this.groupTitle =
            (tipParent === null || tipParent === void 0 ? void 0 : tipParent.textGroupTitle) ||
                this.intlDefaultTitle ||
                this.textDefaultTitle ||
                TEXT$1.defaultGroupTitle;
    };
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    class_1.prototype.renderPagination = function () {
        var dir = getElementDir(this.el);
        var _a = this, selectedIndex = _a.selectedIndex, tips = _a.tips, total = _a.total, intlNext = _a.intlNext, textNext = _a.textNext, intlPrevious = _a.intlPrevious, textPrevious = _a.textPrevious, intlPaginationLabel = _a.intlPaginationLabel, textPaginationLabel = _a.textPaginationLabel;
        var nextLabel = intlNext || textNext || TEXT$1.next;
        var previousLabel = intlPrevious || textPrevious || TEXT$1.previous;
        var paginationLabel = intlPaginationLabel || textPaginationLabel || TEXT$1.defaultPaginationLabel;
        return tips.length > 1 ? (h("footer", { class: CSS$1.pagination }, h("calcite-action", { text: previousLabel, onClick: this.previousClicked, class: CSS$1.pagePrevious, icon: dir === "ltr" ? ICONS$1.chevronLeft : ICONS$1.chevronRight }), h("span", { class: CSS$1.pagePosition }, paginationLabel + " " + (selectedIndex + 1) + "/" + total), h("calcite-action", { text: nextLabel, onClick: this.nextClicked, class: CSS$1.pageNext, icon: dir === "ltr" ? ICONS$1.chevronRight : ICONS$1.chevronLeft }))) : null;
    };
    class_1.prototype.render = function () {
        var _a;
        var _b = this, closed = _b.closed, direction = _b.direction, groupTitle = _b.groupTitle, selectedIndex = _b.selectedIndex, intlClose = _b.intlClose, textClose = _b.textClose, total = _b.total;
        var closeLabel = intlClose || textClose || TEXT$1.close;
        if (total === 0) {
            return h(Host, null);
        }
        return (h(Host, null, h("div", { class: CSS$1.container, hidden: closed, "aria-hidden": closed.toString(), tabIndex: 0, onKeyUp: this.tipManagerKeyUpHandler, ref: this.storeContainerRef }, h("header", { class: CSS$1.header }, h("h2", { key: selectedIndex, class: CSS$1.heading }, groupTitle), h("calcite-action", { text: closeLabel, onClick: this.hideTipManager, class: CSS$1.close, icon: ICONS$1.close })), h("div", { tabIndex: 0, class: classnames(CSS$1.tipContainer, (_a = {},
                _a[CSS$1.tipContainerAdvancing] = !closed && direction === "advancing",
                _a[CSS$1.tipContainerRetreating] = !closed && direction === "retreating",
                _a)), key: selectedIndex }, h("slot", null)), this.renderPagination())));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "closed": ["closedChangeHandler"],
                "selectedIndex": ["selectedChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
CalciteTipManager.style = calciteTipManagerCss;
export { CalciteTip as calcite_tip, CalciteTipGroup as calcite_tip_group, CalciteTipManager as calcite_tip_manager };
