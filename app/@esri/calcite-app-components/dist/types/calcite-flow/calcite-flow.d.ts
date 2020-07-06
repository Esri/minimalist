import { VNode } from "../stencil-public-runtime";
import { CalciteTheme, FlowDirection } from "../interfaces";
/**
 * @slot - A slot for adding `calcite-flow-item`s to the flow.
 */
export declare class CalciteFlow {
    /**
     * Used to set the component's color scheme.
     */
    theme: CalciteTheme;
    /**
     * Removes the currently active `calcite-flow-item`.
     */
    back(): Promise<HTMLCalciteFlowItemElement>;
    el: HTMLCalciteFlowElement;
    flowCount: number;
    flowDirection: FlowDirection;
    flows: HTMLCalciteFlowItemElement[];
    connectedCallback(): void;
    componentDidUnload(): void;
    handleCalciteFlowItemBackClick(): void;
    getFlowDirection: (oldFlowCount: number, newFlowCount: number) => FlowDirection;
    updateFlowProps: () => void;
    flowItemObserver: MutationObserver;
    render(): VNode;
}
