import { EventEmitter, VNode } from "../stencil-public-runtime";
import { CalciteTheme } from "../interfaces";
/**
 * @slot - A slot for adding `calcite-tip`s.
 */
export declare class CalciteTipManager {
    /**
     * Alternate text for closing the `calcite-tip-manager`.
     */
    closed: boolean;
    closedChangeHandler(): void;
    /**
     * Alternate text for closing the tip.
     */
    intlClose?: string;
    /**
     * Alternate text for closing the tip.
     * @deprecated use "intlClose" instead.
     */
    textClose?: string;
    /**
     * The default group title for the `calcite-tip-manager`.
     */
    intlDefaultTitle?: string;
    /**
     * The default group title for the `calcite-tip-manager`.
     * @deprecated use "intlDefaultTitle" instead.
     */
    textDefaultTitle?: string;
    /**
     * Alternate text for navigating to the next tip.
     */
    intlNext?: string;
    /**
     * Alternate text for navigating to the next tip.
     * @deprecated use "intlNext" instead.
     */
    textNext?: string;
    /**
     * Label that appears on hover of pagination icon.
     */
    intlPaginationLabel?: string;
    /**
     * Label that appears on hover of pagination icon.
     * @deprecated use "intlPaginationLabel" instead.
     */
    textPaginationLabel?: string;
    /**
     * Alternate text for navigating to the previous tip.
     */
    intlPrevious?: string;
    /**
     * Alternate text for navigating to the previous tip.
     * @deprecated use "intlPrevious" instead.
     */
    textPrevious?: string;
    /**
     * Used to set the component's color scheme.
     */
    theme: CalciteTheme;
    el: HTMLCalciteTipManagerElement;
    selectedIndex: number;
    selectedChangeHandler(): void;
    tips: HTMLCalciteTipElement[];
    total: number;
    direction: "advancing" | "retreating";
    groupTitle: string;
    observer: MutationObserver;
    container: HTMLDivElement;
    connectedCallback(): void;
    componentDidUnload(): void;
    nextTip(): Promise<void>;
    previousTip(): Promise<void>;
    /**
     * Emitted when the `calcite-tip-manager` has been toggled open or closed.
     */
    calciteTipManagerToggle: EventEmitter;
    setUpTips(): void;
    hideTipManager: () => void;
    showSelectedTip(): void;
    updateGroupTitle(): void;
    previousClicked: () => void;
    nextClicked: () => void;
    tipManagerKeyUpHandler: (event: KeyboardEvent) => void;
    storeContainerRef: (el: HTMLDivElement) => void;
    renderPagination(): VNode;
    render(): VNode;
}
