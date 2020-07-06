/// <reference types="lodash" />
import { EventEmitter, VNode } from "../stencil-public-runtime";
export declare class CalciteFilter {
    /**
     * The input data. The filter uses this as the starting point, and returns items
     * that contain the string entered in the input, using a partial match and recursive search.
     */
    data: object[];
    /**
     * A text label that will appear on the clear button.
     */
    intlClear?: string;
    /**
     * A text label that will appear next to the input field.
     */
    intlLabel?: string;
    /**
     * Placeholder text for the input element's placeholder attribute
     */
    placeholder?: string;
    /**
     * A text label that will appear next to the input field.
     *
     * @deprecated use "intlLabel" instead.
     */
    textLabel?: string;
    /**
     * Placeholder text for the input element's placeholder attribute
     *
     * @deprecated use "placeholder" instead.
     */
    textPlaceholder?: string;
    el: HTMLCalciteFilterElement;
    empty: boolean;
    textInput: HTMLInputElement;
    calciteFilterChange: EventEmitter;
    filter: ((value: string) => void) & import("lodash").Cancelable;
    inputHandler: (event: Event) => void;
    clear: () => void;
    render(): VNode;
}
