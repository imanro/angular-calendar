/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trackByEventId } from '../common/util';
export class CalendarMonthCellComponent {
    constructor() {
        this.highlightDay = new EventEmitter();
        this.unhighlightDay = new EventEmitter();
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
    }
}
CalendarMonthCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-month-cell',
                template: `
    <ng-template
      #defaultTemplate
      let-day="day"
      let-openDay="openDay"
      let-locale="locale"
      let-tooltipPlacement="tooltipPlacement"
      let-highlightDay="highlightDay"
      let-unhighlightDay="unhighlightDay"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody">
      <div class="cal-cell-top">
        <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
        <span class="cal-day-number">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>
      </div>
      <div class="cal-events" *ngIf="day.events.length > 0">
        <div
          class="cal-event"
          *ngFor="let event of day.events; trackBy:trackByEventId"
          [style.backgroundColor]="event.color?.primary"
          [ngClass]="event?.cssClass"
          (mouseenter)="highlightDay.emit({event: event})"
          (mouseleave)="unhighlightDay.emit({event: event})"
          [mwlCalendarTooltip]="event.title | calendarEventTitle:'monthTooltip':event"
          [tooltipPlacement]="tooltipPlacement"
          [tooltipEvent]="event"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipAppendToBody]="tooltipAppendToBody"
          mwlDraggable
          [dropData]="{event: event}"
          [dragAxis]="{x: event.draggable, y: event.draggable}"
          (mwlClick)="eventClicked.emit({ event: event })">
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        day: day,
        openDay: openDay,
        locale: locale,
        tooltipPlacement: tooltipPlacement,
        highlightDay: highlightDay,
        unhighlightDay: unhighlightDay,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody
      }">
    </ng-template>
  `,
                host: {
                    class: 'cal-cell cal-day-cell',
                    '[class.cal-past]': 'day.isPast',
                    '[class.cal-today]': 'day.isToday',
                    '[class.cal-future]': 'day.isFuture',
                    '[class.cal-weekend]': 'day.isWeekend',
                    '[class.cal-in-month]': 'day.inMonth',
                    '[class.cal-out-month]': '!day.inMonth',
                    '[class.cal-has-events]': 'day.events.length > 0',
                    '[class.cal-open]': 'day === openDay',
                    '[style.backgroundColor]': 'day.backgroundColor'
                }
            },] },
];
CalendarMonthCellComponent.propDecorators = {
    day: [{ type: Input }],
    openDay: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    customTemplate: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    highlightDay: [{ type: Output }],
    unhighlightDay: [{ type: Output }],
    eventClicked: [{ type: Output }]
};
function CalendarMonthCellComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CalendarMonthCellComponent.prototype.day;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.openDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.locale;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipPlacement;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipAppendToBody;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.tooltipTemplate;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.highlightDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.unhighlightDay;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.eventClicked;
    /** @type {?} */
    CalendarMonthCellComponent.prototype.trackByEventId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBb0VoRCxNQUFNOzs0QkFld0MsSUFBSSxZQUFZLEVBQUU7OEJBRWhCLElBQUksWUFBWSxFQUFFOzRCQUdULElBQUksWUFBWSxFQUVuRTs4QkFFYSxjQUFjOzs7O1lBMUZoQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtEVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHVCQUF1QjtvQkFDOUIsa0JBQWtCLEVBQUUsWUFBWTtvQkFDaEMsbUJBQW1CLEVBQUUsYUFBYTtvQkFDbEMsb0JBQW9CLEVBQUUsY0FBYztvQkFDcEMscUJBQXFCLEVBQUUsZUFBZTtvQkFDdEMsc0JBQXNCLEVBQUUsYUFBYTtvQkFDckMsdUJBQXVCLEVBQUUsY0FBYztvQkFDdkMsd0JBQXdCLEVBQUUsdUJBQXVCO29CQUNqRCxrQkFBa0IsRUFBRSxpQkFBaUI7b0JBQ3JDLHlCQUF5QixFQUFFLHFCQUFxQjtpQkFDakQ7YUFDRjs7O2tCQUVFLEtBQUs7c0JBRUwsS0FBSztxQkFFTCxLQUFLOytCQUVMLEtBQUs7a0NBRUwsS0FBSzs2QkFFTCxLQUFLOzhCQUVMLEtBQUs7MkJBRUwsTUFBTTs2QkFFTixNQUFNOzJCQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb250aFZpZXdEYXksIENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheT1cImRheVwiXG4gICAgICBsZXQtb3BlbkRheT1cIm9wZW5EYXlcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWhpZ2hsaWdodERheT1cImhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtdW5oaWdobGlnaHREYXk9XCJ1bmhpZ2hsaWdodERheVwiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcbiAgICAgIGxldC10b29sdGlwVGVtcGxhdGU9XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgbGV0LXRvb2x0aXBBcHBlbmRUb0JvZHk9XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWNlbGwtdG9wXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1iYWRnZVwiICpuZ0lmPVwiZGF5LmJhZGdlVG90YWwgPiAwXCI+e3sgZGF5LmJhZGdlVG90YWwgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWRheS1udW1iZXJcIj57eyBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTonbW9udGhWaWV3RGF5TnVtYmVyJzpsb2NhbGUgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzXCIgKm5nSWY9XCJkYXkuZXZlbnRzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZGF5LmV2ZW50czsgdHJhY2tCeTp0cmFja0J5RXZlbnRJZFwiXG4gICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJldmVudC5jb2xvcj8ucHJpbWFyeVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiZXZlbnQ/LmNzc0NsYXNzXCJcbiAgICAgICAgICAobW91c2VlbnRlcik9XCJoaWdobGlnaHREYXkuZW1pdCh7ZXZlbnQ6IGV2ZW50fSlcIlxuICAgICAgICAgIChtb3VzZWxlYXZlKT1cInVuaGlnaGxpZ2h0RGF5LmVtaXQoe2V2ZW50OiBldmVudH0pXCJcbiAgICAgICAgICBbbXdsQ2FsZW5kYXJUb29sdGlwXT1cImV2ZW50LnRpdGxlIHwgY2FsZW5kYXJFdmVudFRpdGxlOidtb250aFRvb2x0aXAnOmV2ZW50XCJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICBbdG9vbHRpcEV2ZW50XT1cImV2ZW50XCJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgW2Ryb3BEYXRhXT1cIntldmVudDogZXZlbnR9XCJcbiAgICAgICAgICBbZHJhZ0F4aXNdPVwie3g6IGV2ZW50LmRyYWdnYWJsZSwgeTogZXZlbnQuZHJhZ2dhYmxlfVwiXG4gICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBkYXk6IGRheSxcbiAgICAgICAgb3BlbkRheTogb3BlbkRheSxcbiAgICAgICAgbG9jYWxlOiBsb2NhbGUsXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ6IHRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICAgIGhpZ2hsaWdodERheTogaGlnaGxpZ2h0RGF5LFxuICAgICAgICB1bmhpZ2hsaWdodERheTogdW5oaWdobGlnaHREYXksXG4gICAgICAgIGV2ZW50Q2xpY2tlZDogZXZlbnRDbGlja2VkLFxuICAgICAgICB0b29sdGlwVGVtcGxhdGU6IHRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgICAgdG9vbHRpcEFwcGVuZFRvQm9keTogdG9vbHRpcEFwcGVuZFRvQm9keVxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2NhbC1jZWxsIGNhbC1kYXktY2VsbCcsXG4gICAgJ1tjbGFzcy5jYWwtcGFzdF0nOiAnZGF5LmlzUGFzdCcsXG4gICAgJ1tjbGFzcy5jYWwtdG9kYXldJzogJ2RheS5pc1RvZGF5JyxcbiAgICAnW2NsYXNzLmNhbC1mdXR1cmVdJzogJ2RheS5pc0Z1dHVyZScsXG4gICAgJ1tjbGFzcy5jYWwtd2Vla2VuZF0nOiAnZGF5LmlzV2Vla2VuZCcsXG4gICAgJ1tjbGFzcy5jYWwtaW4tbW9udGhdJzogJ2RheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmNhbC1vdXQtbW9udGhdJzogJyFkYXkuaW5Nb250aCcsXG4gICAgJ1tjbGFzcy5jYWwtaGFzLWV2ZW50c10nOiAnZGF5LmV2ZW50cy5sZW5ndGggPiAwJyxcbiAgICAnW2NsYXNzLmNhbC1vcGVuXSc6ICdkYXkgPT09IG9wZW5EYXknLFxuICAgICdbc3R5bGUuYmFja2dyb3VuZENvbG9yXSc6ICdkYXkuYmFja2dyb3VuZENvbG9yJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KCkgb3BlbkRheTogTW9udGhWaWV3RGF5O1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgaGlnaGxpZ2h0RGF5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgdW5oaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgdHJhY2tCeUV2ZW50SWQgPSB0cmFja0J5RXZlbnRJZDtcbn1cbiJdfQ==