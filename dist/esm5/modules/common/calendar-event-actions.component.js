/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { trackByIndex } from './util';
var CalendarEventActionsComponent = /** @class */ (function () {
    function CalendarEventActionsComponent() {
        this.trackByIndex = trackByIndex;
    }
    CalendarEventActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-event-actions',
                    template: "\n    <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n      <a\n        class=\"cal-event-action\"\n        href=\"javascript:;\"\n        *ngFor=\"let action of event.actions; trackBy:trackByIndex\"\n        (mwlClick)=\"action.onClick({event: event})\"\n        [ngClass]=\"action.cssClass\"\n        [innerHtml]=\"action.label\">\n      </a>\n    </span>\n  "
                },] },
    ];
    CalendarEventActionsComponent.propDecorators = {
        event: [{ type: Input }]
    };
    return CalendarEventActionsComponent;
}());
export { CalendarEventActionsComponent };
function CalendarEventActionsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CalendarEventActionsComponent.prototype.event;
    /** @type {?} */
    CalendarEventActionsComponent.prototype.trackByIndex;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs0QkFtQnJCLFlBQVk7OztnQkFqQjVCLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUUsdVhBV1Q7aUJBQ0Y7Ozt3QkFFRSxLQUFLOzt3Q0FwQlI7O1NBbUJhLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyB0cmFja0J5SW5kZXggfSBmcm9tICcuL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gKm5nSWY9XCJldmVudC5hY3Rpb25zXCIgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uc1wiPlxuICAgICAgPGFcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uXCJcbiAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6O1wiXG4gICAgICAgICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgZXZlbnQuYWN0aW9uczsgdHJhY2tCeTp0cmFja0J5SW5kZXhcIlxuICAgICAgICAobXdsQ2xpY2spPVwiYWN0aW9uLm9uQ2xpY2soe2V2ZW50OiBldmVudH0pXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiYWN0aW9uLmNzc0NsYXNzXCJcbiAgICAgICAgW2lubmVySHRtbF09XCJhY3Rpb24ubGFiZWxcIj5cbiAgICAgIDwvYT5cbiAgICA8L3NwYW4+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQge1xuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgdHJhY2tCeUluZGV4ID0gdHJhY2tCeUluZGV4O1xufVxuIl19