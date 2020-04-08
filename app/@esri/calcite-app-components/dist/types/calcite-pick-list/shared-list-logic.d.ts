import { CalcitePickList } from "./calcite-pick-list";
import { CalciteValueList } from "../calcite-value-list/calcite-value-list";
declare type pickOrValueListItem = HTMLCalcitePickListItemElement | HTMLCalciteValueListItemElement;
export declare const sharedListMethods: {
    mutationObserverCallback(this: CalcitePickList | CalciteValueList): void;
    initialize(this: CalcitePickList | CalciteValueList): void;
    initializeObserver(this: CalcitePickList | CalciteValueList): void;
    cleanUpObserver(this: CalcitePickList | CalciteValueList): void;
    calciteListItemChangeHandler(this: CalcitePickList | CalciteValueList, event: CustomEvent<any>): void;
    calciteListItemValueChangeHandler(this: CalcitePickList | CalciteValueList, event: CustomEvent<any>): void;
    internalCalciteListChangeEvent(this: CalcitePickList | CalciteValueList): void;
    setUpItems(this: CalcitePickList | CalciteValueList, tagname: "calcite-pick-list-item" | "calcite-value-list-item"): void;
    setUpFilter(this: CalcitePickList | CalciteValueList): void;
    deselectSiblingItems(this: CalcitePickList | CalciteValueList, item: pickOrValueListItem): void;
    selectSiblings(this: CalcitePickList | CalciteValueList, item: pickOrValueListItem, deselect?: boolean): void;
    handleFilter(this: CalcitePickList | CalciteValueList, event: CustomEvent<any>): void;
    getItemData(this: CalcitePickList | CalciteValueList): Record<string, string | object>[];
};
export {};
