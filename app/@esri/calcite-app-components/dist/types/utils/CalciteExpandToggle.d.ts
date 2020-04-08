import { FunctionalComponent } from "../stencil-public-runtime";
import { CalcitePosition } from "../interfaces";
interface CalciteExpandToggleProps {
    expanded: boolean;
    textExpand: string;
    textCollapse: string;
    el: HTMLElement;
    position: CalcitePosition;
    toggleExpand: () => void;
}
export declare function toggleChildActionText({ parent, expanded }: {
    parent: HTMLElement;
    expanded: boolean;
}): void;
export declare const CalciteExpandToggle: FunctionalComponent<CalciteExpandToggleProps>;
export {};
