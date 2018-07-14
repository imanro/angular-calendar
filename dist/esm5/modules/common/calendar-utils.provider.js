/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { getMonthView, getWeekViewHeader, getWeekView, getDayView, getDayViewHourGrid } from 'calendar-utils';
var CalendarUtils = /** @class */ (function () {
    function CalendarUtils() {
    }
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getMonthView = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getMonthView(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getWeekViewHeader = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getWeekViewHeader(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getWeekView = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getWeekView(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getDayView = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getDayView(args);
    };
    /**
     * @param {?} args
     * @return {?}
     */
    CalendarUtils.prototype.getDayViewHourGrid = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return getDayViewHourGrid(args);
    };
    CalendarUtils.decorators = [
        { type: Injectable },
    ];
    return CalendarUtils;
}());
export { CalendarUtils };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdXRpbHMucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLWltYW5yby8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxZQUFZLEVBR1osaUJBQWlCLEVBR2pCLFdBQVcsRUFFWCxVQUFVLEVBR1Ysa0JBQWtCLEVBSW5CLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0lBSXRCLG9DQUFZOzs7O0lBQVosVUFBYSxJQUFzQjtRQUNqQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUVELHlDQUFpQjs7OztJQUFqQixVQUFrQixJQUEyQjtRQUMzQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLElBQXFCO1FBQy9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsa0NBQVU7Ozs7SUFBVixVQUFXLElBQW9CO1FBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7O0lBRUQsMENBQWtCOzs7O0lBQWxCLFVBQW1CLElBQTRCO1FBQzdDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQzs7Z0JBcEJGLFVBQVU7O3dCQW5CWDs7U0FvQmEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGdldE1vbnRoVmlldyxcbiAgR2V0TW9udGhWaWV3QXJncyxcbiAgTW9udGhWaWV3LFxuICBnZXRXZWVrVmlld0hlYWRlcixcbiAgR2V0V2Vla1ZpZXdIZWFkZXJBcmdzLFxuICBXZWVrRGF5LFxuICBnZXRXZWVrVmlldyxcbiAgR2V0V2Vla1ZpZXdBcmdzLFxuICBnZXREYXlWaWV3LFxuICBHZXREYXlWaWV3QXJncyxcbiAgRGF5VmlldyxcbiAgZ2V0RGF5Vmlld0hvdXJHcmlkLFxuICBHZXREYXlWaWV3SG91ckdyaWRBcmdzLFxuICBEYXlWaWV3SG91cixcbiAgV2Vla1ZpZXdcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJVdGlscyB7XG4gIGdldE1vbnRoVmlldyhhcmdzOiBHZXRNb250aFZpZXdBcmdzKTogTW9udGhWaWV3IHtcbiAgICByZXR1cm4gZ2V0TW9udGhWaWV3KGFyZ3MpO1xuICB9XG5cbiAgZ2V0V2Vla1ZpZXdIZWFkZXIoYXJnczogR2V0V2Vla1ZpZXdIZWFkZXJBcmdzKTogV2Vla0RheVtdIHtcbiAgICByZXR1cm4gZ2V0V2Vla1ZpZXdIZWFkZXIoYXJncyk7XG4gIH1cblxuICBnZXRXZWVrVmlldyhhcmdzOiBHZXRXZWVrVmlld0FyZ3MpOiBXZWVrVmlldyB7XG4gICAgcmV0dXJuIGdldFdlZWtWaWV3KGFyZ3MpO1xuICB9XG5cbiAgZ2V0RGF5VmlldyhhcmdzOiBHZXREYXlWaWV3QXJncyk6IERheVZpZXcge1xuICAgIHJldHVybiBnZXREYXlWaWV3KGFyZ3MpO1xuICB9XG5cbiAgZ2V0RGF5Vmlld0hvdXJHcmlkKGFyZ3M6IEdldERheVZpZXdIb3VyR3JpZEFyZ3MpOiBEYXlWaWV3SG91cltdIHtcbiAgICByZXR1cm4gZ2V0RGF5Vmlld0hvdXJHcmlkKGFyZ3MpO1xuICB9XG59XG4iXX0=