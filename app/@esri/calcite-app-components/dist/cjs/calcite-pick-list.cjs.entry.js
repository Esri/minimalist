'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-bed90626.js');
require('./CalciteScrim-1f0f6712.js');
require('./dom-ead89a9a.js');
require('./array-d5ecc334.js');
const resources = require('./resources-d30f8d23.js');
require('./lodash-7ff3eef0.js');
const sharedListRender = require('./shared-list-render-f11fa0b4.js');

const calcitePickListCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--calcite-app-foreground);font-family:var(--calcite-app-font-family);font-size:var(--calcite-app-font-size-0);line-height:var(--calcite-app-line-height);background-color:var(--calcite-app-background)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{-ms-flex-align:stretch;align-items:stretch;display:-ms-flexbox;display:flex;-ms-flex:1 0 auto;flex:1 0 auto;-ms-flex-flow:column;flex-flow:column;padding-bottom:var(--calcite-app-cap-spacing);position:relative}:host([hidden]){display:none}:host([theme=dark]){--calcite-app-background:#404040;--calcite-app-foreground:#dfdfdf;--calcite-app-background-hover:#2b2b2b;--calcite-app-foreground-hover:#f3f3f3;--calcite-app-background-active:#151515;--calcite-app-foreground-active:#59d6ff;--calcite-app-foreground-subtle:#eaeaea;--calcite-app-background-content:#2b2b2b;--calcite-app-border:#2b2b2b;--calcite-app-border-hover:#2b2b2b;--calcite-app-border-subtle:#2b2b2b;--calcite-app-scrim:rgba(64, 64, 64, 0.8)}:host([theme=light]){--calcite-app-background:#ffffff;--calcite-app-foreground:#404040;--calcite-app-background-hover:#eaeaea;--calcite-app-foreground-hover:#2b2b2b;--calcite-app-background-active:#c7eaff;--calcite-app-foreground-active:#00619b;--calcite-app-foreground-subtle:#757575;--calcite-app-foreground-link:#007ac2;--calcite-app-background-content:#f3f3f3;--calcite-app-background-clear:transparent;--calcite-app-border:#eaeaea;--calcite-app-border-hover:#dfdfdf;--calcite-app-border-subtle:#f3f3f3;--calcite-app-border-active:#007ac2;--calcite-app-disabled-opacity:0.25;--calcite-app-scrim:rgba(255, 255, 255, 0.8)}header{background-color:var(--calcite-app-background);display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;-ms-flex-align:center;align-items:center;margin-bottom:var(--calcite-app-cap-spacing-half);-webkit-box-shadow:0 -1px 0 var(--calcite-app-border) inset;box-shadow:0 -1px 0 var(--calcite-app-border) inset}header.sticky{position:-webkit-sticky;position:sticky;top:0;z-index:1}calcite-filter{margin-bottom:1px}slot[name=menu-actions]::slotted(calcite-action){padding:0 var(--calcite-app-side-spacing-half)}:host([loading][disabled]){min-height:2rem}";

const CalcitePickList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Properties
        //
        // --------------------------------------------------------------------------
        /**
         * Compact removes the selection icon (radio or checkbox) and adds a compact attribute.
         * This allows for a more compact version of the `calcite-pick-list-item`.
         *
         * @deprecated This property will be removed in a future release.
         */
        this.compact = false;
        /**
         * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
         */
        this.disabled = false;
        /**
         * When true, an input appears at the top of the list that can be used by end users to filter items in the list.
         */
        this.filterEnabled = false;
        /**
         * When true, content is waiting to be loaded. This state shows a busy indicator.
         */
        this.loading = false;
        /**
         * Multiple works similar to standard radio buttons and checkboxes.
         * When true, a user can select multiple items at a time.
         * When false, only a single item can be selected at a time
         * and selecting a new item will deselect any other selected items.
         */
        this.multiple = false;
        /**
         * Placeholder text for the filter input field.
         */
        this.textFilterPlaceholder = resources.TEXT.filterPlaceholder;
        // --------------------------------------------------------------------------
        //
        //  Private Properties
        //
        // --------------------------------------------------------------------------
        this.selectedValues = new Map();
        this.dataForFilter = [];
        this.lastSelectedItem = null;
        this.observer = new MutationObserver(sharedListRender.mutationObserverCallback.bind(this));
        this.deselectSiblingItems = sharedListRender.deselectSiblingItems.bind(this);
        this.selectSiblings = sharedListRender.selectSiblings.bind(this);
        this.handleFilter = sharedListRender.handleFilter.bind(this);
        this.getItemData = sharedListRender.getItemData.bind(this);
        this.keyDownHandler = sharedListRender.keyDownHandler.bind(this);
        this.calciteListChange = index.createEvent(this, "calciteListChange", 7);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        sharedListRender.initialize.call(this);
        sharedListRender.initializeObserver.call(this);
    }
    componentDidUnload() {
        sharedListRender.cleanUpObserver.call(this);
    }
    calciteListItemChangeHandler(event) {
        sharedListRender.calciteListItemChangeHandler.call(this, event);
    }
    calciteListItemPropsChangeHandler(event) {
        event.stopPropagation();
        this.setUpFilter();
    }
    calciteListItemValueChangeHandler(event) {
        sharedListRender.calciteListItemValueChangeHandler.call(this, event);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpItems() {
        sharedListRender.setUpItems.call(this, "calcite-pick-list-item");
    }
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    async getSelectedItems() {
        return this.selectedValues;
    }
    async setFocus() {
        return sharedListRender.setFocus.call(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    getIconType() {
        return this.multiple ? resources.ICON_TYPES.square : resources.ICON_TYPES.circle;
    }
    render() {
        return index.h(sharedListRender.List, { props: this, onKeyDown: this.keyDownHandler });
    }
    get el() { return index.getElement(this); }
};
CalcitePickList.style = calcitePickListCss;

exports.calcite_pick_list = CalcitePickList;
