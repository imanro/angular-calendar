/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
import { CalendarEventTitleFormatter } from './calendar-event-title-formatter.provider';
export class CalendarEventTitlePipe {
    /**
     * @param {?} calendarEventTitle
     */
    constructor(calendarEventTitle) {
        this.calendarEventTitle = calendarEventTitle;
    }
    /**
     * @param {?} title
     * @param {?} titleType
     * @param {?} event
     * @return {?}
     */
    transform(title, titleType, event) {
        return this.calendarEventTitle[titleType](event);
    }
}
CalendarEventTitlePipe.decorators = [
    { type: Pipe, args: [{
                name: 'calendarEventTitle'
            },] },
];
/** @nocollapse */
CalendarEventTitlePipe.ctorParameters = () => [
    { type: CalendarEventTitleFormatter }
];
function CalendarEventTitlePipe_tsickle_Closure_declarations() {
    /** @type {?} */
    CalendarEventTitlePipe.prototype.calendarEventTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXItaW1hbnJvLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFcEQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFLeEYsTUFBTTs7OztJQUNKLFlBQW9CLGtCQUErQztRQUEvQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTZCO0tBQUk7Ozs7Ozs7SUFFdkUsU0FBUyxDQUFDLEtBQWEsRUFBRSxTQUFpQixFQUFFLEtBQW9CO1FBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEQ7OztZQVJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsb0JBQW9CO2FBQzNCOzs7O1lBSlEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY2FsZW5kYXJFdmVudFRpdGxlJ1xufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50VGl0bGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXJFdmVudFRpdGxlOiBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIpIHt9XG5cbiAgdHJhbnNmb3JtKHRpdGxlOiBzdHJpbmcsIHRpdGxlVHlwZTogc3RyaW5nLCBldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY2FsZW5kYXJFdmVudFRpdGxlW3RpdGxlVHlwZV0oZXZlbnQpO1xuICB9XG59XG4iXX0=