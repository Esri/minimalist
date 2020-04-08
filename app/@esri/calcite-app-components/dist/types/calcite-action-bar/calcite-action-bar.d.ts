import { EventEmitter } from "../stencil-public-runtime";
import { CalciteLayout, CalcitePosition, CalciteTheme } from "../interfaces";
/**
 * @slot bottom-actions - A slot for adding `calcite-action`s that will appear at the bottom of the action bar, above the collapse/expand button.
 * @slot - A slot for adding `calcite-action`s that will appear at the top of the action bar.
 */
export declare class CalciteActionBar {
    /**
     * Indicates whether widget can be expanded.
     */
    expand: boolean;
    expandHandler(expand: boolean): void;
    /**
     * Indicates whether widget is expanded.
     */
    expanded: boolean;
    expandedHandler(expanded: boolean): void;
    /**
     * Updates the label of the expand icon when the component is not expanded.
     */
    textExpand: string;
    /**
     * Updates the label of the collapse icon when the component is expanded.
     */
    textCollapse: string;
    /**
     * @deprecated since 5.3 - use "position" instead.
     * Arrangement of the component. Leading and trailing are different depending on if the direction is LTR or RTL. For example, "leading"
     * in a LTR app will appear on the left.
     */
    layout: CalciteLayout;
    /**
     * Arranges the component depending on the elements 'dir' property.
     */
    position: CalcitePosition;
    /**
     * Used to set the component's color scheme.
     */
    theme: CalciteTheme;
    /**
     * Emitted when expanded has been toggled.
     */
    calciteActionBarToggle: EventEmitter;
    el: HTMLCalciteActionBarElement;
    componentWillLoad(): void;
    toggleExpand: () => void;
    renderBottomActionGroup(): any;
    render(): any;
}
