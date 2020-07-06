import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-d518aa55.js';
import { g as getKey } from './key-3b974aad.js';
var calciteCheckboxCss = ":host([hidden]){display:none}::slotted(input){display:none}:host{display:inline-block;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) .check-svg{outline:2px solid var(--calcite-ui-blue-1);outline-offset:2px}.check-svg{width:20px;height:20px;overflow:hidden;display:inline-block;background-color:white;border:1px solid #757575;vertical-align:-0.25em;margin-right:0.25em;pointer-events:none;-webkit-transition:all 150ms linear;transition:all 150ms linear;-webkit-box-sizing:border-box;box-sizing:border-box}:host([theme=dark]) .check-svg{background-color:transparent;border-color:#eaeaea}:host([theme=dark][disabled]) .check-svg{border-color:#757575;background-color:#2b2b2b}:host([theme=dark][checked]) .check-svg,:host([theme=dark][indeterminate]) .check-svg{background-color:#3db8ff}:host([size=large]) .check-svg{width:24px;height:24px}:host([size=small]) .check-svg{width:16px;height:16px}:host([disabled]){pointer-events:none;cursor:default}:host([disabled]) .check-svg{background-color:#f3f3f3;border-color:#eaeaea}:host([disabled][checked]) .check-svg,:host([disabled][indeterminate]) .check-svg{background-color:#84c1e8;border-color:#84c1e8}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:#007ac2;border:1px solid #007ac2}:host(:hover),:host(:focus){outline:none}";
var CalciteCheckbox = /** @class */ (function () {
    function CalciteCheckbox(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /** True if the checkbox is initially checked */
        this.checked = false;
        /**
         * True if the checkbox is initially indeterminate,
         * which is independent from its checked state
         * https://css-tricks.com/indeterminate-checkboxes/
         * */
        this.indeterminate = false;
        /** The name of the checkbox input */
        this.name = "";
        /** The value of the checkbox input */
        this.value = "";
        /** Size of the checkbox  */
        this.size = null;
        /** True if the checkbox is disabled */
        this.disabled = false;
        this.toggle = function () {
            if (!_this.disabled) {
                _this.checked = !_this.checked;
                _this.indeterminate = false;
            }
        };
        this.indeterminatePath = "M4 7h8v2H4z";
        this.checkedPath = "M12.753 3l-7.319 7.497L3.252 8.31 2 9.373l3.434 3.434L14 4.24z";
        this.getPath = function () { return _this.indeterminate
            ? _this.indeterminatePath
            : _this.checked
                ? _this.checkedPath
                : ""; };
        this.syncThisToProxyInput = function () {
            _this.checked = _this.inputProxy.hasAttribute("checked");
            _this.name = _this.inputProxy.name;
            _this.value = _this.inputProxy.value;
        };
        this.syncProxyInputToThis = function () {
            _this.checked
                ? _this.inputProxy.setAttribute("checked", "")
                : _this.inputProxy.removeAttribute("checked");
            _this.inputProxy.name = _this.name;
            _this.inputProxy.value = _this.value;
        };
        this.calciteCheckboxChange = createEvent(this, "calciteCheckboxChange", 7);
    }
    CalciteCheckbox.prototype.onClick = function (_a) {
        var target = _a.target;
        // prevent duplicate click events that occur
        // when the component is wrapped in a label and checkbox is clicked
        if ((this.el.closest("label") && target === this.inputProxy) ||
            (!this.el.closest("label") && target === this.el)) {
            this.toggle();
        }
    };
    CalciteCheckbox.prototype.keyDownHandler = function (e) {
        var key = getKey(e.key);
        if (key === " " || key === "Enter") {
            e.preventDefault();
            this.toggle();
        }
    };
    CalciteCheckbox.prototype.checkedWatcher = function () {
        this.calciteCheckboxChange.emit();
        this.checked
            ? this.inputProxy.setAttribute("checked", "")
            : this.inputProxy.removeAttribute("checked");
    };
    CalciteCheckbox.prototype.connectedCallback = function () {
        this.setupProxyInput();
    };
    CalciteCheckbox.prototype.disconnectedCallback = function () {
        this.observer.disconnect();
    };
    CalciteCheckbox.prototype.componentWillRender = function () {
        this.syncProxyInputToThis();
    };
    CalciteCheckbox.prototype.render = function () {
        return (h(Host, { role: "checkbox", "aria-checked": this.checked.toString(), tabindex: this.disabled ? "-1" : "0" }, h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath(), fill: "white" })), h("slot", null)));
    };
    CalciteCheckbox.prototype.setupProxyInput = function () {
        // check for a proxy input
        this.inputProxy = this.el.querySelector("input");
        // if the user didn't pass a proxy input create one for them
        if (!this.inputProxy) {
            this.inputProxy = document.createElement("input");
            this.inputProxy.type = "checkbox";
            this.syncProxyInputToThis();
            this.el.appendChild(this.inputProxy);
        }
        this.syncThisToProxyInput();
        {
            this.observer = new MutationObserver(this.syncThisToProxyInput);
            this.observer.observe(this.inputProxy, { attributes: true });
        }
    };
    Object.defineProperty(CalciteCheckbox.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalciteCheckbox, "watchers", {
        get: function () {
            return {
                "checked": ["checkedWatcher"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return CalciteCheckbox;
}());
CalciteCheckbox.style = calciteCheckboxCss;
export { CalciteCheckbox as calcite_checkbox };
