import { EventEmitter } from "../stencil-public-runtime";
import { VNode } from "../stencil-public-runtime";
import { CalciteScale, CalciteTheme } from "../interfaces";
declare type FocusId = "dismiss-button";
/**
 * @slot header-content - A slot for adding content in the center of the header.
 * @slot header-leading-content - A slot for adding a `calcite-action` on the leading side of the header.
 * @slot header-trailing-content - A slot for adding a `calcite-action` on the trailing side of the header.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding `calcite-button`s to the footer.
 * @slot - A slot for adding content to the panel.
 */
export declare class CalcitePanel {
    /**
     * Hides the panel.
     */
    dismissed: boolean;
    dismissedHandler(): void;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    disabled: boolean;
    /**
     * Displays a close button in the trailing side of the header.
     */
    dismissible: boolean;
    /**
     * Specifies the maxiumum height of the panel.
     */
    heightScale: CalciteScale;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    loading: boolean;
    /**
     * 'Close' text string for the close button. The close button will only be shown when 'dismissible' is true.
     */
    intlClose?: string;
    /**
     * 'Close' text string for the close button. The close button will only be shown when 'dismissible' is true.
     * @deprecated use "intlClose" instead.
     */
    textClose?: string;
    /**
     * Used to set the component's color scheme.
     */
    theme: CalciteTheme;
    el: HTMLCalcitePanelElement;
    dismissButtonEl: HTMLCalciteActionElement;
    containerEl: HTMLElement;
    /**
     * Emitted when the close button has been clicked.
     */
    calcitePanelDismissedChange: EventEmitter;
    /**
     * Emitted when the content has been scrolled.
     */
    calcitePanelScroll: EventEmitter;
    panelKeyUpHandler: (event: KeyboardEvent) => void;
    dismiss: () => void;
    panelScrollHandler: () => void;
    setFocus(focusId?: FocusId): Promise<void>;
    renderHeaderLeadingContent(): VNode;
    renderHeaderContent(): VNode;
    renderHeaderTrailingContent(): VNode;
    renderHeader(): VNode;
    renderFooter(): VNode;
    renderContent(): VNode;
    renderFab(): VNode;
    render(): VNode;
}
export {};
