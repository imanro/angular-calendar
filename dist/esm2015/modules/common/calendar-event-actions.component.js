/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { trackByIndex } from './util';
export class CalendarEventActionsComponent {
    constructor() {
        this.trackByIndex = trackByIndex;
    }
}
CalendarEventActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-event-actions',
                template: `
    <span *ngIf="event.actions" class="cal-event-actions">
      <a
        class="cal-event-action"
        href="javascript:;"
        *ngFor="let action of event.actions; trackBy:trackByIndex"
        (mwlClick)="action.onClick({event: event})"
        [ngClass]="action.cssClass"
        [innerHtml]="action.label">
      </a>
    </span>
  `
            },] },
];
CalendarEventActionsComponent.propDecorators = {
    event: [{ type: Input }]
};
function CalendarEventActionsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CalendarEventActionsComponent.prototype.event;
    /** @type {?} */
    CalendarEventActionsComponent.prototype.trackByIndex;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFpQnRDLE1BQU07OzRCQUVXLFlBQVk7Ozs7WUFqQjVCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O0dBV1Q7YUFDRjs7O29CQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgdHJhY2tCeUluZGV4IH0gZnJvbSAnLi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzcGFuICpuZ0lmPVwiZXZlbnQuYWN0aW9uc1wiIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvbnNcIj5cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvblwiXG4gICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGV2ZW50LmFjdGlvbnM7IHRyYWNrQnk6dHJhY2tCeUluZGV4XCJcbiAgICAgICAgKG13bENsaWNrKT1cImFjdGlvbi5vbkNsaWNrKHtldmVudDogZXZlbnR9KVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImFjdGlvbi5jc3NDbGFzc1wiXG4gICAgICAgIFtpbm5lckh0bWxdPVwiYWN0aW9uLmxhYmVsXCI+XG4gICAgICA8L2E+XG4gICAgPC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnRBY3Rpb25zQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIHRyYWNrQnlJbmRleCA9IHRyYWNrQnlJbmRleDtcbn1cbiJdfQ==