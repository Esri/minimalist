import { EventEmitter } from "../stencil-public-runtime";
import { VNode } from "../stencil-public-runtime";
import { CalciteScale, CalciteTheme } from "../interfaces";
/**
 * @slot menu-actions - A slot for adding `calcite-action`s to a menu under the `...` in the header. These actions are displayed when the menu is open.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - A slot for adding `calcite-button`s to the footer.
 * @slot - A slot for adding content to the flow item.
 */
export declare class CalciteFlowItem {
    /**
     * When provided, this method will be called before it is removed from the parent flow.
     */
    beforeBack?: () => Promise<void>;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    disabled: boolean;
    /**
     * Specifies the maxiumum height of the panel that this wraps.
     */
    heightScale: CalciteScale;
    /**
     * Heading text.
     */
    heading: string;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    loading: boolean;
    /**
     * Opens the action menu.
     */
    menuOpen: boolean;
    /**
     * Shows a back button in the header.
     */
    showBackButton: boolean;
    /**
     * Summary text. A description displayed underneath the heading.
     */
    summary?: string;
    /**
     * 'Back' text string.
     */
    intlBack?: string;
    /**
     * 'Back' text string.
     * @deprecated use "intlBack" instead.
     */
    textBack?: string;
    /**
     * 'Close' text string for the close button. The close button will only be shown when 'dismissible' is true.
     */
    intlClose?: string;
    /**
     * 'Close' text string for the menu.
     * @deprecated use "intlClose" instead.
     */
    textClose?: string;
    /**
     * 'Open' text string for the menu.
     */
    intlOpen?: string;
    /**
     * 'Open' text string for the menu.
     * @deprecated use "intlOpen" instead.
     */
    textOpen?: string;
    /**
     * Used to set the component's color scheme.
     */
    theme: CalciteTheme;
    /**
     * Emitted when the back button has been clicked.
     */
    calciteFlowItemBackClick: EventEmitter;
    /**
     * Emitted when the content has been scrolled.
     */
    calciteFlowItemScroll: EventEmitter;
    el: HTMLCalciteFlowItemElement;
    handleCalcitePanelScroll(event: CustomEvent): void;
    queryActions(): HTMLCalciteActionElement[];
    isValidKey(key: string, supportedKeys: string[]): boolean;
    toggleMenuOpen: () => void;
    backButtonClick: () => void;
    menuButtonKeyDown: (event: KeyboardEvent) => void;
    menuActionsKeydown: (event: KeyboardEvent) => void;
    menuActionsContainerKeyDown: (event: KeyboardEvent) => void;
    renderBackButton(rtl: boolean): VNode;
    renderMenuButton(): VNode;
    renderMenuActions(): VNode;
    renderFooterActions(): VNode;
    renderSingleActionContainer(): VNode;
    renderMenuActionsContainer(): VNode;
    renderHeaderActions(): VNode;
    renderHeading(): VNode;
    renderSummary(): VNode;
    renderHeader(): VNode;
    renderFab(): VNode;
    render(): VNode;
}
