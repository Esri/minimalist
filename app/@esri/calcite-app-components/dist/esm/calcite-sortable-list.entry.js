import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-03e9a7ba.js';
import { S as Sortable } from './sortable.esm-12e4e153.js';

const calciteSortableListCss = ":host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}";

const CalciteSortableList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * The class on the handle elements.
         */
        this.handleSelector = "calcite-handle";
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        this.handleActivated = false;
        this.items = [];
        this.observer = new MutationObserver(() => {
            this.cleanUpDragAndDrop();
            this.items = Array.from(this.el.children);
            this.setUpDragAndDrop();
        });
        this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.items = Array.from(this.el.children);
        this.setUpDragAndDrop();
        this.beginObserving();
    }
    componentDidUnload() {
        this.observer.disconnect();
        this.cleanUpDragAndDrop();
    }
    calciteHandleNudgeHandler(event) {
        const sortItem = this.items.find((item) => {
            return item.contains(event.detail.handle) || event.composedPath().includes(item);
        });
        const lastIndex = this.items.length - 1;
        const startingIndex = this.items.indexOf(sortItem);
        let appendInstead = false;
        let buddyIndex;
        switch (event.detail.direction) {
            case "up":
                event.preventDefault();
                if (startingIndex === 0) {
                    appendInstead = true;
                }
                else {
                    buddyIndex = startingIndex - 1;
                }
                break;
            case "down":
                event.preventDefault();
                if (startingIndex === lastIndex) {
                    buddyIndex = 0;
                }
                else if (startingIndex === lastIndex - 1) {
                    appendInstead = true;
                }
                else {
                    buddyIndex = startingIndex + 2;
                }
                break;
            default:
                return;
        }
        this.observer.disconnect();
        if (appendInstead) {
            sortItem.parentElement.appendChild(sortItem);
        }
        else {
            sortItem.parentElement.insertBefore(sortItem, this.items[buddyIndex]);
        }
        this.items = Array.from(this.el.children);
        event.detail.handle.activated = true;
        event.detail.handle.setFocus();
        this.beginObserving();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpDragAndDrop() {
        this.sortable = Sortable.create(this.el, {
            handle: this.handleSelector,
            // Changed sorting within list
            onUpdate: () => {
                this.items = Array.from(this.el.children);
                this.calciteListOrderChange.emit();
            },
            // Element dragging started
            onStart: () => {
                this.observer.disconnect();
            },
            // Element dragging ended
            onEnd: () => {
                this.beginObserving();
            }
        });
    }
    cleanUpDragAndDrop() {
        this.sortable.destroy();
        this.sortable = null;
    }
    beginObserving() {
        this.observer.observe(this.el, { childList: true, subtree: true });
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (h(Host, null, h("slot", null)));
    }
    get el() { return getElement(this); }
};
CalciteSortableList.style = calciteSortableListCss;

export { CalciteSortableList as calcite_sortable_list };
