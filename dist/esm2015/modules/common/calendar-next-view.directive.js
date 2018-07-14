/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import addDays from 'date-fns/add_days/index';
import addWeeks from 'date-fns/add_weeks/index';
import addMonths from 'date-fns/add_months/index';
/**
 * Change the view date to the next view. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarNextView
 *  [(viewDate)]="viewDate"
 *  [view]="view">
 *  Next
 * </button>
 * ```
 */
export class CalendarNextViewDirective {
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
        const /** @type {?} */ addFn = {
            day: addDays,
            week: addWeeks,
            month: addMonths
        }[this.view];
        this.viewDateChange.emit(addFn(this.viewDate, 1));
    }
}
CalendarNextViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlCalendarNextView]'
            },] },
];
CalendarNextViewDirective.propDecorators = {
    view: [{ type: Input }],
    viewDate: [{ type: Input }],
    viewDateChange: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
function CalendarNextViewDirective_tsickle_Closure_declarations() {
    /**
     * The current view
     * @type {?}
     */
    CalendarNextViewDirective.prototype.view;
    /**
     * The current view date
     * @type {?}
     */
    CalendarNextViewDirective.prototype.viewDate;
    /**
     * Called when the view date is changed
     * @type {?}
     */
    CalendarNextViewDirective.prototype.viewDateChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbmV4dC12aWV3LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXItaW1hbnJvLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItbmV4dC12aWV3LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxPQUFPLE1BQU0seUJBQXlCLENBQUM7QUFDOUMsT0FBTyxRQUFRLE1BQU0sMEJBQTBCLENBQUM7QUFDaEQsT0FBTyxTQUFTLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFpQmxELE1BQU07Ozs7OzhCQWMyQyxJQUFJLFlBQVksRUFBRTs7Ozs7O0lBTWpFLE9BQU87UUFDTCx1QkFBTSxLQUFLLEdBQVE7WUFDakIsR0FBRyxFQUFFLE9BQU87WUFDWixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxTQUFTO1NBQ2pCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDs7O1lBL0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2FBQ2xDOzs7bUJBS0UsS0FBSzt1QkFLTCxLQUFLOzZCQUtMLE1BQU07c0JBS04sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGFkZERheXMgZnJvbSAnZGF0ZS1mbnMvYWRkX2RheXMvaW5kZXgnO1xuaW1wb3J0IGFkZFdlZWtzIGZyb20gJ2RhdGUtZm5zL2FkZF93ZWVrcy9pbmRleCc7XG5pbXBvcnQgYWRkTW9udGhzIGZyb20gJ2RhdGUtZm5zL2FkZF9tb250aHMvaW5kZXgnO1xuXG4vKipcbiAqIENoYW5nZSB0aGUgdmlldyBkYXRlIHRvIHRoZSBuZXh0IHZpZXcuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxidXR0b25cbiAqICBtd2xDYWxlbmRhck5leHRWaWV3XG4gKiAgWyh2aWV3RGF0ZSldPVwidmlld0RhdGVcIlxuICogIFt2aWV3XT1cInZpZXdcIj5cbiAqICBOZXh0XG4gKiA8L2J1dHRvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJOZXh0Vmlld10nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTmV4dFZpZXdEaXJlY3RpdmUge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlld1xuICAgKi9cbiAgQElucHV0KCkgdmlldzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgY29uc3QgYWRkRm46IGFueSA9IHtcbiAgICAgIGRheTogYWRkRGF5cyxcbiAgICAgIHdlZWs6IGFkZFdlZWtzLFxuICAgICAgbW9udGg6IGFkZE1vbnRoc1xuICAgIH1bdGhpcy52aWV3XTtcblxuICAgIHRoaXMudmlld0RhdGVDaGFuZ2UuZW1pdChhZGRGbih0aGlzLnZpZXdEYXRlLCAxKSk7XG4gIH1cbn1cbiJdfQ==