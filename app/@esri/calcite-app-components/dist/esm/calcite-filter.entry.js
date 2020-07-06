import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { d as debounce, f as forIn } from './lodash-f605e937.js';

const CSS = {
    searchIcon: "search-icon",
    clearButton: "clear-button"
};
const TEXT = {
    filterLabel: "filter",
    clear: "Clear filter"
};
const ICONS = {
    search: "search",
    close: "x"
};

const calciteFilterCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;padding:var(--calcite-app-cap-spacing-half) var(--calcite-app-side-spacing-half);width:100%}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;margin:0 var(--calcite-app-side-spacing-quarter);overflow:hidden;position:relative;width:100%}input[type=text]{background-color:transparent;border:0;font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);margin-bottom:calc(var(--calcite-app-cap-spacing-minimum) * 2);padding:var(--calcite-app-cap-spacing-quarter) var(--calcite-app-side-spacing-quarter) var(--calcite-app-cap-spacing-quarter) var(--calcite-app-side-spacing-plus-half);-webkit-transition:padding var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:padding var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:padding var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:padding var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), -webkit-box-shadow var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);width:100%}input[type=text]::-ms-clear{display:none}input[type=text]:focus{border-color:var(--calcite-app-foreground-active);-webkit-box-shadow:0 calc(var(--calcite-app-cap-spacing-minimum) * 2) 0 var(--calcite-app-foreground-active);box-shadow:0 calc(var(--calcite-app-cap-spacing-minimum) * 2) 0 var(--calcite-app-foreground-active);outline:none;padding-left:var(--calcite-app-side-spacing-quarter);padding-right:var(--calcite-app-side-spacing-quarter)}.search-icon{color:var(--calcite-app-foreground-subtle);display:-ms-flexbox;display:flex;left:0;position:absolute;-webkit-transition:left var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), opacity var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function);transition:left var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function), opacity var(--calcite-app-animation-time-fast) var(--calcite-app-easing-function)}.clear-button{color:var(--calcite-app-foreground);background:none;border:0;cursor:pointer}.clear-button:hover,.clear-button:focus{color:var(--calcite-app-foreground-hover)}.calcite--rtl input[type=text]{padding-left:var(--calcite-app-side-spacing-quarter);padding-right:var(--calcite-app-side-spacing-plus-half)}.calcite--rtl .search-icon{left:unset;right:0}input[type=text]:focus~.search-icon{left:calc(var(--calcite-app-icon-size) * -1);opacity:0}";

const filterDebounceInMs = 250;
const CalciteFilter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.empty = true;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.filter = debounce((value) => {
            const regex = new RegExp(value, "ig");
            if (this.data.length === 0) {
                console.warn(`No data was passed to calcite-filter.
      The data property expects an array of objects`);
                this.calciteFilterChange.emit([]);
                return;
            }
            const find = (input, RE) => {
                let found = false;
                forIn(input, (val) => {
                    if (typeof val === "function") {
                        return;
                    }
                    if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
                        if (find(val, RE)) {
                            found = true;
                        }
                    }
                    else if (RE.test(val)) {
                        found = true;
                    }
                });
                return found;
            };
            const result = this.data.filter((item) => {
                return find(item, regex);
            });
            this.calciteFilterChange.emit(result);
        }, filterDebounceInMs);
        this.inputHandler = (event) => {
            const target = event.target;
            this.empty = target.value === "";
            this.filter(target.value);
        };
        this.clear = () => {
            this.textInput.value = "";
            this.empty = true;
            this.calciteFilterChange.emit(this.data);
        };
        this.calciteFilterChange = createEvent(this, "calciteFilterChange", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (h(Host, null, h("label", null, h("input", { type: "text", value: "", placeholder: this.placeholder || this.textPlaceholder, onInput: this.inputHandler, "aria-label": this.intlLabel || this.textLabel || TEXT.filterLabel, ref: (el) => {
                this.textInput = el;
            } }), h("div", { class: CSS.searchIcon }, h("calcite-icon", { scale: "s", icon: ICONS.search }))), !this.empty ? (h("button", { onClick: this.clear, class: CSS.clearButton, "aria-label": this.intlClear || TEXT.clear }, h("calcite-icon", { icon: ICONS.close }))) : null));
    }
    get el() { return getElement(this); }
};
CalciteFilter.style = calciteFilterCss;

export { CalciteFilter as calcite_filter };
