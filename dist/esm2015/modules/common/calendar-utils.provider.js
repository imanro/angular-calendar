/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { getMonthView, getWeekViewHeader, getWeekView, getDayView, getDayViewHourGrid } from 'calendar-utils';
export class CalendarUtils {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdXRpbHMucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLWltYW5yby8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxZQUFZLEVBR1osaUJBQWlCLEVBR2pCLFdBQVcsRUFFWCxVQUFVLEVBR1Ysa0JBQWtCLEVBSW5CLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEIsTUFBTTs7Ozs7SUFDSixZQUFZLENBQUMsSUFBc0I7UUFDakMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMzQjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxJQUEyQjtRQUMzQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7Ozs7O0lBRUQsV0FBVyxDQUFDLElBQXFCO1FBQy9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUI7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQW9CO1FBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7O0lBRUQsa0JBQWtCLENBQUMsSUFBNEI7UUFDN0MsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDOzs7WUFwQkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGdldE1vbnRoVmlldyxcbiAgR2V0TW9udGhWaWV3QXJncyxcbiAgTW9udGhWaWV3LFxuICBnZXRXZWVrVmlld0hlYWRlcixcbiAgR2V0V2Vla1ZpZXdIZWFkZXJBcmdzLFxuICBXZWVrRGF5LFxuICBnZXRXZWVrVmlldyxcbiAgR2V0V2Vla1ZpZXdBcmdzLFxuICBnZXREYXlWaWV3LFxuICBHZXREYXlWaWV3QXJncyxcbiAgRGF5VmlldyxcbiAgZ2V0RGF5Vmlld0hvdXJHcmlkLFxuICBHZXREYXlWaWV3SG91ckdyaWRBcmdzLFxuICBEYXlWaWV3SG91cixcbiAgV2Vla1ZpZXdcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJVdGlscyB7XG4gIGdldE1vbnRoVmlldyhhcmdzOiBHZXRNb250aFZpZXdBcmdzKTogTW9udGhWaWV3IHtcbiAgICByZXR1cm4gZ2V0TW9udGhWaWV3KGFyZ3MpO1xuICB9XG5cbiAgZ2V0V2Vla1ZpZXdIZWFkZXIoYXJnczogR2V0V2Vla1ZpZXdIZWFkZXJBcmdzKTogV2Vla0RheVtdIHtcbiAgICByZXR1cm4gZ2V0V2Vla1ZpZXdIZWFkZXIoYXJncyk7XG4gIH1cblxuICBnZXRXZWVrVmlldyhhcmdzOiBHZXRXZWVrVmlld0FyZ3MpOiBXZWVrVmlldyB7XG4gICAgcmV0dXJuIGdldFdlZWtWaWV3KGFyZ3MpO1xuICB9XG5cbiAgZ2V0RGF5VmlldyhhcmdzOiBHZXREYXlWaWV3QXJncyk6IERheVZpZXcge1xuICAgIHJldHVybiBnZXREYXlWaWV3KGFyZ3MpO1xuICB9XG5cbiAgZ2V0RGF5Vmlld0hvdXJHcmlkKGFyZ3M6IEdldERheVZpZXdIb3VyR3JpZEFyZ3MpOiBEYXlWaWV3SG91cltdIHtcbiAgICByZXR1cm4gZ2V0RGF5Vmlld0hvdXJHcmlkKGFyZ3MpO1xuICB9XG59XG4iXX0=