import { validateEvents, getMonthView, getWeekViewHeader, getWeekView, getDayView, getDayViewHourGrid } from 'calendar-utils';
export { DAYS_OF_WEEK } from 'calendar-utils';
import { Component, Input, Directive, HostListener, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Inject, Renderer2, Output, EventEmitter, Pipe, LOCALE_ID, Injectable, InjectionToken, NgModule, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT, DatePipe, CommonModule } from '@angular/common';
import { Positioning } from 'positioning';
import subDays from 'date-fns/sub_days/index';
import subWeeks from 'date-fns/sub_weeks/index';
import subMonths from 'date-fns/sub_months/index';
import addDays from 'date-fns/add_days/index';
import addWeeks from 'date-fns/add_weeks/index';
import addMonths from 'date-fns/add_months/index';
import startOfToday from 'date-fns/start_of_today/index';
import getISOWeek from 'date-fns/get_iso_week/index';
import { DraggableHelper, DragAndDropModule } from 'angular-draggable-droppable';
import 'rxjs';
import isSameDay from 'date-fns/is_same_day/index';
import setDate from 'date-fns/set_date/index';
import setMonth from 'date-fns/set_month/index';
import setYear from 'date-fns/set_year/index';
import getDate from 'date-fns/get_date/index';
import getMonth from 'date-fns/get_month/index';
import getYear from 'date-fns/get_year/index';
import differenceInSeconds from 'date-fns/difference_in_seconds/index';
import addSeconds from 'date-fns/add_seconds/index';
import { trigger, style, transition, animate } from '@angular/animations';
import { ResizableModule } from 'angular-resizable-element';
import addMinutes from 'date-fns/add_minutes/index';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ validateEvents$1 = (events) => {
    const /** @type {?} */ warn = (...args) => console.warn('angular-calendar', ...args);
    return validateEvents(events, warn);
};
/**
 * @param {?} outer
 * @param {?} inner
 * @return {?}
 */
function isInside(outer, inner) {
    return (outer.left <= inner.left &&
        inner.left <= outer.right &&
        outer.left <= inner.right &&
        inner.right <= outer.right &&
        outer.top <= inner.top &&
        inner.top <= outer.bottom &&
        outer.top <= inner.bottom &&
        inner.bottom <= outer.bottom);
}
const /** @type {?} */ trackByEventId = (index, event) => event.id ? event.id : event;
const /** @type {?} */ trackByWeekDayHeaderDate = (index, day) => day.date.toISOString();
const /** @type {?} */ trackByIndex = (index) => index;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarEventActionsComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarEventTitleComponent {
}
CalendarEventTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-event-title',
                template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-view="view">
      <a
        class="cal-event-title"
        href="javascript:;"
        [innerHTML]="event.title | calendarEventTitle:view:event">
      </a>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }">
    </ng-template>
  `
            },] },
];
CalendarEventTitleComponent.propDecorators = {
    event: [{ type: Input }],
    customTemplate: [{ type: Input }],
    view: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarTooltipWindowComponent {
}
CalendarTooltipWindowComponent.decorators = [
    { type: Component, args: [{
                template: `
    <ng-template
      #defaultTemplate
      let-contents="contents"
      let-placement="placement"
      let-event="event">
      <div class="cal-tooltip" [ngClass]="'cal-tooltip-' + placement">
        <div class="cal-tooltip-arrow"></div>
        <div class="cal-tooltip-inner" [innerHtml]="contents"></div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        contents: contents,
        placement: placement,
        event: event
      }">
    </ng-template>
  `
            },] },
];
CalendarTooltipWindowComponent.propDecorators = {
    contents: [{ type: Input }],
    placement: [{ type: Input }],
    event: [{ type: Input }],
    customTemplate: [{ type: Input }]
};
class CalendarTooltipDirective {
    /**
     * @param {?} elementRef
     * @param {?} injector
     * @param {?} renderer
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} document
     */
    constructor(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
    //tslint:disable-line
    ) {
        this.elementRef = elementRef;
        this.injector = injector;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.document = document; //tslint:disable-line
        this.placement = 'top';
        this.positioning = new Positioning();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.hide();
    }
    /**
     * @return {?}
     */
    onMouseOver() {
        this.show();
    }
    /**
     * @return {?}
     */
    onMouseOut() {
        this.hide();
    }
    /**
     * @return {?}
     */
    show() {
        if (!this.tooltipRef && this.contents) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.placement = this.placement;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            if (this.appendToBody) {
                this.document.body.appendChild(this.tooltipRef.location.nativeElement);
            }
            requestAnimationFrame(() => {
                this.positionTooltip();
            });
        }
    }
    /**
     * @return {?}
     */
    hide() {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
    }
    /**
     * @return {?}
     */
    positionTooltip() {
        if (this.tooltipRef) {
            const /** @type {?} */ targetPosition = this.positioning.positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
            const /** @type {?} */ elm = this.tooltipRef.location.nativeElement
                .children[0];
            this.renderer.setStyle(elm, 'top', `${targetPosition.top}px`);
            this.renderer.setStyle(elm, 'left', `${targetPosition.left}px`);
        }
    }
}
CalendarTooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlCalendarTooltip]'
            },] },
];
/** @nocollapse */
CalendarTooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector },
    { type: Renderer2 },
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
CalendarTooltipDirective.propDecorators = {
    contents: [{ type: Input, args: ['mwlCalendarTooltip',] }],
    placement: [{ type: Input, args: ['tooltipPlacement',] }],
    customTemplate: [{ type: Input, args: ['tooltipTemplate',] }],
    event: [{ type: Input, args: ['tooltipEvent',] }],
    appendToBody: [{ type: Input, args: ['tooltipAppendToBody',] }],
    onMouseOver: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseOut: [{ type: HostListener, args: ['mouseleave',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
class CalendarPreviousViewDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
class CalendarNextViewDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Change the view date to the current day. For example:
 *
 * ```typescript
 * <button
 *  mwlCalendarToday
 *  [(viewDate)]="viewDate">
 *  Today
 * </button>
 * ```
 */
class CalendarTodayDirective {
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
        this.viewDateChange.emit(startOfToday());
    }
}
CalendarTodayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlCalendarToday]'
            },] },
];
CalendarTodayDirective.propDecorators = {
    viewDate: [{ type: Input }],
    viewDateChange: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
class CalendarAngularDateFormatter {
    /**
     * The month view header week day labels
     * @param {?} __0
     * @return {?}
     */
    monthViewColumnHeader({ date, locale }) {
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    }
    /**
     * The month view cell day number
     * @param {?} __0
     * @return {?}
     */
    monthViewDayNumber({ date, locale }) {
        return new DatePipe(locale).transform(date, 'd', null, locale);
    }
    /**
     * The month view title
     * @param {?} __0
     * @return {?}
     */
    monthViewTitle({ date, locale }) {
        return new DatePipe(locale).transform(date, 'MMMM y', null, locale);
    }
    /**
     * The week view header week day labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnHeader({ date, locale }) {
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    }
    /**
     * The week view sub header day and month labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnSubHeader({ date, locale }) {
        return new DatePipe(locale).transform(date, 'MMM d', null, locale);
    }
    /**
     * The week view title
     * @param {?} __0
     * @return {?}
     */
    weekViewTitle({ date, locale }) {
        const /** @type {?} */ year = new DatePipe(locale).transform(date, 'y', null, locale);
        const /** @type {?} */ weekNumber = getISOWeek(date);
        return `Week ${weekNumber} of ${year}`;
    }
    /**
     * The time formatting down the left hand side of the day view
     * @param {?} __0
     * @return {?}
     */
    dayViewHour({ date, locale }) {
        return new DatePipe(locale).transform(date, 'h a', null, locale);
    }
    /**
     * The day view title
     * @param {?} __0
     * @return {?}
     */
    dayViewTitle({ date, locale }) {
        return new DatePipe(locale).transform(date, 'EEEE, MMMM d, y', null, locale);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This class is responsible for all formatting of dates. There are 3 implementations available, the `CalendarAngularDateFormatter` (default) which uses the angular date pipe to format dates, the `CalendarNativeDateFormatter` which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
 *
 * If you wish, you may override any of the defaults via angulars DI. For example:
 *
 * ```typescript
 * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
 * import { DatePipe } from '\@angular/common';
 *
 * class CustomDateFormatter extends CalendarDateFormatter {
 *
 *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
 *     return new DatePipe(locale).transform(date, 'EEE', locale); // use short week days
 *   }
 *
 * }
 *
 * // in your component that uses the calendar
 * providers: [{
 *   provide: CalendarDateFormatter,
 *   useClass: CustomDateFormatter
 * }]
 * ```
 */
class CalendarDateFormatter extends CalendarAngularDateFormatter {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This pipe is primarily for rendering the current view title. Example usage:
 * ```typescript
 * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
 * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
 * ```
 */
class CalendarDatePipe {
    /**
     * @param {?} dateFormatter
     * @param {?} locale
     */
    constructor(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    /**
     * @param {?} date
     * @param {?} method
     * @param {?=} locale
     * @return {?}
     */
    transform(date, method, locale = this.locale) {
        return this.dateFormatter[method]({ date, locale });
    }
}
CalendarDatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'calendarDate'
            },] },
];
/** @nocollapse */
CalendarDatePipe.ctorParameters = () => [
    { type: CalendarDateFormatter },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
 *
 * ```typescript
 * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
 *
 * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
 *
 *   month(event: CalendarEvent): string {
 *     return `Custom prefix: ${event.title}`;
 *   }
 *
 * }
 *
 * // in your component
 * providers: [{
 *  provide: CalendarEventTitleFormatter,
 *  useClass: CustomEventTitleFormatter
 * }]
 * ```
 */
class CalendarEventTitleFormatter {
    /**
     * The month view event title.
     * @param {?} event
     * @return {?}
     */
    month(event) {
        return event.title;
    }
    /**
     * The month view event tooltip. Return a falsey value from this to disable the tooltip.
     * @param {?} event
     * @return {?}
     */
    monthTooltip(event) {
        return event.title;
    }
    /**
     * The week view event title.
     * @param {?} event
     * @return {?}
     */
    week(event) {
        return event.title;
    }
    /**
     * The week view event tooltip. Return a falsey value from this to disable the tooltip.
     * @param {?} event
     * @return {?}
     */
    weekTooltip(event) {
        return event.title;
    }
    /**
     * The day view event title.
     * @param {?} event
     * @return {?}
     */
    day(event) {
        return event.title;
    }
    /**
     * The day view event tooltip. Return a falsey value from this to disable the tooltip.
     * @param {?} event
     * @return {?}
     */
    dayTooltip(event) {
        return event.title;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarEventTitlePipe {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClickDirective {
    /**
     * @param {?} renderer
     * @param {?} elm
     */
    constructor(renderer, elm) {
        this.renderer = renderer;
        this.elm = elm;
        this.click = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ eventName = typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
            ? 'tap'
            : 'click';
        this.removeListener = this.renderer.listen(this.elm.nativeElement, eventName, event => {
            this.click.next(event);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeListener();
    }
}
ClickDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlClick]'
            },] },
];
/** @nocollapse */
ClickDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
ClickDirective.propDecorators = {
    click: [{ type: Output, args: ['mwlClick',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarUtils {
    /**
     * @param {?} args
     * @return {?}
     */
    getMonthView(args) {
        return getMonthView(args);
    }
    /**
     * @param {?} args
     * @return {?}
     */
    getWeekViewHeader(args) {
        return getWeekViewHeader(args);
    }
    /**
     * @param {?} args
     * @return {?}
     */
    getWeekView(args) {
        return getWeekView(args);
    }
    /**
     * @param {?} args
     * @return {?}
     */
    getDayView(args) {
        return getDayView(args);
    }
    /**
     * @param {?} args
     * @return {?}
     */
    getDayViewHourGrid(args) {
        return getDayViewHourGrid(args);
    }
}
CalendarUtils.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ MOMENT = new InjectionToken('Moment');
/**
 * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
 *
 * ```typescript
 * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
 * import moment from 'moment';
 *
 * // in your component
 * provide: [{
 *   provide: MOMENT, useValue: moment
 * }, {
 *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
 * }]
 *
 * ```
 */
class CalendarMomentDateFormatter {
    /**
     * @hidden
     * @param {?} moment
     */
    constructor(moment) {
        this.moment = moment;
    }
    /**
     * The month view header week day labels
     * @param {?} __0
     * @return {?}
     */
    monthViewColumnHeader({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    }
    /**
     * The month view cell day number
     * @param {?} __0
     * @return {?}
     */
    monthViewDayNumber({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('D');
    }
    /**
     * The month view title
     * @param {?} __0
     * @return {?}
     */
    monthViewTitle({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('MMMM YYYY');
    }
    /**
     * The week view header week day labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnHeader({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('dddd');
    }
    /**
     * The week view sub header day and month labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnSubHeader({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('D MMM');
    }
    /**
     * The week view title
     * @param {?} __0
     * @return {?}
     */
    weekViewTitle({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('[Week] W [of] YYYY');
    }
    /**
     * The time formatting down the left hand side of the day view
     * @param {?} __0
     * @return {?}
     */
    dayViewHour({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('ha');
    }
    /**
     * The day view title
     * @param {?} __0
     * @return {?}
     */
    dayViewTitle({ date, locale }) {
        return this.moment(date)
            .locale(locale)
            .format('dddd, D MMMM, YYYY');
    }
}
/** @nocollapse */
CalendarMomentDateFormatter.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [MOMENT,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
 *
 * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
 */
class CalendarNativeDateFormatter {
    /**
     * The month view header week day labels
     * @param {?} __0
     * @return {?}
     */
    monthViewColumnHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    }
    /**
     * The month view cell day number
     * @param {?} __0
     * @return {?}
     */
    monthViewDayNumber({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
    }
    /**
     * The month view title
     * @param {?} __0
     * @return {?}
     */
    monthViewTitle({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long'
        }).format(date);
    }
    /**
     * The week view header week day labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    }
    /**
     * The week view sub header day and month labels
     * @param {?} __0
     * @return {?}
     */
    weekViewColumnSubHeader({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short'
        }).format(date);
    }
    /**
     * The week view title
     * @param {?} __0
     * @return {?}
     */
    weekViewTitle({ date, locale }) {
        const /** @type {?} */ year = new Intl.DateTimeFormat(locale, {
            year: 'numeric'
        }).format(date);
        const /** @type {?} */ weekNumber = getISOWeek(date);
        return `Week ${weekNumber} of ${year}`;
    }
    /**
     * The time formatting down the left hand side of the day view
     * @param {?} __0
     * @return {?}
     */
    dayViewHour({ date, locale }) {
        return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
    }
    /**
     * The day view title
     * @param {?} __0
     * @return {?}
     */
    dayViewTitle({ date, locale }) {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        }).format(date);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
 *
 * ```typescript
 * import { CalendarCommonModule } from 'angular-calendar/modules/common';
 * import { CalendarMonthModule } from 'angular-calendar/modules/month';
 *
 * \@NgModule({
 *   imports: [
 *     CalendarCommonModule.forRoot(),
 *     CalendarMonthModule
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
class CalendarCommonModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: CalendarCommonModule,
            providers: [
                DraggableHelper,
                config.eventTitleFormatter || CalendarEventTitleFormatter,
                config.dateFormatter || CalendarDateFormatter,
                config.utils || CalendarUtils
            ]
        };
    }
}
CalendarCommonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    CalendarEventActionsComponent,
                    CalendarEventTitleComponent,
                    CalendarTooltipWindowComponent,
                    CalendarTooltipDirective,
                    CalendarPreviousViewDirective,
                    CalendarNextViewDirective,
                    CalendarTodayDirective,
                    CalendarDatePipe,
                    CalendarEventTitlePipe,
                    ClickDirective
                ],
                imports: [CommonModule],
                exports: [
                    CalendarEventActionsComponent,
                    CalendarEventTitleComponent,
                    CalendarTooltipWindowComponent,
                    CalendarTooltipDirective,
                    CalendarPreviousViewDirective,
                    CalendarNextViewDirective,
                    CalendarTodayDirective,
                    CalendarDatePipe,
                    CalendarEventTitlePipe,
                    ClickDirective
                ],
                entryComponents: [CalendarTooltipWindowComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * <mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-month-view>
 * ```
 */
class CalendarMonthViewComponent {
    /**
     * @hidden
     * @param {?} cdr
     * @param {?} utils
     * @param {?} locale
     */
    constructor(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        /**
         * An array of events to display on view.
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * An output that will be called before the view is rendered for the current month.
         * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * @hidden
         */
        this.trackByIndex = trackByIndex;
        /**
         * @hidden
         */
        this.trackByDate = (index, day) => day.date.toISOString();
        this.locale = locale;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents$1(this.events);
        }
        if (changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.weekendDays) {
            this.refreshBody();
        }
        if (changes.activeDayIsOpen ||
            changes.viewDate ||
            changes.events ||
            changes.excludeDays) {
            this.checkActiveDayIsOpen();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?} isHighlighted
     * @return {?}
     */
    toggleDayHighlight(event, isHighlighted) {
        this.view.days.forEach(day => {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor =
                    (event.color && event.color.secondary) || '#D1E8FF';
            }
            else {
                delete day.backgroundColor;
            }
        });
    }
    /**
     * @hidden
     * @param {?} day
     * @param {?} event
     * @return {?}
     */
    eventDropped(day, event) {
        const /** @type {?} */ year = getYear(day.date);
        const /** @type {?} */ month = getMonth(day.date);
        const /** @type {?} */ date = getDate(day.date);
        const /** @type {?} */ newStart = setDate(setMonth(setYear(event.start, year), month), date);
        let /** @type {?} */ newEnd;
        if (event.end) {
            const /** @type {?} */ secondsDiff = differenceInSeconds(newStart, event.start);
            newEnd = addSeconds(event.end, secondsDiff);
        }
        this.eventTimesChanged.emit({ event, newStart, newEnd, day });
    }
    /**
     * @hidden
     * @param {?} clickEvent
     * @param {?} day
     * @return {?}
     */
    handleDayClick(clickEvent, day) {
        // when using hammerjs, stopPropagation doesn't work. See https://github.com/mattlewis92/angular-calendar/issues/318
        if (!clickEvent.target.classList.contains('cal-event')) {
            this.dayClicked.emit({ day });
        }
    }
    /**
     * @return {?}
     */
    refreshHeader() {
        this.columnHeaders = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
        this.emitBeforeViewRender();
    }
    /**
     * @return {?}
     */
    refreshBody() {
        this.view = this.utils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
        this.emitBeforeViewRender();
    }
    /**
     * @return {?}
     */
    checkActiveDayIsOpen() {
        if (this.activeDayIsOpen === true) {
            this.openDay = this.view.days.find(day => isSameDay(day.date, this.viewDate));
            const /** @type {?} */ index = this.view.days.indexOf(this.openDay);
            this.openRowIndex =
                Math.floor(index / this.view.totalDaysVisibleInWeek) *
                    this.view.totalDaysVisibleInWeek;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    }
    /**
     * @return {?}
     */
    refreshAll() {
        this.columnHeaders = null;
        this.view = null;
        this.refreshHeader();
        this.refreshBody();
        this.checkActiveDayIsOpen();
    }
    /**
     * @return {?}
     */
    emitBeforeViewRender() {
        if (this.columnHeaders && this.view) {
            this.beforeViewRender.emit({
                header: this.columnHeaders,
                body: this.view.days,
                period: this.view.period
            });
        }
    }
}
CalendarMonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-month-view',
                template: `
    <div class="cal-month-view">
      <mwl-calendar-month-view-header
        [days]="columnHeaders"
        [locale]="locale"
        [customTemplate]="headerTemplate">
      </mwl-calendar-month-view-header>
      <div class="cal-days">
        <div *ngFor="let rowIndex of view.rowOffsets; trackByIndex">
          <div class="cal-cell-row">
            <mwl-calendar-month-cell
              *ngFor="let day of (view.days | slice : rowIndex : rowIndex + (view.totalDaysVisibleInWeek)); trackBy:trackByDate"
              [class.cal-drag-over]="day.dragOver"
              [ngClass]="day?.cssClass"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipTemplate]="tooltipTemplate"
              [customTemplate]="cellTemplate"
              (click)="handleDayClick($event, day)"
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              mwlDroppable
              (dragEnter)="day.dragOver = true"
              (dragLeave)="day.dragOver = false"
              (drop)="day.dragOver = false; eventDropped(day, $event.dropData.event)"
              (eventClicked)="eventClicked.emit({event: $event.event})">
            </mwl-calendar-month-cell>
          </div>
          <mwl-calendar-open-day-events
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            [customTemplate]="openDayEventsTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            (eventClicked)="eventClicked.emit({event: $event.event})">
          </mwl-calendar-open-day-events>
        </div>
      </div>
    </div>
  `
            },] },
];
/** @nocollapse */
CalendarMonthViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarMonthViewComponent.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    excludeDays: [{ type: Input }],
    activeDayIsOpen: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    weekStartsOn: [{ type: Input }],
    headerTemplate: [{ type: Input }],
    cellTemplate: [{ type: Input }],
    openDayEventsTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    weekendDays: [{ type: Input }],
    beforeViewRender: [{ type: Output }],
    dayClicked: [{ type: Output }],
    eventClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarMonthViewHeaderComponent {
    constructor() {
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
}
CalendarMonthViewHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-month-view-header',
                template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale">
      <div class="cal-cell-row cal-header">
        <div
          class="cal-cell"
          *ngFor="let day of days; trackBy:trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [ngClass]="day.cssClass">
          {{ day.date | calendarDate:'monthViewColumnHeader':locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{days: days, locale: locale}">
    </ng-template>
  `
            },] },
];
CalendarMonthViewHeaderComponent.propDecorators = {
    days: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarMonthCellComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarOpenDayEventsComponent {
    constructor() {
        this.isOpen = false;
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
    }
}
CalendarOpenDayEventsComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-open-day-events',
                template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked">
      <div
        *ngFor="let event of events; trackBy:trackByEventId"
        [ngClass]="event?.cssClass"
        mwlDraggable
        [dropData]="{event: event}"
        [dragAxis]="{x: event.draggable, y: event.draggable}">
        <span
          class="cal-event"
          [style.backgroundColor]="event.color?.primary">
        </span>
        &ngsp;
        <mwl-calendar-event-title
          [event]="event"
          [customTemplate]="eventTitleTemplate"
          view="month"
          (mwlClick)="eventClicked.emit({event: event})">
        </mwl-calendar-event-title>
        &ngsp;
        <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
      </div>
    </ng-template>
    <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
      <ng-template
        [ngTemplateOutlet]="customTemplate || defaultTemplate"
        [ngTemplateOutletContext]="{
          events: events,
          eventClicked: eventClicked
        }">
      </ng-template>
    </div>
  `,
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarMonthModule {
}
CalendarMonthModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, DragAndDropModule, CalendarCommonModule],
                declarations: [
                    CalendarMonthViewComponent,
                    CalendarMonthCellComponent,
                    CalendarOpenDayEventsComponent,
                    CalendarMonthViewHeaderComponent
                ],
                exports: [
                    DragAndDropModule,
                    CalendarMonthViewComponent,
                    CalendarMonthCellComponent,
                    CalendarOpenDayEventsComponent,
                    CalendarMonthViewHeaderComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarDragHelper {
    /**
     * @param {?} dragContainerElement
     * @param {?} draggableElement
     */
    constructor(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    validateDrag({ x, y }) {
        const /** @type {?} */ newRect = Object.assign({}, this.startPosition, {
            left: this.startPosition.left + x,
            right: this.startPosition.right + x,
            top: this.startPosition.top + y,
            bottom: this.startPosition.bottom + y
        });
        return isInside(this.dragContainerElement.getBoundingClientRect(), newRect);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarResizeHelper {
    /**
     * @param {?} resizeContainerElement
     * @param {?=} minWidth
     */
    constructor(resizeContainerElement, minWidth) {
        this.resizeContainerElement = resizeContainerElement;
        this.minWidth = minWidth;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    validateResize({ rectangle }) {
        if (this.minWidth && rectangle.width < this.minWidth) {
            return false;
        }
        return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-week-view>
 * ```
 */
class CalendarWeekViewComponent {
    /**
     * @hidden
     * @param {?} cdr
     * @param {?} utils
     * @param {?} locale
     */
    constructor(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'bottom';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
        /**
         * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
         */
        this.dayHeaderClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current week.
         * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * @hidden
         */
        this.currentResizes = new Map();
        /**
         * @hidden
         */
        this.trackByIndex = trackByIndex;
        /**
         * @hidden
         */
        this.trackByEventId = (index, weekEvent) => weekEvent.event.id ? weekEvent.event.id : weekEvent;
        this.locale = locale;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.viewDate || changes.excludeDays || changes.weekendDays) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents$1(this.events);
        }
        if (changes.events || changes.viewDate || changes.excludeDays) {
            this.refreshBody();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     * @param {?} weekViewContainer
     * @param {?} weekEvent
     * @param {?} resizeEvent
     * @return {?}
     */
    resizeStarted(weekViewContainer, weekEvent, resizeEvent) {
        this.currentResizes.set(weekEvent, {
            originalOffset: weekEvent.offset,
            originalSpan: weekEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
        });
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        const /** @type {?} */ resizeHelper = new CalendarResizeHelper(weekViewContainer, this.dayColumnWidth);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     * @param {?} weekEvent
     * @param {?} resizeEvent
     * @param {?} dayWidth
     * @return {?}
     */
    resizing(weekEvent, resizeEvent, dayWidth) {
        const /** @type {?} */ currentResize = this.currentResizes.get(weekEvent);
        if (resizeEvent.edges.left) {
            const /** @type {?} */ diff = Math.round(+resizeEvent.edges.left / dayWidth);
            weekEvent.offset = currentResize.originalOffset + diff;
            weekEvent.span = currentResize.originalSpan - diff;
        }
        else if (resizeEvent.edges.right) {
            const /** @type {?} */ diff = Math.round(+resizeEvent.edges.right / dayWidth);
            weekEvent.span = currentResize.originalSpan + diff;
        }
    }
    /**
     * @hidden
     * @param {?} weekEvent
     * @return {?}
     */
    resizeEnded(weekEvent) {
        const /** @type {?} */ currentResize = this.currentResizes.get(weekEvent);
        let /** @type {?} */ daysDiff;
        if (currentResize.edge === 'left') {
            daysDiff = weekEvent.offset - currentResize.originalOffset;
        }
        else {
            daysDiff = weekEvent.span - currentResize.originalSpan;
        }
        weekEvent.offset = currentResize.originalOffset;
        weekEvent.span = currentResize.originalSpan;
        let /** @type {?} */ newStart = weekEvent.event.start;
        let /** @type {?} */ newEnd = weekEvent.event.end;
        if (currentResize.edge === 'left') {
            newStart = addDays(newStart, daysDiff);
        }
        else if (newEnd) {
            newEnd = addDays(newEnd, daysDiff);
        }
        this.eventTimesChanged.emit({ newStart, newEnd, event: weekEvent.event });
        this.currentResizes.delete(weekEvent);
    }
    /**
     * @hidden
     * @param {?} weekEvent
     * @param {?} draggedByPx
     * @param {?} dayWidth
     * @return {?}
     */
    eventDragged(weekEvent, draggedByPx, dayWidth) {
        const /** @type {?} */ daysDragged = draggedByPx / dayWidth;
        const /** @type {?} */ newStart = addDays(weekEvent.event.start, daysDragged);
        let /** @type {?} */ newEnd;
        if (weekEvent.event.end) {
            newEnd = addDays(weekEvent.event.end, daysDragged);
        }
        this.eventTimesChanged.emit({ newStart, newEnd, event: weekEvent.event });
    }
    /**
     * @hidden
     * @param {?} eventRowContainer
     * @return {?}
     */
    getDayColumnWidth(eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    }
    /**
     * @hidden
     * @param {?} weekViewContainer
     * @param {?} event
     * @return {?}
     */
    dragStart(weekViewContainer, event) {
        this.dayColumnWidth = this.getDayColumnWidth(weekViewContainer);
        const /** @type {?} */ dragHelper = new CalendarDragHelper(weekViewContainer, event);
        this.validateDrag = ({ x, y }) => this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
        this.cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    refreshHeader() {
        this.days = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
        this.emitBeforeViewRender();
    }
    /**
     * @return {?}
     */
    refreshBody() {
        this.view = this.utils.getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            precision: this.precision,
            absolutePositionedEvents: true
        });
        this.emitBeforeViewRender();
    }
    /**
     * @return {?}
     */
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
    }
    /**
     * @return {?}
     */
    emitBeforeViewRender() {
        if (this.days && this.view) {
            this.beforeViewRender.emit({
                header: this.days,
                period: this.view.period
            });
        }
    }
}
CalendarWeekViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-week-view',
                template: `
    <div class="cal-week-view" #weekViewContainer>
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="eventTimesChanged.emit($event)">
      </mwl-calendar-week-view-header>
      <div *ngFor="let eventRow of view.eventRows; trackBy:trackByIndex" #eventRowContainer class="cal-events-row">
        before!!<div
          *ngFor="let weekEvent of eventRow.row; trackBy:trackByEventId"
          #event
          class="cal-event-container"
          [class.cal-draggable]="weekEvent.event.draggable"
          [class.cal-starts-within-week]="!weekEvent.startsBeforeWeek"
          [class.cal-ends-within-week]="!weekEvent.endsAfterWeek"
          [ngClass]="weekEvent.event?.cssClass"
          [style.width]="((100 / days.length) * weekEvent.span) + '%'"
          [style.marginLeft]="((100 / days.length) * weekEvent.offset) + '%'"
          mwlResizable
          [resizeEdges]="{left: weekEvent.event?.resizable?.beforeStart, right: weekEvent.event?.resizable?.afterEnd}"
          [resizeSnapGrid]="{left: dayColumnWidth, right: dayColumnWidth}"
          [validateResize]="validateResize"
          (resizeStart)="resizeStarted(weekViewContainer, weekEvent, $event)"
          (resizing)="resizing(weekEvent, $event, dayColumnWidth)"
          (resizeEnd)="resizeEnded(weekEvent)"
          mwlDraggable
          [dragAxis]="{x: weekEvent.event.draggable && currentResizes.size === 0, y: false}"
          [dragSnapGrid]="{x: dayColumnWidth}"
          [validateDrag]="validateDrag"
          (dragPointerDown)="dragStart(weekViewContainer, event)"
          (dragEnd)="eventDragged(weekEvent, $event.x, dayColumnWidth)">
          <mwl-calendar-week-view-event
            [weekEvent]="weekEvent"
            [tooltipPlacement]="tooltipPlacement"
            [tooltipTemplate]="tooltipTemplate"
            [tooltipAppendToBody]="tooltipAppendToBody"
            [customTemplate]="eventTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            (eventClicked)="eventClicked.emit({event: weekEvent.event})">
          </mwl-calendar-week-view-event>
        </div>
      </div>
    </div>
  `
            },] },
];
/** @nocollapse */
CalendarWeekViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarWeekViewComponent.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    excludeDays: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    weekStartsOn: [{ type: Input }],
    headerTemplate: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    precision: [{ type: Input }],
    weekendDays: [{ type: Input }],
    dayHeaderClicked: [{ type: Output }],
    eventClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }],
    beforeViewRender: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarWeekViewHeaderComponent {
    constructor() {
        this.dayHeaderClicked = new EventEmitter();
        this.eventDropped = new EventEmitter();
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
    }
}
CalendarWeekViewHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-week-view-header',
                template: `
    <ng-template
      #defaultTemplate
      let-days="days"
      let-locale="locale"
      let-dayHeaderClicked="dayHeaderClicked"
      let-eventDropped="eventDropped">
      <div class="cal-day-headers">
        <div
          class="cal-header"
          *ngFor="let day of days; trackBy:trackByWeekDayHeaderDate"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          [class.cal-drag-over]="day.dragOver"
          [ngClass]="day.cssClass"
          (mwlClick)="dayHeaderClicked.emit({day: day})"
          mwlDroppable
          (dragEnter)="day.dragOver = true"
          (dragLeave)="day.dragOver = false"
          (drop)="day.dragOver = false; eventDropped.emit({event: $event.dropData.event, newStart: day.date})">
          <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>
          <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{days: days, locale: locale, dayHeaderClicked: dayHeaderClicked, eventDropped: eventDropped}">
    </ng-template>
  `
            },] },
];
CalendarWeekViewHeaderComponent.propDecorators = {
    days: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }],
    dayHeaderClicked: [{ type: Output }],
    eventDropped: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarWeekViewEventComponent {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
CalendarWeekViewEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-week-view-event',
                template: `
    <ng-template
      #defaultTemplate
      let-weekEvent="weekEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody">
      <div
        class="cal-event"
        [style.backgroundColor]="weekEvent.event.color?.secondary"
        [style.borderColor]="weekEvent.event.color?.primary"
        [mwlCalendarTooltip]="weekEvent.event.title | calendarEventTitle:'weekTooltip':weekEvent.event"
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="weekEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody">
        <mwl-calendar-event-actions [event]="weekEvent.event"></mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="weekEvent.event"
          [customTemplate]="eventTitleTemplate"
          view="week"
          (mwlClick)="eventClicked.emit()">
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        weekEvent: weekEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody
      }">
    </ng-template>
  `
            },] },
];
CalendarWeekViewEventComponent.propDecorators = {
    weekEvent: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarWeekModule {
}
CalendarWeekModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizableModule,
                    DragAndDropModule,
                    CalendarCommonModule
                ],
                declarations: [
                    CalendarWeekViewComponent,
                    CalendarWeekViewHeaderComponent,
                    CalendarWeekViewEventComponent
                ],
                exports: [
                    ResizableModule,
                    DragAndDropModule,
                    CalendarWeekViewComponent,
                    CalendarWeekViewHeaderComponent,
                    CalendarWeekViewEventComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @hidden
 */
const /** @type {?} */ MINUTES_IN_HOUR = 60;
/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
class CalendarDayViewComponent {
    /**
     * @hidden
     * @param {?} cdr
     * @param {?} utils
     * @param {?} locale
     */
    constructor(cdr, utils, locale) {
        this.cdr = cdr;
        this.utils = utils;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * The grid size to snap resizing and dragging of events to
         */
        this.eventSnapSize = this.hourSegmentHeight;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'top';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current day.
         * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * @hidden
         */
        this.hours = [];
        /**
         * @hidden
         */
        this.width = 0;
        /**
         * @hidden
         */
        this.currentResizes = new Map();
        /**
         * @hidden
         */
        this.trackByEventId = trackByEventId;
        /**
         * @hidden
         */
        this.trackByDayEvent = (index, dayEvent) => dayEvent.event.id ? dayEvent.event.id : dayEvent.event;
        /**
         * @hidden
         */
        this.trackByHour = (index, hour) => hour.segments[0].date.toISOString();
        /**
         * @hidden
         */
        this.trackByHourSegment = (index, segment) => segment.date.toISOString();
        this.locale = locale;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments) {
            this.refreshHourGrid();
        }
        if (changes.events) {
            validateEvents$1(this.events);
        }
        if (changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth) {
            this.refreshView();
        }
    }
    /**
     * @param {?} dropEvent
     * @param {?} segment
     * @return {?}
     */
    eventDropped(dropEvent, segment) {
        if (dropEvent.dropData && dropEvent.dropData.event) {
            this.eventTimesChanged.emit({
                event: dropEvent.dropData.event,
                newStart: segment.date
            });
        }
    }
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @param {?} dayViewContainer
     * @return {?}
     */
    resizeStarted(event, resizeEvent, dayViewContainer) {
        this.currentResizes.set(event, {
            originalTop: event.top,
            originalHeight: event.height,
            edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        });
        const /** @type {?} */ resizeHelper = new CalendarResizeHelper(dayViewContainer);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @return {?}
     */
    resizing(event, resizeEvent) {
        const /** @type {?} */ currentResize = this.currentResizes.get(event);
        if (resizeEvent.edges.top) {
            event.top = currentResize.originalTop + +resizeEvent.edges.top;
            event.height = currentResize.originalHeight - +resizeEvent.edges.top;
        }
        else if (resizeEvent.edges.bottom) {
            event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
    }
    /**
     * @param {?} dayEvent
     * @return {?}
     */
    resizeEnded(dayEvent) {
        const /** @type {?} */ currentResize = this.currentResizes.get(dayEvent);
        let /** @type {?} */ pixelsMoved;
        if (currentResize.edge === 'top') {
            pixelsMoved = dayEvent.top - currentResize.originalTop;
        }
        else {
            pixelsMoved = dayEvent.height - currentResize.originalHeight;
        }
        dayEvent.top = currentResize.originalTop;
        dayEvent.height = currentResize.originalHeight;
        const /** @type {?} */ pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        const /** @type {?} */ minutesMoved = pixelsMoved * pixelAmountInMinutes;
        let /** @type {?} */ newStart = dayEvent.event.start;
        let /** @type {?} */ newEnd = dayEvent.event.end;
        if (currentResize.edge === 'top') {
            newStart = addMinutes(newStart, minutesMoved);
        }
        else if (newEnd) {
            newEnd = addMinutes(newEnd, minutesMoved);
        }
        this.eventTimesChanged.emit({ newStart, newEnd, event: dayEvent.event });
        this.currentResizes.delete(dayEvent);
    }
    /**
     * @param {?} event
     * @param {?} dayViewContainer
     * @return {?}
     */
    dragStart(event, dayViewContainer) {
        const /** @type {?} */ dragHelper = new CalendarDragHelper(dayViewContainer, event);
        this.validateDrag = ({ x, y }) => this.currentResizes.size === 0 && dragHelper.validateDrag({ x, y });
        this.cdr.markForCheck();
    }
    /**
     * @param {?} dayEvent
     * @param {?} draggedInPixels
     * @return {?}
     */
    eventDragged(dayEvent, draggedInPixels) {
        const /** @type {?} */ pixelAmountInMinutes = MINUTES_IN_HOUR / (this.hourSegments * this.hourSegmentHeight);
        const /** @type {?} */ minutesMoved = draggedInPixels * pixelAmountInMinutes;
        const /** @type {?} */ newStart = addMinutes(dayEvent.event.start, minutesMoved);
        let /** @type {?} */ newEnd;
        if (dayEvent.event.end) {
            newEnd = addMinutes(dayEvent.event.end, minutesMoved);
        }
        this.eventTimesChanged.emit({ newStart, newEnd, event: dayEvent.event });
    }
    /**
     * @return {?}
     */
    refreshHourGrid() {
        this.hours = this.utils.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
        this.emitBeforeViewRender();
    }
    /**
     * @return {?}
     */
    refreshView() {
        this.view = this.utils.getDayView({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: this.hourSegmentHeight
        });
        this.emitBeforeViewRender();
    }
    /**
     * @return {?}
     */
    refreshAll() {
        this.refreshHourGrid();
        this.refreshView();
    }
    /**
     * @return {?}
     */
    emitBeforeViewRender() {
        if (this.hours && this.view) {
            this.beforeViewRender.emit({
                body: {
                    hourGrid: this.hours
                },
                period: this.view.period
            });
        }
    }
}
CalendarDayViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-day-view',
                template: `
    <div class="cal-day-view" #dayViewContainer>
      <mwl-calendar-all-day-event
        *ngFor="let event of view.allDayEvents; trackBy:trackByEventId"
        [event]="event"
        [customTemplate]="allDayEventTemplate"
        [eventTitleTemplate]="eventTitleTemplate"
        (eventClicked)="eventClicked.emit({event: event})">
      </mwl-calendar-all-day-event>
      <div class="cal-hour-rows">
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events; trackBy:trackByDayEvent"
            class="cal-event-container"
            [class.cal-draggable]="dayEvent.event.draggable"
            [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
            [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
            [ngClass]="dayEvent.event.cssClass"
            mwlResizable
            [resizeEdges]="{top: dayEvent.event?.resizable?.beforeStart, bottom: dayEvent.event?.resizable?.afterEnd}"
            [resizeSnapGrid]="{top: eventSnapSize, bottom: eventSnapSize}"
            [validateResize]="validateResize"
            (resizeStart)="resizeStarted(dayEvent, $event, dayViewContainer)"
            (resizing)="resizing(dayEvent, $event)"
            (resizeEnd)="resizeEnded(dayEvent)"
            mwlDraggable
            [dragAxis]="{x: false, y: dayEvent.event.draggable && currentResizes.size === 0}"
            [dragSnapGrid]="{y: eventSnapSize}"
            [validateDrag]="validateDrag"
            (dragPointerDown)="dragStart(event, dayViewContainer)"
            (dragEnd)="eventDragged(dayEvent, $event.y)"
            [style.marginTop.px]="dayEvent.top"
            [style.height.px]="dayEvent.height"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.width.px]="dayEvent.width - 1">
            <mwl-calendar-day-view-event
              [dayEvent]="dayEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              (eventClicked)="eventClicked.emit({event: dayEvent.event})">
            </mwl-calendar-day-view-event>
          </div>
        </div>
        <div class="cal-hour" *ngFor="let hour of hours; trackBy:trackByHour" [style.minWidth.px]="view?.width + 70">
          <mwl-calendar-day-view-hour-segment
            *ngFor="let segment of hour.segments; trackBy:trackByHourSegment"
            [style.height.px]="hourSegmentHeight"
            [segment]="segment"
            [segmentHeight]="hourSegmentHeight"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (click)="hourSegmentClicked.emit({date: segment.date})"
            [class.cal-drag-over]="segment.dragOver"
            mwlDroppable
            (dragEnter)="segment.dragOver = true"
            (dragLeave)="segment.dragOver = false"
            (drop)="segment.dragOver = false; eventDropped($event, segment)">
          </mwl-calendar-day-view-hour-segment>
        </div>
      </div>
    </div>
  `
            },] },
];
/** @nocollapse */
CalendarDayViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarDayViewComponent.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    hourSegments: [{ type: Input }],
    hourSegmentHeight: [{ type: Input }],
    dayStartHour: [{ type: Input }],
    dayStartMinute: [{ type: Input }],
    dayEndHour: [{ type: Input }],
    dayEndMinute: [{ type: Input }],
    eventWidth: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    eventSnapSize: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    hourSegmentTemplate: [{ type: Input }],
    allDayEventTemplate: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }],
    hourSegmentClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }],
    beforeViewRender: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarAllDayEventComponent {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
CalendarAllDayEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-all-day-event',
                template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-eventClicked="eventClicked">
      <div
        class="cal-all-day-event"
        [style.backgroundColor]="event.color?.secondary"
        [style.borderColor]="event.color?.primary">
        <mwl-calendar-event-actions [event]="event"></mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="event"
          [customTemplate]="eventTitleTemplate"
          view="day"
          (mwlClick)="eventClicked.emit()">
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        eventClicked: eventClicked
      }">
    </ng-template>
  `
            },] },
];
CalendarAllDayEventComponent.propDecorators = {
    event: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarDayViewHourSegmentComponent {
}
CalendarDayViewHourSegmentComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-day-view-hour-segment',
                template: `
    <ng-template
      #defaultTemplate
      let-segment="segment"
      let-locale="locale">
      <div
        class="cal-hour-segment"
        [style.height.px]="segmentHeight"
        [class.cal-hour-start]="segment.isStart"
        [class.cal-after-hour-start]="!segment.isStart"
        [ngClass]="segment.cssClass">
        <div class="cal-time">
          {{ segment.date | calendarDate:'dayViewHour':locale }}
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        segment: segment,
        locale: locale
      }">
    </ng-template>
  `
            },] },
];
CalendarDayViewHourSegmentComponent.propDecorators = {
    segment: [{ type: Input }],
    segmentHeight: [{ type: Input }],
    locale: [{ type: Input }],
    customTemplate: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarDayViewEventComponent {
    constructor() {
        this.eventClicked = new EventEmitter();
    }
}
CalendarDayViewEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-day-view-event',
                template: `
    <ng-template
      #defaultTemplate
      let-dayEvent="dayEvent"
      let-tooltipPlacement="tooltipPlacement"
      let-eventClicked="eventClicked"
      let-tooltipTemplate="tooltipTemplate"
      let-tooltipAppendToBody="tooltipAppendToBody">
      <div
        class="cal-event"
        [style.backgroundColor]="dayEvent.event.color?.secondary"
        [style.borderColor]="dayEvent.event.color?.primary"
        [mwlCalendarTooltip]="dayEvent.event.title | calendarEventTitle:'dayTooltip':dayEvent.event"
        [tooltipPlacement]="tooltipPlacement"
        [tooltipEvent]="dayEvent.event"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipAppendToBody]="tooltipAppendToBody">
        <mwl-calendar-event-actions [event]="dayEvent.event"></mwl-calendar-event-actions>
        &ngsp;
        <mwl-calendar-event-title
          [event]="dayEvent.event"
          [customTemplate]="eventTitleTemplate"
          view="day"
          (mwlClick)="eventClicked.emit()">
        </mwl-calendar-event-title>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        dayEvent: dayEvent,
        tooltipPlacement: tooltipPlacement,
        eventClicked: eventClicked,
        tooltipTemplate: tooltipTemplate,
        tooltipAppendToBody: tooltipAppendToBody
      }">
    </ng-template>
  `
            },] },
];
CalendarDayViewEventComponent.propDecorators = {
    dayEvent: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CalendarDayModule {
}
CalendarDayModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizableModule,
                    DragAndDropModule,
                    CalendarCommonModule
                ],
                declarations: [
                    CalendarDayViewComponent,
                    CalendarAllDayEventComponent,
                    CalendarDayViewHourSegmentComponent,
                    CalendarDayViewEventComponent
                ],
                exports: [
                    ResizableModule,
                    DragAndDropModule,
                    CalendarDayViewComponent,
                    CalendarAllDayEventComponent,
                    CalendarDayViewHourSegmentComponent,
                    CalendarDayViewEventComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * The main module of this library. Example usage:
 *
 * ```typescript
 * import { CalenderModule } from 'angular-calendar';
 *
 * \@NgModule({
 *   imports: [
 *     CalenderModule.forRoot()
 *   ]
 * })
 * class MyModule {}
 * ```
 *
 */
class CalendarModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: CalendarModule,
            providers: [
                DraggableHelper,
                config.eventTitleFormatter || CalendarEventTitleFormatter,
                config.dateFormatter || CalendarDateFormatter,
                config.utils || CalendarUtils
            ]
        };
    }
}
CalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CalendarCommonModule,
                    CalendarMonthModule,
                    CalendarWeekModule,
                    CalendarDayModule
                ],
                exports: [
                    CalendarCommonModule,
                    CalendarMonthModule,
                    CalendarWeekModule,
                    CalendarDayModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { CalendarModule, CalendarCommonModule, CalendarEventTitleFormatter, MOMENT, CalendarMomentDateFormatter, CalendarNativeDateFormatter, CalendarAngularDateFormatter, CalendarDateFormatter, CalendarUtils, CalendarMonthViewComponent, CalendarMonthModule, CalendarWeekViewComponent, CalendarWeekModule, CalendarDayViewComponent, CalendarDayModule, CalendarDatePipe as ɵh, CalendarEventActionsComponent as ɵa, CalendarEventTitleComponent as ɵb, CalendarEventTitlePipe as ɵi, CalendarNextViewDirective as ɵf, CalendarPreviousViewDirective as ɵe, CalendarTodayDirective as ɵg, CalendarTooltipDirective as ɵd, CalendarTooltipWindowComponent as ɵc, ClickDirective as ɵj, CalendarAllDayEventComponent as ɵp, CalendarDayViewEventComponent as ɵr, CalendarDayViewHourSegmentComponent as ɵq, CalendarMonthCellComponent as ɵk, CalendarMonthViewHeaderComponent as ɵm, CalendarOpenDayEventsComponent as ɵl, CalendarWeekViewEventComponent as ɵo, CalendarWeekViewHeaderComponent as ɵn };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1jYWxlbmRhci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi91dGlsLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LWFjdGlvbnMuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpdGxlLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci10b29sdGlwLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1wcmV2aW91cy12aWV3LmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1uZXh0LXZpZXcuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXRvZGF5LmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1hbmd1bGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRhdGUucGlwZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aXRsZS1mb3JtYXR0ZXIucHJvdmlkZXIudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtdGl0bGUucGlwZS50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jbGljay5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXIudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItbW9tZW50LWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY29tbW9uL2NhbGVuZGFyLW5hdGl2ZS1kYXRlLWZvcm1hdHRlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvbW9udGgvY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC12aWV3LWhlYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL21vbnRoL2NhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cy5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC5tb2R1bGUudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy9jb21tb24vY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlci50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1ldmVudC5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItY2FsZW5kYXIvbW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2RheS9jYWxlbmRhci1hbGwtZGF5LWV2ZW50LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2RheS9jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LWV2ZW50LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2RheS9jYWxlbmRhci1kYXkubW9kdWxlLnRzIiwibmc6Ly9hbmd1bGFyLWNhbGVuZGFyL21vZHVsZXMvY2FsZW5kYXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENhbGVuZGFyRXZlbnQsXG4gIHZhbGlkYXRlRXZlbnRzIGFzIHZhbGlkYXRlRXZlbnRzV2l0aG91dExvZyxcbiAgV2Vla0RheVxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUV2ZW50cyA9IChldmVudHM6IENhbGVuZGFyRXZlbnRbXSkgPT4ge1xuICBjb25zdCB3YXJuID0gKC4uLmFyZ3MpID0+IGNvbnNvbGUud2FybignYW5ndWxhci1jYWxlbmRhcicsIC4uLmFyZ3MpO1xuICByZXR1cm4gdmFsaWRhdGVFdmVudHNXaXRob3V0TG9nKGV2ZW50cywgd2Fybik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJbnNpZGUob3V0ZXI6IENsaWVudFJlY3QsIGlubmVyOiBDbGllbnRSZWN0KTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgb3V0ZXIubGVmdCA8PSBpbm5lci5sZWZ0ICYmXG4gICAgaW5uZXIubGVmdCA8PSBvdXRlci5yaWdodCAmJlxuICAgIG91dGVyLmxlZnQgPD0gaW5uZXIucmlnaHQgJiZcbiAgICBpbm5lci5yaWdodCA8PSBvdXRlci5yaWdodCAmJlxuICAgIG91dGVyLnRvcCA8PSBpbm5lci50b3AgJiZcbiAgICBpbm5lci50b3AgPD0gb3V0ZXIuYm90dG9tICYmXG4gICAgb3V0ZXIudG9wIDw9IGlubmVyLmJvdHRvbSAmJlxuICAgIGlubmVyLmJvdHRvbSA8PSBvdXRlci5ib3R0b21cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlFdmVudElkID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBDYWxlbmRhckV2ZW50KSA9PlxuICBldmVudC5pZCA/IGV2ZW50LmlkIDogZXZlbnQ7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSAoaW5kZXg6IG51bWJlciwgZGF5OiBXZWVrRGF5KSA9PlxuICBkYXkuZGF0ZS50b0lTT1N0cmluZygpO1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeUluZGV4ID0gKGluZGV4OiBudW1iZXIpID0+IGluZGV4O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlJbmRleCB9IGZyb20gJy4vdXRpbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiAqbmdJZj1cImV2ZW50LmFjdGlvbnNcIiBjbGFzcz1cImNhbC1ldmVudC1hY3Rpb25zXCI+XG4gICAgICA8YVxuICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1hY3Rpb25cIlxuICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBldmVudC5hY3Rpb25zOyB0cmFja0J5OnRyYWNrQnlJbmRleFwiXG4gICAgICAgIChtd2xDbGljayk9XCJhY3Rpb24ub25DbGljayh7ZXZlbnQ6IGV2ZW50fSlcIlxuICAgICAgICBbbmdDbGFzc109XCJhY3Rpb24uY3NzQ2xhc3NcIlxuICAgICAgICBbaW5uZXJIdG1sXT1cImFjdGlvbi5sYWJlbFwiPlxuICAgICAgPC9hPlxuICAgIDwvc3Bhbj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50QWN0aW9uc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICB0cmFja0J5SW5kZXggPSB0cmFja0J5SW5kZXg7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1ldmVudD1cImV2ZW50XCJcbiAgICAgIGxldC12aWV3PVwidmlld1wiPlxuICAgICAgPGFcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtdGl0bGVcIlxuICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgW2lubmVySFRNTF09XCJldmVudC50aXRsZSB8IGNhbGVuZGFyRXZlbnRUaXRsZTp2aWV3OmV2ZW50XCI+XG4gICAgICA8L2E+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIHZpZXc6IHZpZXdcbiAgICAgIH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnRUaXRsZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIHZpZXc6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0b3IsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRWxlbWVudFJlZixcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgSW5qZWN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUG9zaXRpb25pbmcgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1jb250ZW50cz1cImNvbnRlbnRzXCJcbiAgICAgIGxldC1wbGFjZW1lbnQ9XCJwbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50PVwiZXZlbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcFwiIFtuZ0NsYXNzXT1cIidjYWwtdG9vbHRpcC0nICsgcGxhY2VtZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdG9vbHRpcC1hcnJvd1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXAtaW5uZXJcIiBbaW5uZXJIdG1sXT1cImNvbnRlbnRzXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGNvbnRlbnRzOiBjb250ZW50cyxcbiAgICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICAgIGV2ZW50OiBldmVudFxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY29udGVudHM6IHN0cmluZztcblxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSBldmVudDogQ2FsZW5kYXJFdmVudDtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENhbGVuZGFyVG9vbHRpcF0nXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnbXdsQ2FsZW5kYXJUb29sdGlwJykgY29udGVudHM6IHN0cmluZzsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBQbGFjZW1lbnQnKSBwbGFjZW1lbnQ6IHN0cmluZyA9ICd0b3AnOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcFRlbXBsYXRlJykgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwRXZlbnQnKSBldmVudDogQ2FsZW5kYXJFdmVudDsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBBcHBlbmRUb0JvZHknKSBhcHBlbmRUb0JvZHk6IGJvb2xlYW47IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgcHJpdmF0ZSB0b29sdGlwRmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQ+O1xuICBwcml2YXRlIHRvb2x0aXBSZWY6IENvbXBvbmVudFJlZjxDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQ+O1xuICBwcml2YXRlIHBvc2l0aW9uaW5nOiBQb3NpdGlvbmluZyA9IG5ldyBQb3NpdGlvbmluZygpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQgLy90c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICkge1xuICAgIHRoaXMudG9vbHRpcEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnRcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcFJlZiAmJiB0aGlzLmNvbnRlbnRzKSB7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICB0aGlzLnRvb2x0aXBGYWN0b3J5LFxuICAgICAgICAwLFxuICAgICAgICB0aGlzLmluamVjdG9yLFxuICAgICAgICBbXVxuICAgICAgKTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5jb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UucGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnQ7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY3VzdG9tVGVtcGxhdGUgPSB0aGlzLmN1c3RvbVRlbXBsYXRlO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmV2ZW50ID0gdGhpcy5ldmVudDtcbiAgICAgIGlmICh0aGlzLmFwcGVuZFRvQm9keSkge1xuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5wb3NpdGlvblRvb2x0aXAoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwUmVmKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYucmVtb3ZlKFxuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzLnRvb2x0aXBSZWYuaG9zdFZpZXcpXG4gICAgICApO1xuICAgICAgdGhpcy50b29sdGlwUmVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBvc2l0aW9uVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sdGlwUmVmKSB7XG4gICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbjogQ2xpZW50UmVjdCA9IHRoaXMucG9zaXRpb25pbmcucG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMudG9vbHRpcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLFxuICAgICAgICB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgdGhpcy5hcHBlbmRUb0JvZHlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGVsbTogSFRNTEVsZW1lbnQgPSB0aGlzLnRvb2x0aXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudFxuICAgICAgICAuY2hpbGRyZW5bMF07XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoZWxtLCAndG9wJywgYCR7dGFyZ2V0UG9zaXRpb24udG9wfXB4YCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGVsbSwgJ2xlZnQnLCBgJHt0YXJnZXRQb3NpdGlvbi5sZWZ0fXB4YCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHN1YkRheXMgZnJvbSAnZGF0ZS1mbnMvc3ViX2RheXMvaW5kZXgnO1xuaW1wb3J0IHN1YldlZWtzIGZyb20gJ2RhdGUtZm5zL3N1Yl93ZWVrcy9pbmRleCc7XG5pbXBvcnQgc3ViTW9udGhzIGZyb20gJ2RhdGUtZm5zL3N1Yl9tb250aHMvaW5kZXgnO1xuXG4vKipcbiAqIENoYW5nZSB0aGUgdmlldyBkYXRlIHRvIHRoZSBwcmV2aW91cyB2aWV3LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiA8YnV0dG9uXG4gKiAgbXdsQ2FsZW5kYXJQcmV2aW91c1ZpZXdcbiAqICBbKHZpZXdEYXRlKV09XCJ2aWV3RGF0ZVwiXG4gKiAgW3ZpZXddPVwidmlld1wiPlxuICogIFByZXZpb3VzXG4gKiA8L2J1dHRvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbXdsQ2FsZW5kYXJQcmV2aW91c1ZpZXddJ1xufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclByZXZpb3VzVmlld0RpcmVjdGl2ZSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSB2aWV3OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aWV3IGRhdGUgaXMgY2hhbmdlZFxuICAgKi9cbiAgQE91dHB1dCgpIHZpZXdEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBjb25zdCBzdWJGbjogYW55ID0ge1xuICAgICAgZGF5OiBzdWJEYXlzLFxuICAgICAgd2Vlazogc3ViV2Vla3MsXG4gICAgICBtb250aDogc3ViTW9udGhzXG4gICAgfVt0aGlzLnZpZXddO1xuXG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KHN1YkZuKHRoaXMudmlld0RhdGUsIDEpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBhZGREYXlzIGZyb20gJ2RhdGUtZm5zL2FkZF9kYXlzL2luZGV4JztcbmltcG9ydCBhZGRXZWVrcyBmcm9tICdkYXRlLWZucy9hZGRfd2Vla3MvaW5kZXgnO1xuaW1wb3J0IGFkZE1vbnRocyBmcm9tICdkYXRlLWZucy9hZGRfbW9udGhzL2luZGV4JztcblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHZpZXcgZGF0ZSB0byB0aGUgbmV4dCB2aWV3LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiA8YnV0dG9uXG4gKiAgbXdsQ2FsZW5kYXJOZXh0Vmlld1xuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCJcbiAqICBbdmlld109XCJ2aWV3XCI+XG4gKiAgTmV4dFxuICogPC9idXR0b24+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENhbGVuZGFyTmV4dFZpZXddJ1xufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck5leHRWaWV3RGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHZpZXc6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHZpZXcgZGF0ZSBpcyBjaGFuZ2VkXG4gICAqL1xuICBAT3V0cHV0KCkgdmlld0RhdGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxEYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGNvbnN0IGFkZEZuOiBhbnkgPSB7XG4gICAgICBkYXk6IGFkZERheXMsXG4gICAgICB3ZWVrOiBhZGRXZWVrcyxcbiAgICAgIG1vbnRoOiBhZGRNb250aHNcbiAgICB9W3RoaXMudmlld107XG5cbiAgICB0aGlzLnZpZXdEYXRlQ2hhbmdlLmVtaXQoYWRkRm4odGhpcy52aWV3RGF0ZSwgMSkpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHN0YXJ0T2ZUb2RheSBmcm9tICdkYXRlLWZucy9zdGFydF9vZl90b2RheS9pbmRleCc7XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB2aWV3IGRhdGUgdG8gdGhlIGN1cnJlbnQgZGF5LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiA8YnV0dG9uXG4gKiAgbXdsQ2FsZW5kYXJUb2RheVxuICogIFsodmlld0RhdGUpXT1cInZpZXdEYXRlXCI+XG4gKiAgVG9kYXlcbiAqIDwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclRvZGF5XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJUb2RheURpcmVjdGl2ZSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBkYXRlIGlzIGNoYW5nZWRcbiAgICovXG4gIEBPdXRwdXQoKSB2aWV3RGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZUNoYW5nZS5lbWl0KHN0YXJ0T2ZUb2RheSgpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlLFxuICBEYXRlRm9ybWF0dGVyUGFyYW1zXG59IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCBnZXRJU09XZWVrIGZyb20gJ2RhdGUtZm5zL2dldF9pc29fd2Vlay9pbmRleCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogVGhpcyB3aWxsIHVzZSB0aGUgYW5ndWxhciBkYXRlIHBpcGUgdG8gZG8gYWxsIGRhdGUgZm9ybWF0dGluZy4gSXQgaXMgdGhlIGRlZmF1bHQgZGF0ZSBmb3JtYXR0ZXIgdXNlZCBieSB0aGUgY2FsZW5kYXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckFuZ3VsYXJEYXRlRm9ybWF0dGVyXG4gIGltcGxlbWVudHMgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyBtb250aFZpZXdDb2x1bW5IZWFkZXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnRUVFRScsIG51bGwsIGxvY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgY2VsbCBkYXkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3RGF5TnVtYmVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgRGF0ZVBpcGUobG9jYWxlKS50cmFuc2Zvcm0oZGF0ZSwgJ2QnLCBudWxsLCBsb2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnTU1NTSB5JywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IERhdGVQaXBlKGxvY2FsZSkudHJhbnNmb3JtKGRhdGUsICdFRUVFJywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IHN1YiBoZWFkZXIgZGF5IGFuZCBtb250aCBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtblN1YkhlYWRlcih7XG4gICAgZGF0ZSxcbiAgICBsb2NhbGVcbiAgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnTU1NIGQnLCBudWxsLCBsb2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHllYXI6IHN0cmluZyA9IG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShcbiAgICAgIGRhdGUsXG4gICAgICAneScsXG4gICAgICBudWxsLFxuICAgICAgbG9jYWxlXG4gICAgKTtcbiAgICBjb25zdCB3ZWVrTnVtYmVyOiBudW1iZXIgPSBnZXRJU09XZWVrKGRhdGUpO1xuICAgIHJldHVybiBgV2VlayAke3dlZWtOdW1iZXJ9IG9mICR7eWVhcn1gO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIGZvcm1hdHRpbmcgZG93biB0aGUgbGVmdCBoYW5kIHNpZGUgb2YgdGhlIGRheSB2aWV3XG4gICAqL1xuICBwdWJsaWMgZGF5Vmlld0hvdXIoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShkYXRlLCAnaCBhJywgbnVsbCwgbG9jYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBEYXRlUGlwZShsb2NhbGUpLnRyYW5zZm9ybShcbiAgICAgIGRhdGUsXG4gICAgICAnRUVFRSwgTU1NTSBkLCB5JyxcbiAgICAgIG51bGwsXG4gICAgICBsb2NhbGVcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDYWxlbmRhckFuZ3VsYXJEYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9jYWxlbmRhci1hbmd1bGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBhbGwgZm9ybWF0dGluZyBvZiBkYXRlcy4gVGhlcmUgYXJlIDMgaW1wbGVtZW50YXRpb25zIGF2YWlsYWJsZSwgdGhlIGBDYWxlbmRhckFuZ3VsYXJEYXRlRm9ybWF0dGVyYCAoZGVmYXVsdCkgd2hpY2ggdXNlcyB0aGUgYW5ndWxhciBkYXRlIHBpcGUgdG8gZm9ybWF0IGRhdGVzLCB0aGUgYENhbGVuZGFyTmF0aXZlRGF0ZUZvcm1hdHRlcmAgd2hpY2ggd2lsbCB1c2UgdGhlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SW50bDwvYT4gQVBJIHRvIGZvcm1hdCBkYXRlcywgb3IgdGhlcmUgaXMgdGhlIGBDYWxlbmRhck1vbWVudERhdGVGb3JtYXR0ZXJgIHdoaWNoIHVzZXMgPGEgaHJlZj1cImh0dHA6Ly9tb21lbnRqcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+bW9tZW50PC9hPi5cbiAqXG4gKiBJZiB5b3Ugd2lzaCwgeW91IG1heSBvdmVycmlkZSBhbnkgb2YgdGhlIGRlZmF1bHRzIHZpYSBhbmd1bGFycyBESS4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLCBEYXRlRm9ybWF0dGVyUGFyYW1zIH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhcic7XG4gKiBpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4gKlxuICogY2xhc3MgQ3VzdG9tRGF0ZUZvcm1hdHRlciBleHRlbmRzIENhbGVuZGFyRGF0ZUZvcm1hdHRlciB7XG4gKlxuICogICBwdWJsaWMgbW9udGhWaWV3Q29sdW1uSGVhZGVyKHtkYXRlLCBsb2NhbGV9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAqICAgICByZXR1cm4gbmV3IERhdGVQaXBlKGxvY2FsZSkudHJhbnNmb3JtKGRhdGUsICdFRUUnLCBsb2NhbGUpOyAvLyB1c2Ugc2hvcnQgd2VlayBkYXlzXG4gKiAgIH1cbiAqXG4gKiB9XG4gKlxuICogLy8gaW4geW91ciBjb21wb25lbnQgdGhhdCB1c2VzIHRoZSBjYWxlbmRhclxuICogcHJvdmlkZXJzOiBbe1xuICogICBwcm92aWRlOiBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gKiAgIHVzZUNsYXNzOiBDdXN0b21EYXRlRm9ybWF0dGVyXG4gKiB9XVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIgZXh0ZW5kcyBDYWxlbmRhckFuZ3VsYXJEYXRlRm9ybWF0dGVyIHt9XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtLCBMT0NBTEVfSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbi8qKlxuICogVGhpcyBwaXBlIGlzIHByaW1hcmlseSBmb3IgcmVuZGVyaW5nIHRoZSBjdXJyZW50IHZpZXcgdGl0bGUuIEV4YW1wbGUgdXNhZ2U6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyB3aGVyZSBgdmlld0RhdGVgIGlzIGEgYERhdGVgIGFuZCB2aWV3IGlzIGAnbW9udGgnIHwgJ3dlZWsnIHwgJ2RheSdgXG4gKiB7eyB2aWV3RGF0ZSB8IGNhbGVuZGFyRGF0ZToodmlldyArICdWaWV3VGl0bGUnKTonZW4nIH19XG4gKiBgYGBcbiAqL1xuQFBpcGUoe1xuICBuYW1lOiAnY2FsZW5kYXJEYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGF0ZUZvcm1hdHRlcjogQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nXG4gICkge31cblxuICB0cmFuc2Zvcm0oZGF0ZTogRGF0ZSwgbWV0aG9kOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nID0gdGhpcy5sb2NhbGUpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXJbbWV0aG9kXSh7IGRhdGUsIGxvY2FsZSB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIGFsbCBldmVudCB0aXRsZXMgd2l0aGluIHRoZSBjYWxlbmRhci4gWW91IG1heSBvdmVycmlkZSBhbnkgb2YgaXRzIG1ldGhvZHMgdmlhIGFuZ3VsYXJzIERJIHRvIHN1aXQgeW91ciByZXF1aXJlbWVudHMuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZUZvcm1hdHRlciwgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICpcbiAqIGNsYXNzIEN1c3RvbUV2ZW50VGl0bGVGb3JtYXR0ZXIgZXh0ZW5kcyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIge1xuICpcbiAqICAgbW9udGgoZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICogICAgIHJldHVybiBgQ3VzdG9tIHByZWZpeDogJHtldmVudC50aXRsZX1gO1xuICogICB9XG4gKlxuICogfVxuICpcbiAqIC8vIGluIHlvdXIgY29tcG9uZW50XG4gKiBwcm92aWRlcnM6IFt7XG4gKiAgcHJvdmlkZTogQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICogIHVzZUNsYXNzOiBDdXN0b21FdmVudFRpdGxlRm9ybWF0dGVyXG4gKiB9XVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIge1xuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgZXZlbnQgdGl0bGUuXG4gICAqL1xuICBtb250aChldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGV2ZW50IHRvb2x0aXAuIFJldHVybiBhIGZhbHNleSB2YWx1ZSBmcm9tIHRoaXMgdG8gZGlzYWJsZSB0aGUgdG9vbHRpcC5cbiAgICovXG4gIG1vbnRoVG9vbHRpcChldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgZXZlbnQgdGl0bGUuXG4gICAqL1xuICB3ZWVrKGV2ZW50OiBDYWxlbmRhckV2ZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBldmVudCB0b29sdGlwLiBSZXR1cm4gYSBmYWxzZXkgdmFsdWUgZnJvbSB0aGlzIHRvIGRpc2FibGUgdGhlIHRvb2x0aXAuXG4gICAqL1xuICB3ZWVrVG9vbHRpcChldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgdmlldyBldmVudCB0aXRsZS5cbiAgICovXG4gIGRheShldmVudDogQ2FsZW5kYXJFdmVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGV2ZW50LnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgdmlldyBldmVudCB0b29sdGlwLiBSZXR1cm4gYSBmYWxzZXkgdmFsdWUgZnJvbSB0aGlzIHRvIGRpc2FibGUgdGhlIHRvb2x0aXAuXG4gICAqL1xuICBkYXlUb29sdGlwKGV2ZW50OiBDYWxlbmRhckV2ZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gZXZlbnQudGl0bGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpdGxlLWZvcm1hdHRlci5wcm92aWRlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NhbGVuZGFyRXZlbnRUaXRsZSdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJFdmVudFRpdGxlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGVuZGFyRXZlbnRUaXRsZTogQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyKSB7fVxuXG4gIHRyYW5zZm9ybSh0aXRsZTogc3RyaW5nLCB0aXRsZVR5cGU6IHN0cmluZywgZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNhbGVuZGFyRXZlbnRUaXRsZVt0aXRsZVR5cGVdKGV2ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENsaWNrXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoJ213bENsaWNrJykgY2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsbTogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudE5hbWU6IHN0cmluZyA9XG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93WydIYW1tZXInXSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyAndGFwJ1xuICAgICAgICA6ICdjbGljayc7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudCxcbiAgICAgIGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5jbGljay5uZXh0KGV2ZW50KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBnZXRNb250aFZpZXcsXG4gIEdldE1vbnRoVmlld0FyZ3MsXG4gIE1vbnRoVmlldyxcbiAgZ2V0V2Vla1ZpZXdIZWFkZXIsXG4gIEdldFdlZWtWaWV3SGVhZGVyQXJncyxcbiAgV2Vla0RheSxcbiAgZ2V0V2Vla1ZpZXcsXG4gIEdldFdlZWtWaWV3QXJncyxcbiAgZ2V0RGF5VmlldyxcbiAgR2V0RGF5Vmlld0FyZ3MsXG4gIERheVZpZXcsXG4gIGdldERheVZpZXdIb3VyR3JpZCxcbiAgR2V0RGF5Vmlld0hvdXJHcmlkQXJncyxcbiAgRGF5Vmlld0hvdXIsXG4gIFdlZWtWaWV3XG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVXRpbHMge1xuICBnZXRNb250aFZpZXcoYXJnczogR2V0TW9udGhWaWV3QXJncyk6IE1vbnRoVmlldyB7XG4gICAgcmV0dXJuIGdldE1vbnRoVmlldyhhcmdzKTtcbiAgfVxuXG4gIGdldFdlZWtWaWV3SGVhZGVyKGFyZ3M6IEdldFdlZWtWaWV3SGVhZGVyQXJncyk6IFdlZWtEYXlbXSB7XG4gICAgcmV0dXJuIGdldFdlZWtWaWV3SGVhZGVyKGFyZ3MpO1xuICB9XG5cbiAgZ2V0V2Vla1ZpZXcoYXJnczogR2V0V2Vla1ZpZXdBcmdzKTogV2Vla1ZpZXcge1xuICAgIHJldHVybiBnZXRXZWVrVmlldyhhcmdzKTtcbiAgfVxuXG4gIGdldERheVZpZXcoYXJnczogR2V0RGF5Vmlld0FyZ3MpOiBEYXlWaWV3IHtcbiAgICByZXR1cm4gZ2V0RGF5VmlldyhhcmdzKTtcbiAgfVxuXG4gIGdldERheVZpZXdIb3VyR3JpZChhcmdzOiBHZXREYXlWaWV3SG91ckdyaWRBcmdzKTogRGF5Vmlld0hvdXJbXSB7XG4gICAgcmV0dXJuIGdldERheVZpZXdIb3VyR3JpZChhcmdzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJEYXRlRm9ybWF0dGVySW50ZXJmYWNlLFxuICBEYXRlRm9ybWF0dGVyUGFyYW1zXG59IGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNvbnN0IE1PTUVOVDogSW5qZWN0aW9uVG9rZW48c3RyaW5nPiA9IG5ldyBJbmplY3Rpb25Ub2tlbignTW9tZW50Jyk7XG5cbi8qKlxuICogVGhpcyB3aWxsIHVzZSA8YSBocmVmPVwiaHR0cDovL21vbWVudGpzLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5tb21lbnQ8L2E+IHRvIGRvIGFsbCBkYXRlIGZvcm1hdHRpbmcuIFRvIHVzZSB0aGlzIGNsYXNzOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENhbGVuZGFyRGF0ZUZvcm1hdHRlciwgQ2FsZW5kYXJNb21lbnREYXRlRm9ybWF0dGVyLCBNT01FTlQgfSBmcm9tICdhbmd1bGFyLWNhbGVuZGFyJztcbiAqIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbiAqXG4gKiAvLyBpbiB5b3VyIGNvbXBvbmVudFxuICogcHJvdmlkZTogW3tcbiAqICAgcHJvdmlkZTogTU9NRU5ULCB1c2VWYWx1ZTogbW9tZW50XG4gKiB9LCB7XG4gKiAgIHByb3ZpZGU6IENhbGVuZGFyRGF0ZUZvcm1hdHRlciwgdXNlQ2xhc3M6IENhbGVuZGFyTW9tZW50RGF0ZUZvcm1hdHRlclxuICogfV1cbiAqXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9tZW50RGF0ZUZvcm1hdHRlclxuICBpbXBsZW1lbnRzIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KE1PTUVOVCkgcHJpdmF0ZSBtb21lbnQ6IGFueSkge31cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxuICAgICAgLmZvcm1hdCgnZGRkZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IGNlbGwgZGF5IG51bWJlclxuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld0RheU51bWJlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxuICAgICAgLmZvcm1hdCgnRCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubW9tZW50KGRhdGUpXG4gICAgICAubG9jYWxlKGxvY2FsZSlcbiAgICAgIC5mb3JtYXQoJ01NTU0gWVlZWScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xuICAgKi9cbiAgcHVibGljIHdlZWtWaWV3Q29sdW1uSGVhZGVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxuICAgICAgLmxvY2FsZShsb2NhbGUpXG4gICAgICAuZm9ybWF0KCdkZGRkJyk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBzdWIgaGVhZGVyIGRheSBhbmQgbW9udGggbGFiZWxzXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdDb2x1bW5TdWJIZWFkZXIoe1xuICAgIGRhdGUsXG4gICAgbG9jYWxlXG4gIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxuICAgICAgLmxvY2FsZShsb2NhbGUpXG4gICAgICAuZm9ybWF0KCdEIE1NTScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3ZWVrIHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld1RpdGxlKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxuICAgICAgLmxvY2FsZShsb2NhbGUpXG4gICAgICAuZm9ybWF0KCdbV2Vla10gVyBbb2ZdIFlZWVknKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSBmb3JtYXR0aW5nIGRvd24gdGhlIGxlZnQgaGFuZCBzaWRlIG9mIHRoZSBkYXkgdmlld1xuICAgKi9cbiAgcHVibGljIGRheVZpZXdIb3VyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vbWVudChkYXRlKVxuICAgICAgLmxvY2FsZShsb2NhbGUpXG4gICAgICAuZm9ybWF0KCdoYScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgdmlldyB0aXRsZVxuICAgKi9cbiAgcHVibGljIGRheVZpZXdUaXRsZSh7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb21lbnQoZGF0ZSlcbiAgICAgIC5sb2NhbGUobG9jYWxlKVxuICAgICAgLmZvcm1hdCgnZGRkZCwgRCBNTU1NLCBZWVlZJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENhbGVuZGFyRGF0ZUZvcm1hdHRlckludGVyZmFjZSxcbiAgRGF0ZUZvcm1hdHRlclBhcmFtc1xufSBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLmludGVyZmFjZSc7XG5pbXBvcnQgZ2V0SVNPV2VlayBmcm9tICdkYXRlLWZucy9nZXRfaXNvX3dlZWsvaW5kZXgnO1xuXG4vKipcbiAqIFRoaXMgd2lsbCB1c2UgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5JbnRsPC9hPiBBUEkgdG8gZG8gYWxsIGRhdGUgZm9ybWF0dGluZy5cbiAqXG4gKiBZb3Ugd2lsbCBuZWVkIHRvIGluY2x1ZGUgYSA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2FuZHllYXJuc2hhdy9JbnRsLmpzL1wiPnBvbHlmaWxsPC9hPiBmb3Igb2xkZXIgYnJvd3NlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYWxlbmRhck5hdGl2ZURhdGVGb3JtYXR0ZXJcbiAgaW1wbGVtZW50cyBDYWxlbmRhckRhdGVGb3JtYXR0ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgaGVhZGVyIHdlZWsgZGF5IGxhYmVsc1xuICAgKi9cbiAgcHVibGljIG1vbnRoVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IHdlZWtkYXk6ICdsb25nJyB9KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1vbnRoIHZpZXcgY2VsbCBkYXkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3RGF5TnVtYmVyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgZGF5OiAnbnVtZXJpYycgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtb250aCB2aWV3IHRpdGxlXG4gICAqL1xuICBwdWJsaWMgbW9udGhWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgbW9udGg6ICdsb25nJ1xuICAgIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgd2VlayB2aWV3IGhlYWRlciB3ZWVrIGRheSBsYWJlbHNcbiAgICovXG4gIHB1YmxpYyB3ZWVrVmlld0NvbHVtbkhlYWRlcih7IGRhdGUsIGxvY2FsZSB9OiBEYXRlRm9ybWF0dGVyUGFyYW1zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IHdlZWtkYXk6ICdsb25nJyB9KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyBzdWIgaGVhZGVyIGRheSBhbmQgbW9udGggbGFiZWxzXG4gICAqL1xuICBwdWJsaWMgd2Vla1ZpZXdDb2x1bW5TdWJIZWFkZXIoe1xuICAgIGRhdGUsXG4gICAgbG9jYWxlXG4gIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHtcbiAgICAgIGRheTogJ251bWVyaWMnLFxuICAgICAgbW9udGg6ICdzaG9ydCdcbiAgICB9KS5mb3JtYXQoZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHdlZWsgdmlldyB0aXRsZVxuICAgKi9cbiAgcHVibGljIHdlZWtWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgY29uc3QgeWVhcjogc3RyaW5nID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7XG4gICAgICB5ZWFyOiAnbnVtZXJpYydcbiAgICB9KS5mb3JtYXQoZGF0ZSk7XG4gICAgY29uc3Qgd2Vla051bWJlcjogbnVtYmVyID0gZ2V0SVNPV2VlayhkYXRlKTtcbiAgICByZXR1cm4gYFdlZWsgJHt3ZWVrTnVtYmVyfSBvZiAke3llYXJ9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSBmb3JtYXR0aW5nIGRvd24gdGhlIGxlZnQgaGFuZCBzaWRlIG9mIHRoZSBkYXkgdmlld1xuICAgKi9cbiAgcHVibGljIGRheVZpZXdIb3VyKHsgZGF0ZSwgbG9jYWxlIH06IERhdGVGb3JtYXR0ZXJQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgaG91cjogJ251bWVyaWMnIH0pLmZvcm1hdChkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHZpZXcgdGl0bGVcbiAgICovXG4gIHB1YmxpYyBkYXlWaWV3VGl0bGUoeyBkYXRlLCBsb2NhbGUgfTogRGF0ZUZvcm1hdHRlclBhcmFtcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwge1xuICAgICAgZGF5OiAnbnVtZXJpYycsXG4gICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgd2Vla2RheTogJ2xvbmcnXG4gICAgfSkuZm9ybWF0KGRhdGUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEcmFnZ2FibGVIZWxwZXIgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LWFjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItZXZlbnQtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSxcbiAgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50XG59IGZyb20gJy4vY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJQcmV2aW91c1ZpZXdEaXJlY3RpdmUgfSBmcm9tICcuL2NhbGVuZGFyLXByZXZpb3VzLXZpZXcuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyTmV4dFZpZXdEaXJlY3RpdmUgfSBmcm9tICcuL2NhbGVuZGFyLW5leHQtdmlldy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUb2RheURpcmVjdGl2ZSB9IGZyb20gJy4vY2FsZW5kYXItdG9kYXkuZGlyZWN0aXZlJztcbmltcG9ydCB7IENhbGVuZGFyRGF0ZVBpcGUgfSBmcm9tICcuL2NhbGVuZGFyLWRhdGUucGlwZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGl0bGVQaXBlIH0gZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aXRsZS5waXBlJztcbmltcG9ydCB7IENsaWNrRGlyZWN0aXZlIH0gZnJvbSAnLi9jbGljay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyIH0gZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aXRsZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9jYWxlbmRhci1kYXRlLWZvcm1hdHRlci5wcm92aWRlcic7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi9jYWxlbmRhci11dGlscy5wcm92aWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJNb2R1bGVDb25maWcge1xuICBldmVudFRpdGxlRm9ybWF0dGVyPzogUHJvdmlkZXI7XG4gIGRhdGVGb3JtYXR0ZXI/OiBQcm92aWRlcjtcbiAgdXRpbHM/OiBQcm92aWRlcjtcbn1cblxuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1ldmVudC10aXRsZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1tb21lbnQtZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1uYXRpdmUtZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci1hbmd1bGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItZGF0ZS1mb3JtYXR0ZXIucHJvdmlkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jYWxlbmRhci11dGlscy5wcm92aWRlcic7XG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcblxuZXhwb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgRXZlbnRBY3Rpb24gYXMgQ2FsZW5kYXJFdmVudEFjdGlvbixcbiAgREFZU19PRl9XRUVLLFxuICBWaWV3UGVyaW9kIGFzIENhbGVuZGFyVmlld1BlcmlvZFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbi8qKlxuICogSW1wb3J0IHRoaXMgbW9kdWxlIHRvIGlmIHlvdSdyZSBqdXN0IHVzaW5nIGEgc2luZ3VsYXIgdmlldyBhbmQgd2FudCB0byBzYXZlIG9uIGJ1bmRsZSBzaXplLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENhbGVuZGFyQ29tbW9uTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL2NvbW1vbic7XG4gKiBpbXBvcnQgeyBDYWxlbmRhck1vbnRoTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1jYWxlbmRhci9tb2R1bGVzL21vbnRoJztcbiAqXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUuZm9yUm9vdCgpLFxuICogICAgIENhbGVuZGFyTW9udGhNb2R1bGVcbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIE15TW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyRXZlbnRBY3Rpb25zQ29tcG9uZW50LFxuICAgIENhbGVuZGFyRXZlbnRUaXRsZUNvbXBvbmVudCxcbiAgICBDYWxlbmRhclRvb2x0aXBXaW5kb3dDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJUb29sdGlwRGlyZWN0aXZlLFxuICAgIENhbGVuZGFyUHJldmlvdXNWaWV3RGlyZWN0aXZlLFxuICAgIENhbGVuZGFyTmV4dFZpZXdEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJUb2RheURpcmVjdGl2ZSxcbiAgICBDYWxlbmRhckRhdGVQaXBlLFxuICAgIENhbGVuZGFyRXZlbnRUaXRsZVBpcGUsXG4gICAgQ2xpY2tEaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYWxlbmRhckV2ZW50QWN0aW9uc0NvbXBvbmVudCxcbiAgICBDYWxlbmRhckV2ZW50VGl0bGVDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50LFxuICAgIENhbGVuZGFyVG9vbHRpcERpcmVjdGl2ZSxcbiAgICBDYWxlbmRhclByZXZpb3VzVmlld0RpcmVjdGl2ZSxcbiAgICBDYWxlbmRhck5leHRWaWV3RGlyZWN0aXZlLFxuICAgIENhbGVuZGFyVG9kYXlEaXJlY3RpdmUsXG4gICAgQ2FsZW5kYXJEYXRlUGlwZSxcbiAgICBDYWxlbmRhckV2ZW50VGl0bGVQaXBlLFxuICAgIENsaWNrRGlyZWN0aXZlXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0NhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDb21tb25Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IENhbGVuZGFyTW9kdWxlQ29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IENhbGVuZGFyQ29tbW9uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERyYWdnYWJsZUhlbHBlcixcbiAgICAgICAgY29uZmlnLmV2ZW50VGl0bGVGb3JtYXR0ZXIgfHwgQ2FsZW5kYXJFdmVudFRpdGxlRm9ybWF0dGVyLFxuICAgICAgICBjb25maWcuZGF0ZUZvcm1hdHRlciB8fCBDYWxlbmRhckRhdGVGb3JtYXR0ZXIsXG4gICAgICAgIGNvbmZpZy51dGlscyB8fCBDYWxlbmRhclV0aWxzXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBMT0NBTEVfSUQsXG4gIEluamVjdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBXZWVrRGF5LFxuICBNb250aFZpZXcsXG4gIE1vbnRoVmlld0RheSxcbiAgVmlld1BlcmlvZFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCBpc1NhbWVEYXkgZnJvbSAnZGF0ZS1mbnMvaXNfc2FtZV9kYXkvaW5kZXgnO1xuaW1wb3J0IHNldERhdGUgZnJvbSAnZGF0ZS1mbnMvc2V0X2RhdGUvaW5kZXgnO1xuaW1wb3J0IHNldE1vbnRoIGZyb20gJ2RhdGUtZm5zL3NldF9tb250aC9pbmRleCc7XG5pbXBvcnQgc2V0WWVhciBmcm9tICdkYXRlLWZucy9zZXRfeWVhci9pbmRleCc7XG5pbXBvcnQgZ2V0RGF0ZSBmcm9tICdkYXRlLWZucy9nZXRfZGF0ZS9pbmRleCc7XG5pbXBvcnQgZ2V0TW9udGggZnJvbSAnZGF0ZS1mbnMvZ2V0X21vbnRoL2luZGV4JztcbmltcG9ydCBnZXRZZWFyIGZyb20gJ2RhdGUtZm5zL2dldF95ZWFyL2luZGV4JztcbmltcG9ydCBkaWZmZXJlbmNlSW5TZWNvbmRzIGZyb20gJ2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fc2Vjb25kcy9pbmRleCc7XG5pbXBvcnQgYWRkU2Vjb25kcyBmcm9tICdkYXRlLWZucy9hZGRfc2Vjb25kcy9pbmRleCc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtdGltZXMtY2hhbmdlZC1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci11dGlscy5wcm92aWRlcic7XG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50cywgdHJhY2tCeUluZGV4IH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnQge1xuICBoZWFkZXI6IFdlZWtEYXlbXTtcbiAgYm9keTogTW9udGhWaWV3RGF5W107XG4gIHBlcmlvZDogVmlld1BlcmlvZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhck1vbnRoVmlld0V2ZW50VGltZXNDaGFuZ2VkRXZlbnRcbiAgZXh0ZW5kcyBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQge1xuICBkYXk6IE1vbnRoVmlld0RheTtcbn1cblxuLyoqXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gbW9udGguIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPG13bC1jYWxlbmRhci1tb250aC12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItbW9udGgtdmlldz5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtdmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC1tb250aC12aWV3XCI+XG4gICAgICA8bXdsLWNhbGVuZGFyLW1vbnRoLXZpZXctaGVhZGVyXG4gICAgICAgIFtkYXlzXT1cImNvbHVtbkhlYWRlcnNcIlxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJoZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgPC9td2wtY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheXNcIj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgcm93SW5kZXggb2Ygdmlldy5yb3dPZmZzZXRzOyB0cmFja0J5SW5kZXhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWNlbGwtcm93XCI+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLW1vbnRoLWNlbGxcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiAodmlldy5kYXlzIHwgc2xpY2UgOiByb3dJbmRleCA6IHJvd0luZGV4ICsgKHZpZXcudG90YWxEYXlzVmlzaWJsZUluV2VlaykpOyB0cmFja0J5OnRyYWNrQnlEYXRlXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnLW92ZXJdPVwiZGF5LmRyYWdPdmVyXCJcbiAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZGF5Py5jc3NDbGFzc1wiXG4gICAgICAgICAgICAgIFtkYXldPVwiZGF5XCJcbiAgICAgICAgICAgICAgW29wZW5EYXldPVwib3BlbkRheVwiXG4gICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJjZWxsVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlRGF5Q2xpY2soJGV2ZW50LCBkYXkpXCJcbiAgICAgICAgICAgICAgKGhpZ2hsaWdodERheSk9XCJ0b2dnbGVEYXlIaWdobGlnaHQoJGV2ZW50LmV2ZW50LCB0cnVlKVwiXG4gICAgICAgICAgICAgICh1bmhpZ2hsaWdodERheSk9XCJ0b2dnbGVEYXlIaWdobGlnaHQoJGV2ZW50LmV2ZW50LCBmYWxzZSlcIlxuICAgICAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAgICAgKGRyYWdFbnRlcik9XCJkYXkuZHJhZ092ZXIgPSB0cnVlXCJcbiAgICAgICAgICAgICAgKGRyYWdMZWF2ZSk9XCJkYXkuZHJhZ092ZXIgPSBmYWxzZVwiXG4gICAgICAgICAgICAgIChkcm9wKT1cImRheS5kcmFnT3ZlciA9IGZhbHNlOyBldmVudERyb3BwZWQoZGF5LCAkZXZlbnQuZHJvcERhdGEuZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6ICRldmVudC5ldmVudH0pXCI+XG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci1tb250aC1jZWxsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxtd2wtY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzXG4gICAgICAgICAgICBbaXNPcGVuXT1cIm9wZW5Sb3dJbmRleCA9PT0gcm93SW5kZXhcIlxuICAgICAgICAgICAgW2V2ZW50c109XCJvcGVuRGF5Py5ldmVudHNcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cIm9wZW5EYXlFdmVudHNUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHtldmVudDogJGV2ZW50LmV2ZW50fSlcIj5cbiAgICAgICAgICA8L213bC1jYWxlbmRhci1vcGVuLWRheS1ldmVudHM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXcuXG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IHdpbGwgYmUgaGlkZGVuIG9uIHRoZSB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZXZlbnRzIGxpc3QgZm9yIHRoZSBkYXkgb2YgdGhlIGB2aWV3RGF0ZWAgb3B0aW9uIGlzIHZpc2libGUgb3Igbm90XG4gICAqL1xuICBASW5wdXQoKSBhY3RpdmVEYXlJc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZWZyZXNoOiBTdWJqZWN0PGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcbiAgICovXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgd2Vla1N0YXJ0c09uOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgZGF5IGNlbGxcbiAgICovXG4gIEBJbnB1dCgpIGNlbGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgc2xpZGUgZG93biBib3ggb2YgZXZlbnRzIGZvciB0aGUgYWN0aXZlIGRheVxuICAgKi9cbiAgQElucHV0KCkgb3BlbkRheUV2ZW50c1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgaW5kaWNhdGUgd2hpY2ggZGF5cyBhcmUgd2Vla2VuZHNcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtlbmREYXlzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogQW4gb3V0cHV0IHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIHRoZSB2aWV3IGlzIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtb250aC5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhIGRheSBpbiB0aGUgYm9keSBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBjZWxsIGVsZW1lbnQgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYmVmb3JlVmlld1JlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJNb250aFZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGRheSBjZWxsIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBkYXlDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF5OiBNb250aFZpZXdEYXk7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IGlzIGRyYWdnZWQgYW5kIGRyb3BwZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudFRpbWVzQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgQ2FsZW5kYXJNb250aFZpZXdFdmVudFRpbWVzQ2hhbmdlZEV2ZW50XG4gID4oKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29sdW1uSGVhZGVyczogV2Vla0RheVtdO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2aWV3OiBNb250aFZpZXc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG9wZW5Sb3dJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBvcGVuRGF5OiBNb250aFZpZXdEYXk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlZnJlc2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUluZGV4ID0gdHJhY2tCeUluZGV4O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5RGF0ZSA9IChpbmRleDogbnVtYmVyLCBkYXk6IE1vbnRoVmlld0RheSkgPT4gZGF5LmRhdGUudG9JU09TdHJpbmcoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdXRpbHM6IENhbGVuZGFyVXRpbHMsXG4gICAgQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nXG4gICkge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cyB8fCBjaGFuZ2VzLndlZWtlbmREYXlzKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5c1xuICAgICkge1xuICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMuYWN0aXZlRGF5SXNPcGVuIHx8XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV2ZW50cyB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5c1xuICAgICkge1xuICAgICAgdGhpcy5jaGVja0FjdGl2ZURheUlzT3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdG9nZ2xlRGF5SGlnaGxpZ2h0KGV2ZW50OiBDYWxlbmRhckV2ZW50LCBpc0hpZ2hsaWdodGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy52aWV3LmRheXMuZm9yRWFjaChkYXkgPT4ge1xuICAgICAgaWYgKGlzSGlnaGxpZ2h0ZWQgJiYgZGF5LmV2ZW50cy5pbmRleE9mKGV2ZW50KSA+IC0xKSB7XG4gICAgICAgIGRheS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgIChldmVudC5jb2xvciAmJiBldmVudC5jb2xvci5zZWNvbmRhcnkpIHx8ICcjRDFFOEZGJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBkYXkuYmFja2dyb3VuZENvbG9yO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJvcHBlZChkYXk6IE1vbnRoVmlld0RheSwgZXZlbnQ6IENhbGVuZGFyRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB5ZWFyOiBudW1iZXIgPSBnZXRZZWFyKGRheS5kYXRlKTtcbiAgICBjb25zdCBtb250aDogbnVtYmVyID0gZ2V0TW9udGgoZGF5LmRhdGUpO1xuICAgIGNvbnN0IGRhdGU6IG51bWJlciA9IGdldERhdGUoZGF5LmRhdGUpO1xuICAgIGNvbnN0IG5ld1N0YXJ0OiBEYXRlID0gc2V0RGF0ZShcbiAgICAgIHNldE1vbnRoKHNldFllYXIoZXZlbnQuc3RhcnQsIHllYXIpLCBtb250aCksXG4gICAgICBkYXRlXG4gICAgKTtcbiAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgIGlmIChldmVudC5lbmQpIHtcbiAgICAgIGNvbnN0IHNlY29uZHNEaWZmOiBudW1iZXIgPSBkaWZmZXJlbmNlSW5TZWNvbmRzKG5ld1N0YXJ0LCBldmVudC5zdGFydCk7XG4gICAgICBuZXdFbmQgPSBhZGRTZWNvbmRzKGV2ZW50LmVuZCwgc2Vjb25kc0RpZmYpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoeyBldmVudCwgbmV3U3RhcnQsIG5ld0VuZCwgZGF5IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGhhbmRsZURheUNsaWNrKGNsaWNrRXZlbnQ6IGFueSwgZGF5OiBNb250aFZpZXdEYXkpIHtcbiAgICAvLyB3aGVuIHVzaW5nIGhhbW1lcmpzLCBzdG9wUHJvcGFnYXRpb24gZG9lc24ndCB3b3JrLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2FuZ3VsYXItY2FsZW5kYXIvaXNzdWVzLzMxOFxuICAgIGlmICghY2xpY2tFdmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYWwtZXZlbnQnKSkge1xuICAgICAgdGhpcy5kYXlDbGlja2VkLmVtaXQoeyBkYXkgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1uSGVhZGVycyA9IHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXdIZWFkZXIoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5c1xuICAgIH0pO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEJvZHkoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy51dGlscy5nZXRNb250aFZpZXcoe1xuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXNcbiAgICB9KTtcbiAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQWN0aXZlRGF5SXNPcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZURheUlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5vcGVuRGF5ID0gdGhpcy52aWV3LmRheXMuZmluZChkYXkgPT5cbiAgICAgICAgaXNTYW1lRGF5KGRheS5kYXRlLCB0aGlzLnZpZXdEYXRlKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLnZpZXcuZGF5cy5pbmRleE9mKHRoaXMub3BlbkRheSk7XG4gICAgICB0aGlzLm9wZW5Sb3dJbmRleCA9XG4gICAgICAgIE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLnZpZXcudG90YWxEYXlzVmlzaWJsZUluV2VlaykgKlxuICAgICAgICB0aGlzLnZpZXcudG90YWxEYXlzVmlzaWJsZUluV2VlaztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuUm93SW5kZXggPSBudWxsO1xuICAgICAgdGhpcy5vcGVuRGF5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5IZWFkZXJzID0gbnVsbDtcbiAgICB0aGlzLnZpZXcgPSBudWxsO1xuICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xuICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB0aGlzLmNoZWNrQWN0aXZlRGF5SXNPcGVuKCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbkhlYWRlcnMgJiYgdGhpcy52aWV3KSB7XG4gICAgICB0aGlzLmJlZm9yZVZpZXdSZW5kZXIuZW1pdCh7XG4gICAgICAgIGhlYWRlcjogdGhpcy5jb2x1bW5IZWFkZXJzLFxuICAgICAgICBib2R5OiB0aGlzLnZpZXcuZGF5cyxcbiAgICAgICAgcGVyaW9kOiB0aGlzLnZpZXcucGVyaW9kXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWVrRGF5IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtdmlldy1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheXM9XCJkYXlzXCJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtY2VsbC1yb3cgY2FsLWhlYWRlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtY2VsbFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OnRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1wYXN0XT1cImRheS5pc1Bhc3RcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtdG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtZnV0dXJlXT1cImRheS5pc0Z1dHVyZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC13ZWVrZW5kXT1cImRheS5pc1dlZWtlbmRcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImRheS5jc3NDbGFzc1wiPlxuICAgICAgICAgIHt7IGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOidtb250aFZpZXdDb2x1bW5IZWFkZXInOmxvY2FsZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkYXlzOiBkYXlzLCBsb2NhbGU6IGxvY2FsZX1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF5czogV2Vla0RheVtdO1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZTtcbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vbnRoVmlld0RheSwgQ2FsZW5kYXJFdmVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlFdmVudElkIH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItbW9udGgtY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZGF5PVwiZGF5XCJcbiAgICAgIGxldC1vcGVuRGF5PVwib3BlbkRheVwiXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCJcbiAgICAgIGxldC10b29sdGlwUGxhY2VtZW50PVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICBsZXQtaGlnaGxpZ2h0RGF5PVwiaGlnaGxpZ2h0RGF5XCJcbiAgICAgIGxldC11bmhpZ2hsaWdodERheT1cInVuaGlnaGxpZ2h0RGF5XCJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIlxuICAgICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBsZXQtdG9vbHRpcEFwcGVuZFRvQm9keT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtY2VsbC10b3BcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtZGF5LWJhZGdlXCIgKm5nSWY9XCJkYXkuYmFkZ2VUb3RhbCA+IDBcIj57eyBkYXkuYmFkZ2VUb3RhbCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtZGF5LW51bWJlclwiPnt7IGRheS5kYXRlIHwgY2FsZW5kYXJEYXRlOidtb250aFZpZXdEYXlOdW1iZXInOmxvY2FsZSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHNcIiAqbmdJZj1cImRheS5ldmVudHMubGVuZ3RoID4gMFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiBkYXkuZXZlbnRzOyB0cmFja0J5OnRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImV2ZW50LmNvbG9yPy5wcmltYXJ5XCJcbiAgICAgICAgICBbbmdDbGFzc109XCJldmVudD8uY3NzQ2xhc3NcIlxuICAgICAgICAgIChtb3VzZWVudGVyKT1cImhpZ2hsaWdodERheS5lbWl0KHtldmVudDogZXZlbnR9KVwiXG4gICAgICAgICAgKG1vdXNlbGVhdmUpPVwidW5oaWdobGlnaHREYXkuZW1pdCh7ZXZlbnQ6IGV2ZW50fSlcIlxuICAgICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6J21vbnRoVG9vbHRpcCc6ZXZlbnRcIlxuICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgIFt0b29sdGlwRXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICBbZHJvcERhdGFdPVwie2V2ZW50OiBldmVudH1cIlxuICAgICAgICAgIFtkcmFnQXhpc109XCJ7eDogZXZlbnQuZHJhZ2dhYmxlLCB5OiBldmVudC5kcmFnZ2FibGV9XCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBldmVudDogZXZlbnQgfSlcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBvcGVuRGF5OiBvcGVuRGF5LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudDogdG9vbHRpcFBsYWNlbWVudCxcbiAgICAgICAgaGlnaGxpZ2h0RGF5OiBoaWdobGlnaHREYXksXG4gICAgICAgIHVuaGlnaGxpZ2h0RGF5OiB1bmhpZ2hsaWdodERheSxcbiAgICAgICAgZXZlbnRDbGlja2VkOiBldmVudENsaWNrZWQsXG4gICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogdG9vbHRpcFRlbXBsYXRlLFxuICAgICAgICB0b29sdGlwQXBwZW5kVG9Cb2R5OiB0b29sdGlwQXBwZW5kVG9Cb2R5XG4gICAgICB9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnY2FsLWNlbGwgY2FsLWRheS1jZWxsJyxcbiAgICAnW2NsYXNzLmNhbC1wYXN0XSc6ICdkYXkuaXNQYXN0JyxcbiAgICAnW2NsYXNzLmNhbC10b2RheV0nOiAnZGF5LmlzVG9kYXknLFxuICAgICdbY2xhc3MuY2FsLWZ1dHVyZV0nOiAnZGF5LmlzRnV0dXJlJyxcbiAgICAnW2NsYXNzLmNhbC13ZWVrZW5kXSc6ICdkYXkuaXNXZWVrZW5kJyxcbiAgICAnW2NsYXNzLmNhbC1pbi1tb250aF0nOiAnZGF5LmluTW9udGgnLFxuICAgICdbY2xhc3MuY2FsLW91dC1tb250aF0nOiAnIWRheS5pbk1vbnRoJyxcbiAgICAnW2NsYXNzLmNhbC1oYXMtZXZlbnRzXSc6ICdkYXkuZXZlbnRzLmxlbmd0aCA+IDAnLFxuICAgICdbY2xhc3MuY2FsLW9wZW5dJzogJ2RheSA9PT0gb3BlbkRheScsXG4gICAgJ1tzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdJzogJ2RheS5iYWNrZ3JvdW5kQ29sb3InXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXk6IE1vbnRoVmlld0RheTtcblxuICBASW5wdXQoKSBvcGVuRGF5OiBNb250aFZpZXdEYXk7XG5cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBoaWdobGlnaHREYXk6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSB1bmhpZ2hsaWdodERheTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgfT4oKTtcblxuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZXZlbnRzPVwiZXZlbnRzXCJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIGV2ZW50czsgdHJhY2tCeTp0cmFja0J5RXZlbnRJZFwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImV2ZW50Py5jc3NDbGFzc1wiXG4gICAgICAgIG13bERyYWdnYWJsZVxuICAgICAgICBbZHJvcERhdGFdPVwie2V2ZW50OiBldmVudH1cIlxuICAgICAgICBbZHJhZ0F4aXNdPVwie3g6IGV2ZW50LmRyYWdnYWJsZSwgeTogZXZlbnQuZHJhZ2dhYmxlfVwiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwiY2FsLWV2ZW50XCJcbiAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImV2ZW50LmNvbG9yPy5wcmltYXJ5XCI+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgJm5nc3A7XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGVcbiAgICAgICAgICBbZXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgIHZpZXc9XCJtb250aFwiXG4gICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHtldmVudDogZXZlbnR9KVwiPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC10aXRsZT5cbiAgICAgICAgJm5nc3A7XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucyBbZXZlbnRdPVwiZXZlbnRcIj48L213bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiY2FsLW9wZW4tZGF5LWV2ZW50c1wiIFtAY29sbGFwc2VdICpuZ0lmPVwiaXNPcGVuXCI+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZFxuICAgICAgICB9XCI+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignY29sbGFwc2UnLCBbXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAwLCBvdmVyZmxvdzogJ2hpZGRlbicgfSksXG4gICAgICAgIGFuaW1hdGUoJzE1MG1zJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSlcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvdmVyZmxvdzogJ2hpZGRlbicgfSksXG4gICAgICAgIGFuaW1hdGUoJzE1MG1zJywgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpXG4gICAgICBdKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJPcGVuRGF5RXZlbnRzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W107XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgdHJhY2tCeUV2ZW50SWQgPSB0cmFja0J5RXZlbnRJZDtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRHJhZ0FuZERyb3BNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyT3BlbkRheUV2ZW50c0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckNvbW1vbk1vZHVsZSB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcblxuZXhwb3J0IHtcbiAgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQsXG4gIENhbGVuZGFyTW9udGhWaWV3QmVmb3JlUmVuZGVyRXZlbnQsXG4gIENhbGVuZGFyTW9udGhWaWV3RXZlbnRUaW1lc0NoYW5nZWRFdmVudFxufSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcbmV4cG9ydCB7IE1vbnRoVmlld0RheSBhcyBDYWxlbmRhck1vbnRoVmlld0RheSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRHJhZ0FuZERyb3BNb2R1bGUsIENhbGVuZGFyQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJNb250aENlbGxDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJPcGVuRGF5RXZlbnRzQ29tcG9uZW50LFxuICAgIENhbGVuZGFyTW9udGhWaWV3SGVhZGVyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCxcbiAgICBDYWxlbmRhck1vbnRoQ2VsbENvbXBvbmVudCxcbiAgICBDYWxlbmRhck9wZW5EYXlFdmVudHNDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJNb250aFZpZXdIZWFkZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoTW9kdWxlIHt9XG4iLCJpbXBvcnQgeyBpc0luc2lkZSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRyYWdIZWxwZXIge1xuICBzdGFydFBvc2l0aW9uOiBDbGllbnRSZWN0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZHJhZ0NvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGRyYWdnYWJsZUVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICkge1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IGRyYWdnYWJsZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICB2YWxpZGF0ZURyYWcoeyB4LCB5IH06IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5ld1JlY3Q6IENsaWVudFJlY3QgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXJ0UG9zaXRpb24sIHtcbiAgICAgIGxlZnQ6IHRoaXMuc3RhcnRQb3NpdGlvbi5sZWZ0ICsgeCxcbiAgICAgIHJpZ2h0OiB0aGlzLnN0YXJ0UG9zaXRpb24ucmlnaHQgKyB4LFxuICAgICAgdG9wOiB0aGlzLnN0YXJ0UG9zaXRpb24udG9wICsgeSxcbiAgICAgIGJvdHRvbTogdGhpcy5zdGFydFBvc2l0aW9uLmJvdHRvbSArIHlcbiAgICB9KTtcblxuICAgIHJldHVybiBpc0luc2lkZSh0aGlzLmRyYWdDb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBuZXdSZWN0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNJbnNpZGUgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSZXNpemVIZWxwZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlc2l6ZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHByaXZhdGUgbWluV2lkdGg/OiBudW1iZXJcbiAgKSB7fVxuXG4gIHZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH06IHsgcmVjdGFuZ2xlOiBDbGllbnRSZWN0IH0pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5taW5XaWR0aCAmJiByZWN0YW5nbGUud2lkdGggPCB0aGlzLm1pbldpZHRoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzSW5zaWRlKFxuICAgICAgdGhpcy5yZXNpemVDb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgcmVjdGFuZ2xlXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBMT0NBTEVfSUQsXG4gIEluamVjdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIFdlZWtEYXksXG4gIENhbGVuZGFyRXZlbnQsXG4gIFdlZWtWaWV3RXZlbnQsXG4gIFdlZWtWaWV3LFxuICBWaWV3UGVyaW9kXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IFJlc2l6ZUV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemFibGUtZWxlbWVudCc7XG5pbXBvcnQgYWRkRGF5cyBmcm9tICdkYXRlLWZucy9hZGRfZGF5cy9pbmRleCc7XG5pbXBvcnQgeyBDYWxlbmRhckRyYWdIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJSZXNpemVIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlcic7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtdGltZXMtY2hhbmdlZC1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci11dGlscy5wcm92aWRlcic7XG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50cywgdHJhY2tCeUluZGV4IH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdlZWtWaWV3RXZlbnRSZXNpemUge1xuICBvcmlnaW5hbE9mZnNldDogbnVtYmVyO1xuICBvcmlnaW5hbFNwYW46IG51bWJlcjtcbiAgZWRnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudCB7XG4gIGhlYWRlcjogV2Vla0RheVtdO1xuICBwZXJpb2Q6IFZpZXdQZXJpb2Q7XG59XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIHdlZWsuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPG13bC1jYWxlbmRhci13ZWVrLXZpZXdcbiAqICBbdmlld0RhdGVdPVwidmlld0RhdGVcIlxuICogIFtldmVudHNdPVwiZXZlbnRzXCI+XG4gKiA8L213bC1jYWxlbmRhci13ZWVrLXZpZXc+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC13ZWVrLXZpZXdcIiAjd2Vla1ZpZXdDb250YWluZXI+XG4gICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1oZWFkZXJcbiAgICAgICAgW2RheXNdPVwiZGF5c1wiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgKGRheUhlYWRlckNsaWNrZWQpPVwiZGF5SGVhZGVyQ2xpY2tlZC5lbWl0KCRldmVudClcIlxuICAgICAgICAoZXZlbnREcm9wcGVkKT1cImV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlcj5cbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGV2ZW50Um93IG9mIHZpZXcuZXZlbnRSb3dzOyB0cmFja0J5OnRyYWNrQnlJbmRleFwiICNldmVudFJvd0NvbnRhaW5lciBjbGFzcz1cImNhbC1ldmVudHMtcm93XCI+XG4gICAgICAgIGJlZm9yZSEhPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCB3ZWVrRXZlbnQgb2YgZXZlbnRSb3cucm93OyB0cmFja0J5OnRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgICAjZXZlbnRcbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cIndlZWtFdmVudC5ldmVudC5kcmFnZ2FibGVcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi13ZWVrXT1cIiF3ZWVrRXZlbnQuc3RhcnRzQmVmb3JlV2Vla1wiXG4gICAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi13ZWVrXT1cIiF3ZWVrRXZlbnQuZW5kc0FmdGVyV2Vla1wiXG4gICAgICAgICAgW25nQ2xhc3NdPVwid2Vla0V2ZW50LmV2ZW50Py5jc3NDbGFzc1wiXG4gICAgICAgICAgW3N0eWxlLndpZHRoXT1cIigoMTAwIC8gZGF5cy5sZW5ndGgpICogd2Vla0V2ZW50LnNwYW4pICsgJyUnXCJcbiAgICAgICAgICBbc3R5bGUubWFyZ2luTGVmdF09XCIoKDEwMCAvIGRheXMubGVuZ3RoKSAqIHdlZWtFdmVudC5vZmZzZXQpICsgJyUnXCJcbiAgICAgICAgICBtd2xSZXNpemFibGVcbiAgICAgICAgICBbcmVzaXplRWRnZXNdPVwie2xlZnQ6IHdlZWtFdmVudC5ldmVudD8ucmVzaXphYmxlPy5iZWZvcmVTdGFydCwgcmlnaHQ6IHdlZWtFdmVudC5ldmVudD8ucmVzaXphYmxlPy5hZnRlckVuZH1cIlxuICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7bGVmdDogZGF5Q29sdW1uV2lkdGgsIHJpZ2h0OiBkYXlDb2x1bW5XaWR0aH1cIlxuICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXG4gICAgICAgICAgKHJlc2l6ZVN0YXJ0KT1cInJlc2l6ZVN0YXJ0ZWQod2Vla1ZpZXdDb250YWluZXIsIHdlZWtFdmVudCwgJGV2ZW50KVwiXG4gICAgICAgICAgKHJlc2l6aW5nKT1cInJlc2l6aW5nKHdlZWtFdmVudCwgJGV2ZW50LCBkYXlDb2x1bW5XaWR0aClcIlxuICAgICAgICAgIChyZXNpemVFbmQpPVwicmVzaXplRW5kZWQod2Vla0V2ZW50KVwiXG4gICAgICAgICAgbXdsRHJhZ2dhYmxlXG4gICAgICAgICAgW2RyYWdBeGlzXT1cInt4OiB3ZWVrRXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIGN1cnJlbnRSZXNpemVzLnNpemUgPT09IDAsIHk6IGZhbHNlfVwiXG4gICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJ7eDogZGF5Q29sdW1uV2lkdGh9XCJcbiAgICAgICAgICBbdmFsaWRhdGVEcmFnXT1cInZhbGlkYXRlRHJhZ1wiXG4gICAgICAgICAgKGRyYWdQb2ludGVyRG93bik9XCJkcmFnU3RhcnQod2Vla1ZpZXdDb250YWluZXIsIGV2ZW50KVwiXG4gICAgICAgICAgKGRyYWdFbmQpPVwiZXZlbnREcmFnZ2VkKHdlZWtFdmVudCwgJGV2ZW50LngsIGRheUNvbHVtbldpZHRoKVwiPlxuICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50XG4gICAgICAgICAgICBbd2Vla0V2ZW50XT1cIndlZWtFdmVudFwiXG4gICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJldmVudENsaWNrZWQuZW1pdCh7ZXZlbnQ6IHdlZWtFdmVudC5ldmVudH0pXCI+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgd2lsbCBiZSBoaWRkZW4gb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xuICAgKi9cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IHN0cmluZyA9ICdib3R0b20nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RhcnQgbnVtYmVyIG9mIHRoZSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSB3ZWVrU3RhcnRzT246IG51bWJlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhlYWRlclxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3Igd2VlayB2aWV3IGV2ZW50c1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogVGhlIHByZWNpc2lvbiB0byBkaXNwbGF5IGV2ZW50cy5cbiAgICogYGRheXNgIHdpbGwgcm91bmQgZXZlbnQgc3RhcnQgYW5kIGVuZCBkYXRlcyB0byB0aGUgbmVhcmVzdCBkYXkgYW5kIGBtaW51dGVzYCB3aWxsIG5vdCBkbyB0aGlzIHJvdW5kaW5nXG4gICAqL1xuICBASW5wdXQoKSBwcmVjaXNpb246ICdkYXlzJyB8ICdtaW51dGVzJyA9ICdkYXlzJztcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IGluZGljYXRlIHdoaWNoIGRheXMgYXJlIHdlZWtlbmRzXG4gICAqL1xuICBASW5wdXQoKSB3ZWVrZW5kRGF5czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgaGVhZGVyIHdlZWsgZGF5IGlzIGNsaWNrZWQuIEFkZGluZyBhIGBjc3NDbGFzc2AgcHJvcGVydHkgb24gYCRldmVudC5kYXlgIHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGhlYWRlciBlbGVtZW50XG4gICAqL1xuICBAT3V0cHV0KClcbiAgZGF5SGVhZGVyQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZGF5OiBXZWVrRGF5IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF5OiBXZWVrRGF5O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGV2ZW50Q2xpY2tlZDogRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IENhbGVuZGFyRXZlbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgcmVzaXplZCBvciBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRUaW1lc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxcbiAgICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnRcbiAgPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBvdXRwdXQgdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgdGhlIHZpZXcgaXMgcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IHdlZWsuXG4gICAqIElmIHlvdSBhZGQgdGhlIGBjc3NDbGFzc2AgcHJvcGVydHkgdG8gYSBkYXkgaW4gdGhlIGhlYWRlciBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBjZWxsIGVsZW1lbnQgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYmVmb3JlVmlld1JlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJXZWVrVmlld0JlZm9yZVJlbmRlckV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkYXlzOiBXZWVrRGF5W107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZpZXc6IFdlZWtWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGN1cnJlbnRSZXNpemVzOiBNYXA8V2Vla1ZpZXdFdmVudCwgV2Vla1ZpZXdFdmVudFJlc2l6ZT4gPSBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZhbGlkYXRlRHJhZzogKGFyZ3M6IGFueSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVSZXNpemU6IChhcmdzOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRheUNvbHVtbldpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlJbmRleCA9IHRyYWNrQnlJbmRleDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUV2ZW50SWQgPSAoaW5kZXg6IG51bWJlciwgd2Vla0V2ZW50OiBXZWVrVmlld0V2ZW50KSA9PlxuICAgIHdlZWtFdmVudC5ldmVudC5pZCA/IHdlZWtFdmVudC5ldmVudC5pZCA6IHdlZWtFdmVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgdXRpbHM6IENhbGVuZGFyVXRpbHMsXG4gICAgQEluamVjdChMT0NBTEVfSUQpIGxvY2FsZTogc3RyaW5nXG4gICkge1xuICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cyB8fCBjaGFuZ2VzLndlZWtlbmREYXlzKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMgfHwgY2hhbmdlcy52aWV3RGF0ZSB8fCBjaGFuZ2VzLmV4Y2x1ZGVEYXlzKSB7XG4gICAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZXNpemVTdGFydGVkKFxuICAgIHdlZWtWaWV3Q29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFJlc2l6ZXMuc2V0KHdlZWtFdmVudCwge1xuICAgICAgb3JpZ2luYWxPZmZzZXQ6IHdlZWtFdmVudC5vZmZzZXQsXG4gICAgICBvcmlnaW5hbFNwYW46IHdlZWtFdmVudC5zcGFuLFxuICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgIT09ICd1bmRlZmluZWQnID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgIH0pO1xuICAgIHRoaXMuZGF5Q29sdW1uV2lkdGggPSB0aGlzLmdldERheUNvbHVtbldpZHRoKHdlZWtWaWV3Q29udGFpbmVyKTtcbiAgICBjb25zdCByZXNpemVIZWxwZXI6IENhbGVuZGFyUmVzaXplSGVscGVyID0gbmV3IENhbGVuZGFyUmVzaXplSGVscGVyKFxuICAgICAgd2Vla1ZpZXdDb250YWluZXIsXG4gICAgICB0aGlzLmRheUNvbHVtbldpZHRoXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlUmVzaXplID0gKHsgcmVjdGFuZ2xlIH0pID0+XG4gICAgICByZXNpemVIZWxwZXIudmFsaWRhdGVSZXNpemUoeyByZWN0YW5nbGUgfSk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcmVzaXppbmcoXG4gICAgd2Vla0V2ZW50OiBXZWVrVmlld0V2ZW50LFxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCxcbiAgICBkYXlXaWR0aDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRSZXNpemU6IFdlZWtWaWV3RXZlbnRSZXNpemUgPSB0aGlzLmN1cnJlbnRSZXNpemVzLmdldChcbiAgICAgIHdlZWtFdmVudFxuICAgICk7XG5cbiAgICBpZiAocmVzaXplRXZlbnQuZWRnZXMubGVmdCkge1xuICAgICAgY29uc3QgZGlmZjogbnVtYmVyID0gTWF0aC5yb3VuZCgrcmVzaXplRXZlbnQuZWRnZXMubGVmdCAvIGRheVdpZHRoKTtcbiAgICAgIHdlZWtFdmVudC5vZmZzZXQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0ICsgZGlmZjtcbiAgICAgIHdlZWtFdmVudC5zcGFuID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW4gLSBkaWZmO1xuICAgIH0gZWxzZSBpZiAocmVzaXplRXZlbnQuZWRnZXMucmlnaHQpIHtcbiAgICAgIGNvbnN0IGRpZmY6IG51bWJlciA9IE1hdGgucm91bmQoK3Jlc2l6ZUV2ZW50LmVkZ2VzLnJpZ2h0IC8gZGF5V2lkdGgpO1xuICAgICAgd2Vla0V2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiArIGRpZmY7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHJlc2l6ZUVuZGVkKHdlZWtFdmVudDogV2Vla1ZpZXdFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRSZXNpemU6IFdlZWtWaWV3RXZlbnRSZXNpemUgPSB0aGlzLmN1cnJlbnRSZXNpemVzLmdldChcbiAgICAgIHdlZWtFdmVudFxuICAgICk7XG5cbiAgICBsZXQgZGF5c0RpZmY6IG51bWJlcjtcbiAgICBpZiAoY3VycmVudFJlc2l6ZS5lZGdlID09PSAnbGVmdCcpIHtcbiAgICAgIGRheXNEaWZmID0gd2Vla0V2ZW50Lm9mZnNldCAtIGN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheXNEaWZmID0gd2Vla0V2ZW50LnNwYW4gLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbjtcbiAgICB9XG5cbiAgICB3ZWVrRXZlbnQub2Zmc2V0ID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbE9mZnNldDtcbiAgICB3ZWVrRXZlbnQuc3BhbiA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxTcGFuO1xuXG4gICAgbGV0IG5ld1N0YXJ0OiBEYXRlID0gd2Vla0V2ZW50LmV2ZW50LnN0YXJ0O1xuICAgIGxldCBuZXdFbmQ6IERhdGUgPSB3ZWVrRXZlbnQuZXZlbnQuZW5kO1xuICAgIGlmIChjdXJyZW50UmVzaXplLmVkZ2UgPT09ICdsZWZ0Jykge1xuICAgICAgbmV3U3RhcnQgPSBhZGREYXlzKG5ld1N0YXJ0LCBkYXlzRGlmZik7XG4gICAgfSBlbHNlIGlmIChuZXdFbmQpIHtcbiAgICAgIG5ld0VuZCA9IGFkZERheXMobmV3RW5kLCBkYXlzRGlmZik7XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHsgbmV3U3RhcnQsIG5ld0VuZCwgZXZlbnQ6IHdlZWtFdmVudC5ldmVudCB9KTtcbiAgICB0aGlzLmN1cnJlbnRSZXNpemVzLmRlbGV0ZSh3ZWVrRXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJhZ2dlZChcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3RXZlbnQsXG4gICAgZHJhZ2dlZEJ5UHg6IG51bWJlcixcbiAgICBkYXlXaWR0aDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGRheXNEcmFnZ2VkOiBudW1iZXIgPSBkcmFnZ2VkQnlQeCAvIGRheVdpZHRoO1xuICAgIGNvbnN0IG5ld1N0YXJ0OiBEYXRlID0gYWRkRGF5cyh3ZWVrRXZlbnQuZXZlbnQuc3RhcnQsIGRheXNEcmFnZ2VkKTtcbiAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgIGlmICh3ZWVrRXZlbnQuZXZlbnQuZW5kKSB7XG4gICAgICBuZXdFbmQgPSBhZGREYXlzKHdlZWtFdmVudC5ldmVudC5lbmQsIGRheXNEcmFnZ2VkKTtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoeyBuZXdTdGFydCwgbmV3RW5kLCBldmVudDogd2Vla0V2ZW50LmV2ZW50IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGdldERheUNvbHVtbldpZHRoKGV2ZW50Um93Q29udGFpbmVyOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZXZlbnRSb3dDb250YWluZXIub2Zmc2V0V2lkdGggLyB0aGlzLmRheXMubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnU3RhcnQod2Vla1ZpZXdDb250YWluZXI6IEhUTUxFbGVtZW50LCBldmVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmRheUNvbHVtbldpZHRoID0gdGhpcy5nZXREYXlDb2x1bW5XaWR0aCh3ZWVrVmlld0NvbnRhaW5lcik7XG4gICAgY29uc3QgZHJhZ0hlbHBlcjogQ2FsZW5kYXJEcmFnSGVscGVyID0gbmV3IENhbGVuZGFyRHJhZ0hlbHBlcihcbiAgICAgIHdlZWtWaWV3Q29udGFpbmVyLFxuICAgICAgZXZlbnRcbiAgICApO1xuICAgIHRoaXMudmFsaWRhdGVEcmFnID0gKHsgeCwgeSB9KSA9PlxuICAgICAgdGhpcy5jdXJyZW50UmVzaXplcy5zaXplID09PSAwICYmIGRyYWdIZWxwZXIudmFsaWRhdGVEcmFnKHsgeCwgeSB9KTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEhlYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmRheXMgPSB0aGlzLnV0aWxzLmdldFdlZWtWaWV3SGVhZGVyKHtcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXNcbiAgICB9KTtcbiAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXcoe1xuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgd2Vla1N0YXJ0c09uOiB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVkOiB0aGlzLmV4Y2x1ZGVEYXlzLFxuICAgICAgcHJlY2lzaW9uOiB0aGlzLnByZWNpc2lvbixcbiAgICAgIGFic29sdXRlUG9zaXRpb25lZEV2ZW50czogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRCZWZvcmVWaWV3UmVuZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRheXMgJiYgdGhpcy52aWV3KSB7XG4gICAgICB0aGlzLmJlZm9yZVZpZXdSZW5kZXIuZW1pdCh7XG4gICAgICAgIGhlYWRlcjogdGhpcy5kYXlzLFxuICAgICAgICBwZXJpb2Q6IHRoaXMudmlldy5wZXJpb2RcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJFdmVudCwgV2Vla0RheSB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLXdlZWstdmlldy1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWRheXM9XCJkYXlzXCJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIlxuICAgICAgbGV0LWRheUhlYWRlckNsaWNrZWQ9XCJkYXlIZWFkZXJDbGlja2VkXCJcbiAgICAgIGxldC1ldmVudERyb3BwZWQ9XCJldmVudERyb3BwZWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LWhlYWRlcnNcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY2FsLWhlYWRlclwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OnRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC1wYXN0XT1cImRheS5pc1Bhc3RcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtdG9kYXldPVwiZGF5LmlzVG9kYXlcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtZnV0dXJlXT1cImRheS5pc0Z1dHVyZVwiXG4gICAgICAgICAgW2NsYXNzLmNhbC13ZWVrZW5kXT1cImRheS5pc1dlZWtlbmRcIlxuICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZy1vdmVyXT1cImRheS5kcmFnT3ZlclwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiZGF5LmNzc0NsYXNzXCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZGF5SGVhZGVyQ2xpY2tlZC5lbWl0KHtkYXk6IGRheX0pXCJcbiAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAoZHJhZ0VudGVyKT1cImRheS5kcmFnT3ZlciA9IHRydWVcIlxuICAgICAgICAgIChkcmFnTGVhdmUpPVwiZGF5LmRyYWdPdmVyID0gZmFsc2VcIlxuICAgICAgICAgIChkcm9wKT1cImRheS5kcmFnT3ZlciA9IGZhbHNlOyBldmVudERyb3BwZWQuZW1pdCh7ZXZlbnQ6ICRldmVudC5kcm9wRGF0YS5ldmVudCwgbmV3U3RhcnQ6IGRheS5kYXRlfSlcIj5cbiAgICAgICAgICA8Yj57eyBkYXkuZGF0ZSB8IGNhbGVuZGFyRGF0ZTond2Vla1ZpZXdDb2x1bW5IZWFkZXInOmxvY2FsZSB9fTwvYj48YnI+XG4gICAgICAgICAgPHNwYW4+e3sgZGF5LmRhdGUgfCBjYWxlbmRhckRhdGU6J3dlZWtWaWV3Q29sdW1uU3ViSGVhZGVyJzpsb2NhbGUgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2RheXM6IGRheXMsIGxvY2FsZTogbG9jYWxlLCBkYXlIZWFkZXJDbGlja2VkOiBkYXlIZWFkZXJDbGlja2VkLCBldmVudERyb3BwZWQ6IGV2ZW50RHJvcHBlZH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBkYXlzOiBXZWVrRGF5W107XG5cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQE91dHB1dCgpXG4gIGRheUhlYWRlckNsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGRheTogV2Vla0RheSB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGRheTogV2Vla0RheTtcbiAgfT4oKTtcblxuICBAT3V0cHV0KClcbiAgZXZlbnREcm9wcGVkOiBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgIG5ld1N0YXJ0OiBEYXRlO1xuICB9PiA9IG5ldyBFdmVudEVtaXR0ZXI8eyBldmVudDogQ2FsZW5kYXJFdmVudDsgbmV3U3RhcnQ6IERhdGUgfT4oKTtcblxuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWVrVmlld0V2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC13ZWVrRXZlbnQ9XCJ3ZWVrRXZlbnRcIlxuICAgICAgbGV0LXRvb2x0aXBQbGFjZW1lbnQ9XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIGxldC1ldmVudENsaWNrZWQ9XCJldmVudENsaWNrZWRcIlxuICAgICAgbGV0LXRvb2x0aXBUZW1wbGF0ZT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICBsZXQtdG9vbHRpcEFwcGVuZFRvQm9keT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cIndlZWtFdmVudC5ldmVudC5jb2xvcj8uc2Vjb25kYXJ5XCJcbiAgICAgICAgW3N0eWxlLmJvcmRlckNvbG9yXT1cIndlZWtFdmVudC5ldmVudC5jb2xvcj8ucHJpbWFyeVwiXG4gICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwid2Vla0V2ZW50LmV2ZW50LnRpdGxlIHwgY2FsZW5kYXJFdmVudFRpdGxlOid3ZWVrVG9vbHRpcCc6d2Vla0V2ZW50LmV2ZW50XCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgIFt0b29sdGlwRXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCJcbiAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCI+XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucyBbZXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCI+PC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgICAgJm5nc3A7XG4gICAgICAgIDxtd2wtY2FsZW5kYXItZXZlbnQtdGl0bGVcbiAgICAgICAgICBbZXZlbnRdPVwid2Vla0V2ZW50LmV2ZW50XCJcbiAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICB2aWV3PVwid2Vla1wiXG4gICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KClcIj5cbiAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtdGl0bGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIHdlZWtFdmVudDogd2Vla0V2ZW50LFxuICAgICAgICB0b29sdGlwUGxhY2VtZW50OiB0b29sdGlwUGxhY2VtZW50LFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcbiAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiB0b29sdGlwVGVtcGxhdGUsXG4gICAgICAgIHRvb2x0aXBBcHBlbmRUb0JvZHk6IHRvb2x0aXBBcHBlbmRUb0JvZHlcbiAgICAgIH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHdlZWtFdmVudDogV2Vla1ZpZXdFdmVudDtcblxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNpemFibGVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6YWJsZS1lbGVtZW50JztcbmltcG9ydCB7IERyYWdBbmREcm9wTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcbmltcG9ydCB7IENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJXZWVrVmlld0V2ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyQ29tbW9uTW9kdWxlIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWNvbW1vbi5tb2R1bGUnO1xuXG5leHBvcnQge1xuICBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50LFxuICBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnRcbn0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50JztcbmV4cG9ydCB7XG4gIFdlZWtWaWV3RXZlbnQgYXMgQ2FsZW5kYXJXZWVrVmlld0V2ZW50LFxuICBXZWVrVmlld0V2ZW50Um93IGFzIENhbGVuZGFyV2Vla1ZpZXdFdmVudFJvdyxcbiAgR2V0V2Vla1ZpZXdBcmdzIGFzIENhbGVuZGFyR2V0V2Vla1ZpZXdBcmdzXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZXNpemFibGVNb2R1bGUsXG4gICAgRHJhZ0FuZERyb3BNb2R1bGUsXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCxcbiAgICBDYWxlbmRhcldlZWtWaWV3SGVhZGVyQ29tcG9uZW50LFxuICAgIENhbGVuZGFyV2Vla1ZpZXdFdmVudENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUmVzaXphYmxlTW9kdWxlLFxuICAgIERyYWdBbmREcm9wTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJXZWVrVmlld0hlYWRlckNvbXBvbmVudCxcbiAgICBDYWxlbmRhcldlZWtWaWV3RXZlbnRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtNb2R1bGUge31cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBMT0NBTEVfSUQsXG4gIEluamVjdCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgRGF5VmlldyxcbiAgRGF5Vmlld0hvdXIsXG4gIERheVZpZXdIb3VyU2VnbWVudCxcbiAgRGF5Vmlld0V2ZW50LFxuICBWaWV3UGVyaW9kXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUmVzaXplRXZlbnQgfSBmcm9tICdhbmd1bGFyLXJlc2l6YWJsZS1lbGVtZW50JztcbmltcG9ydCBhZGRNaW51dGVzIGZyb20gJ2RhdGUtZm5zL2FkZF9taW51dGVzL2luZGV4JztcbmltcG9ydCB7IENhbGVuZGFyRHJhZ0hlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1kcmFnLWhlbHBlci5wcm92aWRlcic7XG5pbXBvcnQgeyBDYWxlbmRhclJlc2l6ZUhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1yZXNpemUtaGVscGVyLnByb3ZpZGVyJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudCB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcbmltcG9ydCB7IHZhbGlkYXRlRXZlbnRzLCB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudCB7XG4gIGJvZHk6IHtcbiAgICBob3VyR3JpZDogRGF5Vmlld0hvdXJbXTtcbiAgfTtcbiAgcGVyaW9kOiBWaWV3UGVyaW9kO1xufVxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuY29uc3QgTUlOVVRFU19JTl9IT1VSOiBudW1iZXIgPSA2MDtcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGF5Vmlld0V2ZW50UmVzaXplIHtcbiAgb3JpZ2luYWxUb3A6IG51bWJlcjtcbiAgb3JpZ2luYWxIZWlnaHQ6IG51bWJlcjtcbiAgZWRnZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiBkYXkuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogPG13bC1jYWxlbmRhci1kYXktdmlld1xuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gKiAgW2V2ZW50c109XCJldmVudHNcIj5cbiAqIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1kYXktdmlldycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImNhbC1kYXktdmlld1wiICNkYXlWaWV3Q29udGFpbmVyPlxuICAgICAgPG13bC1jYWxlbmRhci1hbGwtZGF5LWV2ZW50XG4gICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiB2aWV3LmFsbERheUV2ZW50czsgdHJhY2tCeTp0cmFja0J5RXZlbnRJZFwiXG4gICAgICAgIFtldmVudF09XCJldmVudFwiXG4gICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJhbGxEYXlFdmVudFRlbXBsYXRlXCJcbiAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHtldmVudDogZXZlbnR9KVwiPlxuICAgICAgPC9td2wtY2FsZW5kYXItYWxsLWRheS1ldmVudD5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtaG91ci1yb3dzXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgI2V2ZW50XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5RXZlbnQgb2Ygdmlldz8uZXZlbnRzOyB0cmFja0J5OnRyYWNrQnlEYXlFdmVudFwiXG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiZGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi1kYXldPVwiIWRheUV2ZW50LnN0YXJ0c0JlZm9yZURheVwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLWRheV09XCIhZGF5RXZlbnQuZW5kc0FmdGVyRGF5XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cImRheUV2ZW50LmV2ZW50LmNzc0NsYXNzXCJcbiAgICAgICAgICAgIG13bFJlc2l6YWJsZVxuICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cInt0b3A6IGRheUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmJlZm9yZVN0YXJ0LCBib3R0b206IGRheUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmFmdGVyRW5kfVwiXG4gICAgICAgICAgICBbcmVzaXplU25hcEdyaWRdPVwie3RvcDogZXZlbnRTbmFwU2l6ZSwgYm90dG9tOiBldmVudFNuYXBTaXplfVwiXG4gICAgICAgICAgICBbdmFsaWRhdGVSZXNpemVdPVwidmFsaWRhdGVSZXNpemVcIlxuICAgICAgICAgICAgKHJlc2l6ZVN0YXJ0KT1cInJlc2l6ZVN0YXJ0ZWQoZGF5RXZlbnQsICRldmVudCwgZGF5Vmlld0NvbnRhaW5lcilcIlxuICAgICAgICAgICAgKHJlc2l6aW5nKT1cInJlc2l6aW5nKGRheUV2ZW50LCAkZXZlbnQpXCJcbiAgICAgICAgICAgIChyZXNpemVFbmQpPVwicmVzaXplRW5kZWQoZGF5RXZlbnQpXCJcbiAgICAgICAgICAgIG13bERyYWdnYWJsZVxuICAgICAgICAgICAgW2RyYWdBeGlzXT1cInt4OiBmYWxzZSwgeTogZGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIGN1cnJlbnRSZXNpemVzLnNpemUgPT09IDB9XCJcbiAgICAgICAgICAgIFtkcmFnU25hcEdyaWRdPVwie3k6IGV2ZW50U25hcFNpemV9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgICAgIChkcmFnUG9pbnRlckRvd24pPVwiZHJhZ1N0YXJ0KGV2ZW50LCBkYXlWaWV3Q29udGFpbmVyKVwiXG4gICAgICAgICAgICAoZHJhZ0VuZCk9XCJldmVudERyYWdnZWQoZGF5RXZlbnQsICRldmVudC55KVwiXG4gICAgICAgICAgICBbc3R5bGUubWFyZ2luVG9wLnB4XT1cImRheUV2ZW50LnRvcFwiXG4gICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImRheUV2ZW50LmhlaWdodFwiXG4gICAgICAgICAgICBbc3R5bGUubWFyZ2luTGVmdC5weF09XCJkYXlFdmVudC5sZWZ0ICsgNzBcIlxuICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImRheUV2ZW50LndpZHRoIC0gMVwiPlxuICAgICAgICAgICAgPG13bC1jYWxlbmRhci1kYXktdmlldy1ldmVudFxuICAgICAgICAgICAgICBbZGF5RXZlbnRdPVwiZGF5RXZlbnRcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbdG9vbHRpcEFwcGVuZFRvQm9keV09XCJ0b29sdGlwQXBwZW5kVG9Cb2R5XCJcbiAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoe2V2ZW50OiBkYXlFdmVudC5ldmVudH0pXCI+XG4gICAgICAgICAgICA8L213bC1jYWxlbmRhci1kYXktdmlldy1ldmVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtaG91clwiICpuZ0Zvcj1cImxldCBob3VyIG9mIGhvdXJzOyB0cmFja0J5OnRyYWNrQnlIb3VyXCIgW3N0eWxlLm1pbldpZHRoLnB4XT1cInZpZXc/LndpZHRoICsgNzBcIj5cbiAgICAgICAgICA8bXdsLWNhbGVuZGFyLWRheS12aWV3LWhvdXItc2VnbWVudFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHNlZ21lbnQgb2YgaG91ci5zZWdtZW50czsgdHJhY2tCeTp0cmFja0J5SG91clNlZ21lbnRcIlxuICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJob3VyU2VnbWVudEhlaWdodFwiXG4gICAgICAgICAgICBbc2VnbWVudF09XCJzZWdtZW50XCJcbiAgICAgICAgICAgIFtzZWdtZW50SGVpZ2h0XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJob3VyU2VnbWVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJob3VyU2VnbWVudENsaWNrZWQuZW1pdCh7ZGF0ZTogc2VnbWVudC5kYXRlfSlcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnLW92ZXJdPVwic2VnbWVudC5kcmFnT3ZlclwiXG4gICAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAgIChkcmFnRW50ZXIpPVwic2VnbWVudC5kcmFnT3ZlciA9IHRydWVcIlxuICAgICAgICAgICAgKGRyYWdMZWF2ZSk9XCJzZWdtZW50LmRyYWdPdmVyID0gZmFsc2VcIlxuICAgICAgICAgICAgKGRyb3ApPVwic2VnbWVudC5kcmFnT3ZlciA9IGZhbHNlOyBldmVudERyb3BwZWQoJGV2ZW50LCBzZWdtZW50KVwiPlxuICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLWRheS12aWV3LWhvdXItc2VnbWVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIGluIGFuIGhvdXIuIE11c3QgYmUgPD0gNlxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRzOiBudW1iZXIgPSAyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IGluIHBpeGVscyBvZiBlYWNoIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlciA9IDMwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlciA9IDIzO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyID0gNTk7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBpbiBwaXhlbHMgb2YgZWFjaCBldmVudCBvbiB0aGUgdmlld1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRXaWR0aDogbnVtYmVyID0gMTUwO1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xuICAgKi9cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIHNpemUgdG8gc25hcCByZXNpemluZyBhbmQgZHJhZ2dpbmcgb2YgZXZlbnRzIHRvXG4gICAqL1xuICBASW5wdXQoKSBldmVudFNuYXBTaXplOiBudW1iZXIgPSB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0O1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmcgPSAndG9wJztcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBhbGwgZGF5IGV2ZW50c1xuICAgKi9cbiAgQElucHV0KCkgYWxsRGF5RXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBkYXkgdmlldyBldmVudHNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgdGl0bGVzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV2ZW50IHRpdGxlIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gaG91ciBzZWdtZW50IGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBob3VyU2VnbWVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBkYXRlOiBEYXRlO1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyByZXNpemVkIG9yIGRyYWdnZWQgYW5kIGRyb3BwZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBldmVudFRpbWVzQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBvdXRwdXQgdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgdGhlIHZpZXcgaXMgcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IGRheS5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhbiBob3VyIGdyaWQgc2VnbWVudCBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBob3VyIHNlZ21lbnQgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYmVmb3JlVmlld1JlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJEYXlWaWV3QmVmb3JlUmVuZGVyRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGhvdXJzOiBEYXlWaWV3SG91cltdID0gW107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZpZXc6IERheVZpZXc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHdpZHRoOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGN1cnJlbnRSZXNpemVzOiBNYXA8RGF5Vmlld0V2ZW50LCBEYXlWaWV3RXZlbnRSZXNpemU+ID0gbmV3IE1hcCgpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2YWxpZGF0ZURyYWc6IChhcmdzOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZhbGlkYXRlUmVzaXplOiAoYXJnczogYW55KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5RXZlbnRJZCA9IHRyYWNrQnlFdmVudElkO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5RGF5RXZlbnQgPSAoaW5kZXg6IG51bWJlciwgZGF5RXZlbnQ6IERheVZpZXdFdmVudCkgPT5cbiAgICBkYXlFdmVudC5ldmVudC5pZCA/IGRheUV2ZW50LmV2ZW50LmlkIDogZGF5RXZlbnQuZXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyID0gKGluZGV4OiBudW1iZXIsIGhvdXI6IERheVZpZXdIb3VyKSA9PlxuICAgIGhvdXIuc2VnbWVudHNbMF0uZGF0ZS50b0lTT1N0cmluZygpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5SG91clNlZ21lbnQgPSAoaW5kZXg6IG51bWJlciwgc2VnbWVudDogRGF5Vmlld0hvdXJTZWdtZW50KSA9PlxuICAgIHNlZ21lbnQuZGF0ZS50b0lTT1N0cmluZygpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB1dGlsczogQ2FsZW5kYXJVdGlscyxcbiAgICBASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kSG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuaG91clNlZ21lbnRzXG4gICAgKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIb3VyR3JpZCgpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmV2ZW50cykge1xuICAgICAgdmFsaWRhdGVFdmVudHModGhpcy5ldmVudHMpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5ldmVudFdpZHRoXG4gICAgKSB7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfVxuICB9XG5cbiAgZXZlbnREcm9wcGVkKFxuICAgIGRyb3BFdmVudDogeyBkcm9wRGF0YT86IHsgZXZlbnQ/OiBDYWxlbmRhckV2ZW50IH0gfSxcbiAgICBzZWdtZW50OiBEYXlWaWV3SG91clNlZ21lbnRcbiAgKTogdm9pZCB7XG4gICAgaWYgKGRyb3BFdmVudC5kcm9wRGF0YSAmJiBkcm9wRXZlbnQuZHJvcERhdGEuZXZlbnQpIHtcbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7XG4gICAgICAgIGV2ZW50OiBkcm9wRXZlbnQuZHJvcERhdGEuZXZlbnQsXG4gICAgICAgIG5ld1N0YXJ0OiBzZWdtZW50LmRhdGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZVN0YXJ0ZWQoXG4gICAgZXZlbnQ6IERheVZpZXdFdmVudCxcbiAgICByZXNpemVFdmVudDogUmVzaXplRXZlbnQsXG4gICAgZGF5Vmlld0NvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UmVzaXplcy5zZXQoZXZlbnQsIHtcbiAgICAgIG9yaWdpbmFsVG9wOiBldmVudC50b3AsXG4gICAgICBvcmlnaW5hbEhlaWdodDogZXZlbnQuaGVpZ2h0LFxuICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnRvcCAhPT0gJ3VuZGVmaW5lZCcgPyAndG9wJyA6ICdib3R0b20nXG4gICAgfSk7XG4gICAgY29uc3QgcmVzaXplSGVscGVyOiBDYWxlbmRhclJlc2l6ZUhlbHBlciA9IG5ldyBDYWxlbmRhclJlc2l6ZUhlbHBlcihcbiAgICAgIGRheVZpZXdDb250YWluZXJcbiAgICApO1xuICAgIHRoaXMudmFsaWRhdGVSZXNpemUgPSAoeyByZWN0YW5nbGUgfSkgPT5cbiAgICAgIHJlc2l6ZUhlbHBlci52YWxpZGF0ZVJlc2l6ZSh7IHJlY3RhbmdsZSB9KTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlc2l6aW5nKGV2ZW50OiBEYXlWaWV3RXZlbnQsIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRSZXNpemU6IERheVZpZXdFdmVudFJlc2l6ZSA9IHRoaXMuY3VycmVudFJlc2l6ZXMuZ2V0KGV2ZW50KTtcbiAgICBpZiAocmVzaXplRXZlbnQuZWRnZXMudG9wKSB7XG4gICAgICBldmVudC50b3AgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsVG9wICsgK3Jlc2l6ZUV2ZW50LmVkZ2VzLnRvcDtcbiAgICAgIGV2ZW50LmhlaWdodCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxIZWlnaHQgLSArcmVzaXplRXZlbnQuZWRnZXMudG9wO1xuICAgIH0gZWxzZSBpZiAocmVzaXplRXZlbnQuZWRnZXMuYm90dG9tKSB7XG4gICAgICBldmVudC5oZWlnaHQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0ICsgK3Jlc2l6ZUV2ZW50LmVkZ2VzLmJvdHRvbTtcbiAgICB9XG4gIH1cblxuICByZXNpemVFbmRlZChkYXlFdmVudDogRGF5Vmlld0V2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogRGF5Vmlld0V2ZW50UmVzaXplID0gdGhpcy5jdXJyZW50UmVzaXplcy5nZXQoZGF5RXZlbnQpO1xuXG4gICAgbGV0IHBpeGVsc01vdmVkOiBudW1iZXI7XG4gICAgaWYgKGN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ3RvcCcpIHtcbiAgICAgIHBpeGVsc01vdmVkID0gZGF5RXZlbnQudG9wIC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGl4ZWxzTW92ZWQgPSBkYXlFdmVudC5oZWlnaHQgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0O1xuICAgIH1cblxuICAgIGRheUV2ZW50LnRvcCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxUb3A7XG4gICAgZGF5RXZlbnQuaGVpZ2h0ID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodDtcblxuICAgIGNvbnN0IHBpeGVsQW1vdW50SW5NaW51dGVzOiBudW1iZXIgPVxuICAgICAgTUlOVVRFU19JTl9IT1VSIC8gKHRoaXMuaG91clNlZ21lbnRzICogdGhpcy5ob3VyU2VnbWVudEhlaWdodCk7XG4gICAgY29uc3QgbWludXRlc01vdmVkOiBudW1iZXIgPSBwaXhlbHNNb3ZlZCAqIHBpeGVsQW1vdW50SW5NaW51dGVzO1xuICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LnN0YXJ0O1xuICAgIGxldCBuZXdFbmQ6IERhdGUgPSBkYXlFdmVudC5ldmVudC5lbmQ7XG4gICAgaWYgKGN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ3RvcCcpIHtcbiAgICAgIG5ld1N0YXJ0ID0gYWRkTWludXRlcyhuZXdTdGFydCwgbWludXRlc01vdmVkKTtcbiAgICB9IGVsc2UgaWYgKG5ld0VuZCkge1xuICAgICAgbmV3RW5kID0gYWRkTWludXRlcyhuZXdFbmQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHsgbmV3U3RhcnQsIG5ld0VuZCwgZXZlbnQ6IGRheUV2ZW50LmV2ZW50IH0pO1xuICAgIHRoaXMuY3VycmVudFJlc2l6ZXMuZGVsZXRlKGRheUV2ZW50KTtcbiAgfVxuXG4gIGRyYWdTdGFydChldmVudDogSFRNTEVsZW1lbnQsIGRheVZpZXdDb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgZHJhZ0hlbHBlcjogQ2FsZW5kYXJEcmFnSGVscGVyID0gbmV3IENhbGVuZGFyRHJhZ0hlbHBlcihcbiAgICAgIGRheVZpZXdDb250YWluZXIsXG4gICAgICBldmVudFxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZURyYWcgPSAoeyB4LCB5IH0pID0+XG4gICAgICB0aGlzLmN1cnJlbnRSZXNpemVzLnNpemUgPT09IDAgJiYgZHJhZ0hlbHBlci52YWxpZGF0ZURyYWcoeyB4LCB5IH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZXZlbnREcmFnZ2VkKGRheUV2ZW50OiBEYXlWaWV3RXZlbnQsIGRyYWdnZWRJblBpeGVsczogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgcGl4ZWxBbW91bnRJbk1pbnV0ZXM6IG51bWJlciA9XG4gICAgICBNSU5VVEVTX0lOX0hPVVIgLyAodGhpcy5ob3VyU2VnbWVudHMgKiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0KTtcbiAgICBjb25zdCBtaW51dGVzTW92ZWQ6IG51bWJlciA9IGRyYWdnZWRJblBpeGVscyAqIHBpeGVsQW1vdW50SW5NaW51dGVzO1xuICAgIGNvbnN0IG5ld1N0YXJ0OiBEYXRlID0gYWRkTWludXRlcyhkYXlFdmVudC5ldmVudC5zdGFydCwgbWludXRlc01vdmVkKTtcbiAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgIGlmIChkYXlFdmVudC5ldmVudC5lbmQpIHtcbiAgICAgIG5ld0VuZCA9IGFkZE1pbnV0ZXMoZGF5RXZlbnQuZXZlbnQuZW5kLCBtaW51dGVzTW92ZWQpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoeyBuZXdTdGFydCwgbmV3RW5kLCBldmVudDogZGF5RXZlbnQuZXZlbnQgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hIb3VyR3JpZCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvdXJzID0gdGhpcy51dGlscy5nZXREYXlWaWV3SG91ckdyaWQoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZVxuICAgICAgfSxcbiAgICAgIGRheUVuZDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheUVuZEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlFbmRNaW51dGVcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMudXRpbHMuZ2V0RGF5Vmlldyh7XG4gICAgICBldmVudHM6IHRoaXMuZXZlbnRzLFxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICBob3VyU2VnbWVudHM6IHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgZGF5U3RhcnQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlTdGFydEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlTdGFydE1pbnV0ZVxuICAgICAgfSxcbiAgICAgIGRheUVuZDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheUVuZEhvdXIsXG4gICAgICAgIG1pbnV0ZTogdGhpcy5kYXlFbmRNaW51dGVcbiAgICAgIH0sXG4gICAgICBldmVudFdpZHRoOiB0aGlzLmV2ZW50V2lkdGgsXG4gICAgICBzZWdtZW50SGVpZ2h0OiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0XG4gICAgfSk7XG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQWxsKCk6IHZvaWQge1xuICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XG4gICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0QmVmb3JlVmlld1JlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ob3VycyAmJiB0aGlzLnZpZXcpIHtcbiAgICAgIHRoaXMuYmVmb3JlVmlld1JlbmRlci5lbWl0KHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGhvdXJHcmlkOiB0aGlzLmhvdXJzXG4gICAgICAgIH0sXG4gICAgICAgIHBlcmlvZDogdGhpcy52aWV3LnBlcmlvZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItYWxsLWRheS1ldmVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZXZlbnQ9XCJldmVudFwiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWFsbC1kYXktZXZlbnRcIlxuICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImV2ZW50LmNvbG9yPy5zZWNvbmRhcnlcIlxuICAgICAgICBbc3R5bGUuYm9yZGVyQ29sb3JdPVwiZXZlbnQuY29sb3I/LnByaW1hcnlcIj5cbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zIFtldmVudF09XCJldmVudFwiPjwvbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnM+XG4gICAgICAgICZuZ3NwO1xuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlXG4gICAgICAgICAgW2V2ZW50XT1cImV2ZW50XCJcbiAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICB2aWV3PVwiZGF5XCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoKVwiPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC10aXRsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZFxuICAgICAgfVwiPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJBbGxEYXlFdmVudENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAT3V0cHV0KCkgZXZlbnRDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXlWaWV3SG91clNlZ21lbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LXNlZ21lbnQ9XCJzZWdtZW50XCJcbiAgICAgIGxldC1sb2NhbGU9XCJsb2NhbGVcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtaG91ci1zZWdtZW50XCJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJzZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgW2NsYXNzLmNhbC1ob3VyLXN0YXJ0XT1cInNlZ21lbnQuaXNTdGFydFwiXG4gICAgICAgIFtjbGFzcy5jYWwtYWZ0ZXItaG91ci1zdGFydF09XCIhc2VnbWVudC5pc1N0YXJ0XCJcbiAgICAgICAgW25nQ2xhc3NdPVwic2VnbWVudC5jc3NDbGFzc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRpbWVcIj5cbiAgICAgICAgICB7eyBzZWdtZW50LmRhdGUgfCBjYWxlbmRhckRhdGU6J2RheVZpZXdIb3VyJzpsb2NhbGUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIHNlZ21lbnQ6IHNlZ21lbnQsXG4gICAgICAgIGxvY2FsZTogbG9jYWxlXG4gICAgICB9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheVZpZXdIb3VyU2VnbWVudENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNlZ21lbnQ6IERheVZpZXdIb3VyU2VnbWVudDtcblxuICBASW5wdXQoKSBzZWdtZW50SGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXlWaWV3RXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1kYXktdmlldy1ldmVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZGF5RXZlbnQ9XCJkYXlFdmVudFwiXG4gICAgICBsZXQtdG9vbHRpcFBsYWNlbWVudD1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgbGV0LWV2ZW50Q2xpY2tlZD1cImV2ZW50Q2xpY2tlZFwiXG4gICAgICBsZXQtdG9vbHRpcFRlbXBsYXRlPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIGxldC10b29sdGlwQXBwZW5kVG9Cb2R5PVwidG9vbHRpcEFwcGVuZFRvQm9keVwiPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1ldmVudFwiXG4gICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiZGF5RXZlbnQuZXZlbnQuY29sb3I/LnNlY29uZGFyeVwiXG4gICAgICAgIFtzdHlsZS5ib3JkZXJDb2xvcl09XCJkYXlFdmVudC5ldmVudC5jb2xvcj8ucHJpbWFyeVwiXG4gICAgICAgIFttd2xDYWxlbmRhclRvb2x0aXBdPVwiZGF5RXZlbnQuZXZlbnQudGl0bGUgfCBjYWxlbmRhckV2ZW50VGl0bGU6J2RheVRvb2x0aXAnOmRheUV2ZW50LmV2ZW50XCJcbiAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgIFt0b29sdGlwRXZlbnRdPVwiZGF5RXZlbnQuZXZlbnRcIlxuICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIj5cbiAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zIFtldmVudF09XCJkYXlFdmVudC5ldmVudFwiPjwvbXdsLWNhbGVuZGFyLWV2ZW50LWFjdGlvbnM+XG4gICAgICAgICZuZ3NwO1xuICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlXG4gICAgICAgICAgW2V2ZW50XT1cImRheUV2ZW50LmV2ZW50XCJcbiAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICB2aWV3PVwiZGF5XCJcbiAgICAgICAgICAobXdsQ2xpY2spPVwiZXZlbnRDbGlja2VkLmVtaXQoKVwiPlxuICAgICAgICA8L213bC1jYWxlbmRhci1ldmVudC10aXRsZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZGF5RXZlbnQ6IGRheUV2ZW50LFxuICAgICAgICB0b29sdGlwUGxhY2VtZW50OiB0b29sdGlwUGxhY2VtZW50LFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcbiAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiB0b29sdGlwVGVtcGxhdGUsXG4gICAgICAgIHRvb2x0aXBBcHBlbmRUb0JvZHk6IHRvb2x0aXBBcHBlbmRUb0JvZHlcbiAgICAgIH1cIj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGF5Vmlld0V2ZW50Q29tcG9uZW50IHtcbiAgQElucHV0KCkgZGF5RXZlbnQ6IERheVZpZXdFdmVudDtcblxuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdG9vbHRpcEFwcGVuZFRvQm9keTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKSBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZXNpemFibGVNb2R1bGUgfSBmcm9tICdhbmd1bGFyLXJlc2l6YWJsZS1lbGVtZW50JztcbmltcG9ydCB7IERyYWdBbmREcm9wTW9kdWxlIH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcbmltcG9ydCB7IENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyQWxsRGF5RXZlbnRDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWFsbC1kYXktZXZlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyRGF5Vmlld0hvdXJTZWdtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyRGF5Vmlld0V2ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy1ldmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCxcbiAgQ2FsZW5kYXJEYXlWaWV3QmVmb3JlUmVuZGVyRXZlbnRcbn0gZnJvbSAnLi9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlc2l6YWJsZU1vZHVsZSxcbiAgICBEcmFnQW5kRHJvcE1vZHVsZSxcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDYWxlbmRhckRheVZpZXdDb21wb25lbnQsXG4gICAgQ2FsZW5kYXJBbGxEYXlFdmVudENvbXBvbmVudCxcbiAgICBDYWxlbmRhckRheVZpZXdIb3VyU2VnbWVudENvbXBvbmVudCxcbiAgICBDYWxlbmRhckRheVZpZXdFdmVudENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUmVzaXphYmxlTW9kdWxlLFxuICAgIERyYWdBbmREcm9wTW9kdWxlLFxuICAgIENhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCxcbiAgICBDYWxlbmRhckFsbERheUV2ZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyRGF5Vmlld0hvdXJTZWdtZW50Q29tcG9uZW50LFxuICAgIENhbGVuZGFyRGF5Vmlld0V2ZW50Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlNb2R1bGUge31cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFnZ2FibGVIZWxwZXIgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xuaW1wb3J0IHtcbiAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXG4gIENhbGVuZGFyTW9kdWxlQ29uZmlnLFxuICBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsXG4gIENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcbiAgQ2FsZW5kYXJVdGlsc1xufSBmcm9tICcuL2NvbW1vbi9jYWxlbmRhci1jb21tb24ubW9kdWxlJztcbmltcG9ydCB7IENhbGVuZGFyTW9udGhNb2R1bGUgfSBmcm9tICcuL21vbnRoL2NhbGVuZGFyLW1vbnRoLm1vZHVsZSc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtNb2R1bGUgfSBmcm9tICcuL3dlZWsvY2FsZW5kYXItd2Vlay5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJEYXlNb2R1bGUgfSBmcm9tICcuL2RheS9jYWxlbmRhci1kYXkubW9kdWxlJztcblxuZXhwb3J0ICogZnJvbSAnLi9jb21tb24vY2FsZW5kYXItY29tbW9uLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL21vbnRoL2NhbGVuZGFyLW1vbnRoLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3dlZWsvY2FsZW5kYXItd2Vlay5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXkvY2FsZW5kYXItZGF5Lm1vZHVsZSc7XG5cbi8qKlxuICogVGhlIG1haW4gbW9kdWxlIG9mIHRoaXMgbGlicmFyeS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDYWxlbmRlck1vZHVsZSB9IGZyb20gJ2FuZ3VsYXItY2FsZW5kYXInO1xuICpcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICBDYWxlbmRlck1vZHVsZS5mb3JSb290KClcbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIE15TW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYWxlbmRhckNvbW1vbk1vZHVsZSxcbiAgICBDYWxlbmRhck1vbnRoTW9kdWxlLFxuICAgIENhbGVuZGFyV2Vla01vZHVsZSxcbiAgICBDYWxlbmRhckRheU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ2FsZW5kYXJDb21tb25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJNb250aE1vZHVsZSxcbiAgICBDYWxlbmRhcldlZWtNb2R1bGUsXG4gICAgQ2FsZW5kYXJEYXlNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQ2FsZW5kYXJNb2R1bGVDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ2FsZW5kYXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRHJhZ2dhYmxlSGVscGVyLFxuICAgICAgICBjb25maWcuZXZlbnRUaXRsZUZvcm1hdHRlciB8fCBDYWxlbmRhckV2ZW50VGl0bGVGb3JtYXR0ZXIsXG4gICAgICAgIGNvbmZpZy5kYXRlRm9ybWF0dGVyIHx8IENhbGVuZGFyRGF0ZUZvcm1hdHRlcixcbiAgICAgICAgY29uZmlnLnV0aWxzIHx8IENhbGVuZGFyVXRpbHNcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsidmFsaWRhdGVFdmVudHMiLCJ2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFNTyx1QkFBTUEsZ0JBQWMsR0FBRyxDQUFDLE1BQXVCO0lBQ3BELHVCQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwRSxPQUFPQyxjQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMvQyxDQUFDOzs7Ozs7QUFFRixrQkFBeUIsS0FBaUIsRUFBRSxLQUFpQjtJQUMzRCxRQUNFLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUk7UUFDeEIsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSztRQUN6QixLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ3pCLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUs7UUFDMUIsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRztRQUN0QixLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE1B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