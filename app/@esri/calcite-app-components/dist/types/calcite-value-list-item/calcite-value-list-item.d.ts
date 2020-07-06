import { VNode } from "../stencil-public-runtime";
import { ICON_TYPES } from "../calcite-pick-list/resources";
/**
 * @slot secondary-action - A slot intended for adding a `calcite-action` or `calcite-button`. This is placed at the end of the item.
 */
export declare class CalciteValueListItem {
    /**
     * Compact reduces the size of the item.
     *
     * @deprecated This property will be removed in a future release.
     */
    compact?: boolean;
    /**
     * When true, the item cannot be clicked and is visually muted
     */
    disabled?: boolean;
    /**
     * @internal When false, the item cannot be deselected by user interaction.
     */
    disableDeselect: boolean;
    /**
     * @internal - stores the activated state of the drag handle.
     */
    handleActivated?: boolean;
    /**
     * Determines the icon SVG symbol that will be shown. Options are circle, square, grid or null.
     */
    icon?: ICON_TYPES | null;
    /**
     * Used to provide additional metadata to an item, primarily used when the parent list has a filter.
     */
    metadata?: object;
    /**
     * Set this to true to display a remove action that removes the item from the list.
     */
    removable: boolean;
    /**
     * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
     */
    selected: boolean;
    /**
     * The main label for this item. Appears next to the icon.
     */
    textLabel: string;
    /**
     * An optional description for this item. Will appear below the label text.
     */
    textDescription?: string;
    /**
     * A unique value used to identify this item - similar to the value attribute on an <input>.
     */
    value: string;
    el: HTMLCalciteValueListItemElement;
    pickListItem: HTMLCalcitePickListItemElement;
    guid: string;
    toggleSelected(coerce?: boolean): Promise<void>;
    setFocus(): Promise<void>;
    calciteListItemChangeHandler(event: CustomEvent): void;
    getPickListRef: (el: any) => HTMLCalcitePickListItemElement;
    handleKeyDown: (event: KeyboardEvent) => void;
    handleBlur: () => void;
    handleSelectChange: (event: CustomEvent<any>) => void;
    renderHandle(): VNode;
    render(): VNode;
}
