import getISOWeek from 'date-fns/get_iso_week/index';
import { DatePipe } from '@angular/common';
/**
 * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
 */
var CalendarAngularDateFormatter = /** @class */ (function () {
    function CalendarAngularDateFormatter() {
    }
    /**
     * The month view header week day labels
     */
    CalendarAngularDateFormatter.prototype.monthViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    };
    /**
     * The month view cell day number
     */
    CalendarAngularDateFormatter.prototype.monthViewDayNumber = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'd', null, locale);
    };
    /**
     * The month view title
     */
    CalendarAngularDateFormatter.prototype.monthViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MMMM y', null, locale);
    };
    /**
     * The week view header week day labels
     */
    CalendarAngularDateFormatter.prototype.weekViewColumnHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE', null, locale);
    };
    /**
     * The week view sub header day and month labels
     */
    CalendarAngularDateFormatter.prototype.weekViewColumnSubHeader = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'MMM d', null, locale);
    };
    /**
     * The week view title
     */
    CalendarAngularDateFormatter.prototype.weekViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        var year = new DatePipe(locale).transform(date, 'y', null, locale);
        var weekNumber = getISOWeek(date);
        return "Week " + weekNumber + " of " + year;
    };
    /**
     * The time formatting down the left hand side of the day view
     */
    CalendarAngularDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'h a', null, locale);
    };
    /**
     * The day view title
     */
    CalendarAngularDateFormatter.prototype.dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new DatePipe(locale).transform(date, 'EEEE, MMMM d, y', null, locale);
    };
    return CalendarAngularDateFormatter;
}());
export { CalendarAngularDateFormatter };
//# sourceMappingURL=calendar-angular-date-formatter.provider.js.map