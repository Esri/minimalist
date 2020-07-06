import { EventEmitter } from "../../stencil-public-runtime";
export declare class CalciteDateMonthHeader {
    el: HTMLElement;
    /** Already selected date. */
    selectedDate: Date;
    /** Focused date with indicator (will become selected date if user proceeds) */
    activeDate: Date;
    /** Minimum date of the calendar below which is disabled. */
    min: Date;
    /** Maximum date of the calendar above which is disabled. */
    max: Date;
    /** User's language and region as BCP 47 formatted string. */
    locale: string;
    /** Localized string for previous month. */
    prevMonthLabel: string;
    /** Localized string for next month. */
    nextMonthLabel: string;
    /** specify the scale of the date picker */
    scale: "s" | "m" | "l";
    /**
     *  Changes to active date
     */
    calciteActiveDateChange: EventEmitter<Date>;
    render(): any;
    private yearInput;
    /**
     * Set active date to previous month (or min if out of range)
     */
    private selectPrevMonth;
    /**
     * Set active date to next month (or max if out of range)
     */
    private selectNextMonth;
    /**
     * Increment year on UP/DOWN keys
     */
    private onYearKey;
    /**
     * Parse localized year string from input,
     * set to active if in range
     */
    private setYear;
}
