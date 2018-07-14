/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The parameter type passed to the date formatter methods.
 * @record
 */
export function DateFormatterParams() { }
function DateFormatterParams_tsickle_Closure_declarations() {
    /**
     * The date to format.
     * @type {?}
     */
    DateFormatterParams.prototype.date;
    /**
     * The users preferred locale.
     * @type {?|undefined}
     */
    DateFormatterParams.prototype.locale;
}
/**
 * If using a completely custom date formatter then it should implement this interface.
 * @record
 */
export function CalendarDateFormatterInterface() { }
function CalendarDateFormatterInterface_tsickle_Closure_declarations() {
    /**
     * The month view header week day labels
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.monthViewColumnHeader;
    /**
     * The month view cell day number
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.monthViewDayNumber;
    /**
     * The month view title
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.monthViewTitle;
    /**
     * The week view header week day labels
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.weekViewColumnHeader;
    /**
     * The week view sub header day and month labels
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.weekViewColumnSubHeader;
    /**
     * The week view title
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.weekViewTitle;
    /**
     * The time formatting down the left hand side of the day view
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.dayViewHour;
    /**
     * The day view title
     * @type {?}
     */
    CalendarDateFormatterInterface.prototype.dayViewTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci1pbWFucm8vIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIHBhcmFtZXRlciB0eXBlIHBhc3NlZCB0byB0aGUgZGF0ZSBmb3JtYXR0ZXIgbWV0aG9kcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEYXRlRm9ybWF0dGVyUGFyYW1zIHtcbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRvIGZvcm1hdC5cbiAgICovXG4gIGRhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSB1c2VycyBwcmVmZXJyZWQgbG9jYWxlLlxuICAgKi9cbiAgbG9jYWxlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIElmIHVzaW5nIGEgY29tcGxldGVseSBjdXN0b20gZGF0ZSBmb3JtYXR0ZXIgdGhlbiBpdCBzaG91bGQgaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyBoZWFkZXIgd2VlayBkYXkgbGFiZWxzXG4gICAqL1xuICBtb250aFZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlOiBEYXRlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGNlbGwgZGF5IG51bWJlclxuICAgKi9cbiAgbW9udGhWaWV3RGF5TnVtYmVyKHsgZGF0ZTogRGF0ZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbW9udGggdmlldyB0aXRsZVxuICAgKi9cbiAgbW9udGhWaWV3VGl0bGUoeyBkYXRlOiBEYXRlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xuICAgKi9cbiAgd2Vla1ZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlOiBEYXRlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgc3ViIGhlYWRlciBkYXkgYW5kIG1vbnRoIGxhYmVsc1xuICAgKi9cbiAgd2Vla1ZpZXdDb2x1bW5TdWJIZWFkZXIoeyBkYXRlOiBEYXRlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgdGl0bGVcbiAgICovXG4gIHdlZWtWaWV3VGl0bGUoeyBkYXRlOiBEYXRlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIGZvcm1hdHRpbmcgZG93biB0aGUgbGVmdCBoYW5kIHNpZGUgb2YgdGhlIGRheSB2aWV3XG4gICAqL1xuICBkYXlWaWV3SG91cih7IGRhdGU6IERhdGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGRheSB2aWV3IHRpdGxlXG4gICAqL1xuICBkYXlWaWV3VGl0bGUoeyBkYXRlOiBEYXRlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmc7XG59XG4iXX0=