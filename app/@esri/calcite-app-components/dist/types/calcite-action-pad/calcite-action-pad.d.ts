import { EventEmitter, VNode } from "../stencil-public-runtime";
import { CalciteLayout, CalcitePosition, CalciteTheme } from "../interfaces";
/**
 * @slot - A slot for adding `calcite-action`s to the action pad.
 */
export declare class CalciteActionPad {
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
     * Used to set the tooltip for the expand toggle.
     */
    tooltipExpand?: HTMLCalciteTooltipElement;
    /**
     * Updates the label of the expand icon when the component is not expanded.
     * @deprecated use "intlExpand" instead.
     */
    textExpand?: string;
    /**
     * Updates the label of the expand icon when the component is not expanded.
     */
    intlExpand?: string;
    /**
     * Updates the label of the collapse icon when the component is expanded.
     * @deprecated use "intlCollapse" instead.
     */
    textCollapse?: string;
    /**
     * Updates the label of the collapse icon when the component is expanded.
     */
    intlCollapse?: string;
    /**
     * Arrangement of the component.
     *
     * @deprecated use "position" instead.
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
    calciteActionPadToggle: EventEmitter;
    el: HTMLCalciteActionBarElement;
    componentWillLoad(): void;
    toggleExpand: () => void;
    renderBottomActionGroup(): VNode;
    render(): VNode;
}
