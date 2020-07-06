import { FunctionalComponent } from "../stencil-public-runtime";
import { CalcitePosition } from "../interfaces";
interface CalciteExpandToggleProps {
    expanded: boolean;
    intlExpand: string;
    intlCollapse: string;
    el: HTMLElement;
    position: CalcitePosition;
    tooltipExpand?: HTMLCalciteTooltipElement;
    toggleExpand: () => void;
}
export declare function toggleChildActionText({ parent, expanded }: {
    parent: HTMLElement;
    expanded: boolean;
}): void;
export declare const CalciteExpandToggle: FunctionalComponent<CalciteExpandToggleProps>;
export {};
