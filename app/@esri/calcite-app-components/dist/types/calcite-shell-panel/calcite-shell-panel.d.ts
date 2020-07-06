import { EventEmitter, VNode } from "../stencil-public-runtime";
import { CalciteLayout, CalcitePosition, CalciteScale } from "../interfaces";
/**
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the panel.
 * @slot - A slot for adding content to the shell panel.
 */
export declare class CalciteShellPanel {
    /**
     * Hide the content panel.
     */
    collapsed: boolean;
    watchHandler(): void;
    /**
     * This property makes the content area appear like a "floating" panel.
     */
    detached: boolean;
    /**
     * This sets limits the height of the content area. It only applies when detached is true.
     */
    detachedScale: CalciteScale;
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
     * Emitted when collapse has been toggled.
     */
    calciteShellPanelToggle: EventEmitter;
    render(): VNode;
}
