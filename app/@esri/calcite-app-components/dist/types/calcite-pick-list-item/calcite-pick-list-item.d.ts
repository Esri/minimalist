import { EventEmitter, VNode } from "../stencil-public-runtime";
import { ICON_TYPES } from "../calcite-pick-list/resources";
/**
 * @slot secondary-action - A slot intended for adding a `calcite-action` or `calcite-button` to the right side of the card.
 * This is placed at the end of the item.
 */
export declare class CalcitePickListItem {
    /**
     * Compact removes the selection icon (radio or checkbox) and adds a compact attribute.
     * This allows for a more compact version of the `calcite-pick-list-item`.
     *
     * @deprecated This property will be removed in a future release.
     */
    compact?: boolean;
    /**
     * When true, the item cannot be clicked and is visually muted.
     */
    disabled?: boolean;
    /**
     * When false, the item cannot be deselected by user interaction.
     */
    disableDeselect: boolean;
    /**
     * Determines the icon SVG symbol that will be shown. Options are circle, square, grid or null.
     */
    icon?: ICON_TYPES | null;
    /**
     * Used to provide additional metadata to an item, primarily used when the parent list has a filter.
     */
    metadata?: object;
    metadataWatchHandler(): void;
    /**
     * Set this to true to display a remove action that removes the item from the list.
     */
    removable?: boolean;
    /**
     * Set this to true to pre-select an item. Toggles when an item is checked/unchecked.
     */
    selected: boolean;
    selectedWatchHandler(): void;
    /**
     * An optional description for this item.  This will appear below the label text.
     */
    textDescription?: string;
    textDescriptionWatchHandler(): void;
    /**
     * The main label for this item. This will appear next to the icon.
     */
    textLabel: string;
    textLabelWatchHandler(): void;
    /**
     * The text for the remove item buttons. Only applicable if removable is true.
     */
    textRemove: string;
    /**
     * A unique value used to identify this item - similar to the value attribute on an <input>.
     */
    value: string;
    valueWatchHandler(newValue: string, oldValue: string): void;
    el: HTMLCalcitePickListItemElement;
    private focusEl;
    shiftPressed: boolean;
    /**
     * Emitted whenever the item is selected or unselected.
     * @event calciteListItemChange
     */
    calciteListItemChange: EventEmitter<{
        item: HTMLCalcitePickListItemElement;
        value: string;
        selected: boolean;
        shiftPressed: boolean;
    }>;
    /**
     * Emitted whenever the remove button is pressed.
     * @event calciteListItemRemove
     */
    calciteListItemRemove: EventEmitter<void>;
    /**
     * Emitted whenever the the item's textLabel, textDescription, value or metadata properties are modified.
     * @event calciteListItemPropsChange
     * @internal
     */
    calciteListItemPropsChange: EventEmitter<void>;
    /**
     * Emitted whenever the the item's value property is modified.
     * @event calciteListItemValueChange
     * @internal
     */
    calciteListItemValueChange: EventEmitter<{
        oldValue: string;
        newValue: string;
    }>;
    /**
     * Used to toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     */
    toggleSelected(coerce?: boolean): Promise<void>;
    setFocus(): Promise<void>;
    pickListClickHandler: (event: MouseEvent) => void;
    pickListKeyDownHandler: (event: KeyboardEvent) => void;
    removeClickHandler: () => void;
    renderIcon(): VNode;
    renderRemoveAction(): VNode;
    renderSecondaryAction(): VNode;
    render(): VNode;
}
