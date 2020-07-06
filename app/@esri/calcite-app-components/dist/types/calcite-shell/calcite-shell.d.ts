import { VNode } from "../stencil-public-runtime";
import { CalciteTheme } from "../interfaces";
/**
 * @slot shell-header - A slot for adding header content. This content will be positioned at the top of the shell.
 * @slot shell-footer - A slot for adding footer content. This content will be positioned at the bottom of the shell.
 * @slot primary-panel - A slot for adding the leading `calcite-shell-panel`.
 * @slot contextual-panel - A slot for adding the trailing `calcite-shell-panel`.
 * @slot tip-manager - A slot for adding a `calcite-tip-manager`. This component will be absolutely positioned.
 * @slot - A slot for adding content to the shell. This content will appear between any leading and trailing panels added to the shell. (eg. a map)
 */
export declare class CalciteShell {
    /**
     * Used to set the component's color scheme.
     */
    theme: CalciteTheme;
    el: HTMLCalciteShellElement;
    renderHeader(): VNode;
    renderContent(): VNode;
    renderFooter(): VNode;
    renderMain(): VNode;
    render(): VNode;
}
