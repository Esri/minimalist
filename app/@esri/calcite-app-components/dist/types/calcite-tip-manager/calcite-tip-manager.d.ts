import { EventEmitter } from "../stencil-public-runtime";
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
     * Alternate text for closing the `calcite-tip-manager`.
     */
    textClose: string;
    /**
     * The default group title for the `calcite-tip-manager`.
     */
    textDefaultTitle: string;
    /**
     * Alternate text for navigating to the next tip.
     */
    textNext: string;
    /**
     * Label that appears on hover of pagination icon.
     */
    textPaginationLabel: string;
    /**
     * Alternate text for navigating to the previous tip.
     */
    textPrevious: string;
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
    componentDidLoad(): void;
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
    renderPagination(): any;
    render(): any;
}
