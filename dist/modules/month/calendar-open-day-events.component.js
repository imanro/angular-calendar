import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { trackByEventId } from '../common/util';
var CalendarOpenDayEventsComponent = /** @class */ (function () {
    function CalendarOpenDayEventsComponent() {
        this.isOpen = false;
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
    }
    CalendarOpenDayEventsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-open-day-events',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-events=\"events\"\n      let-eventClicked=\"eventClicked\">\n      <div\n        *ngFor=\"let event of events; trackBy:trackByEventId\"\n        [ngClass]=\"event?.cssClass\"\n        mwlDraggable\n        [dropData]=\"{event: event}\"\n        [dragAxis]=\"{x: event.draggable, y: event.draggable}\">\n        <span\n          class=\"cal-event\"\n          [style.backgroundColor]=\"event.color?.primary\">\n        </span>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"month\"\n          (mwlClick)=\"eventClicked.emit({event: event})\">\n        </mwl-calendar-event-title>\n        &ngsp;\n        <mwl-calendar-event-actions [event]=\"event\"></mwl-calendar-event-actions>\n      </div>\n    </ng-template>\n    <div class=\"cal-open-day-events\" [@collapse] *ngIf=\"isOpen\">\n      <ng-template\n        [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n        [ngTemplateOutletContext]=\"{\n          events: events,\n          eventClicked: eventClicked\n        }\">\n      </ng-template>\n    </div>\n  ",
                    animations: [
                        trigger('collapse', [
                            transition('void => *', [
                                style({ height: 0, overflow: 'hidden' }),
                                animate('150ms', style({ height: '*' }))
                            ]),
                            transition('* => void', [
                                style({ height: '*', overflow: 'hidden' }),
                                animate('150ms', style({ height: 0 }))
                            ])
                        ])
                    ]
                },] },
    ];
    CalendarOpenDayEventsComponent.propDecorators = {
        isOpen: [{ type: Input }],
        events: [{ type: Input }],
        customTemplate: [{ type: Input }],
        eventTitleTemplate: [{ type: Input }],
        eventClicked: [{ type: Output }]
    };
    return CalendarOpenDayEventsComponent;
}());
export { CalendarOpenDayEventsComponent };
//# sourceMappingURL=calendar-open-day-events.component.js.map