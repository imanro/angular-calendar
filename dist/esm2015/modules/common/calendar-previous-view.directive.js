/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import subDays from 'date-fns/sub_days/index';
import subWeeks from 'date-fns/sub_weeks/index';
import subMonths from 'date-fns/sub_months/index';
/**
 * Change the view date to the previous view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarPreviousView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Previous
 * </button>
 * ```
 */
export class CalendarPreviousViewDirective {
    constructor() {
        /**
         * Called when the view date is changed
         */
        this.viewDateChange = new EventEmitter();
    }
    /**
     * @hidden
     * @return {?}
     */
    onClick() {
        const /** @type {?} */ subFn = {
            day: subDays,
            week: subWeeks,
            month: subMonths
        }[this.view];
        this.viewDateChange.emit(subFn(this.viewDate, 1));
    }
}
CalendarPreviousViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlCalendarPreviousView]'
            },] },
];
CalendarPreviousViewDirective.propDecorators = {
    view: [{ type: Input }],
    viewDate: [{ type: Input }],
    viewDateChange: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
function CalendarPreviousViewDirective_tsickle_Closure_declarations() {
    /**
     * The current view
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.view;
    /**
     * The current view date
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.viewDate;
    /**
     * Called when the view date is changed
     * @type {?}
     */
    CalendarPreviousViewDirective.prototype.viewDateChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcHJldmlvdXMtdmlldy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLWltYW5yby8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXByZXZpb3VzLXZpZXcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLE9BQU8sTUFBTSx5QkFBeUIsQ0FBQztBQUM5QyxPQUFPLFFBQVEsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRCxPQUFPLFNBQVMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQWlCbEQsTUFBTTs7Ozs7OEJBYzJDLElBQUksWUFBWSxFQUFFOzs7Ozs7SUFNakUsT0FBTztRQUNMLHVCQUFNLEtBQUssR0FBUTtZQUNqQixHQUFHLEVBQUUsT0FBTztZQUNaLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EOzs7WUEvQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7YUFDdEM7OzttQkFLRSxLQUFLO3VCQUtMLEtBQUs7NkJBS0wsTUFBTTtzQkFLTixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgc3ViRGF5cyBmcm9tICdkYXRlLWZucy9zdWJfZGF5cy9pbmRleCc7XG5pbXBvcnQgc3ViV2Vla3MgZnJvbSAnZGF0ZS1mbnMvc3ViX3dlZWtzL2luZGV4JztcbmltcG9ydCBzdWJNb250aHMgZnJvbSAnZGF0ZS1mbnMvc3ViX21vbnRocy9pbmRleCc7XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB2aWV3IGRhdGUgdG8gdGhlIHByZXZpb3VzIHZpZXcuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxidXR0b25cbiAqICBtd2xDYWxlbmRhclByZXZpb3VzVmlld1xuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcbiAqICBbdmlld109XCJ2aWV3XCI+XG4gKiAgUHJldmlvdXNcbiAqIDwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclByZXZpb3VzVmlld10nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHZpZXc6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IHN1YkZuOiBhbnkgPSB7XG4gICAgICBkYXk6IHN1YkRheXMsXG4gICAgICB3ZWVrOiBzdWJXZWVrcyxcbiAgICAgIG1vbnRoOiBzdWJNb250aHNcbiAgICB9W3RoaXMudmlld107XG5cbiAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoc3ViRm4odGhpcy52aWV3RGF0ZSwgMSkpO1xuICB9XG59XG4iXX0=