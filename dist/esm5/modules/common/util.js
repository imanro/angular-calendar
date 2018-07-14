/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { validateEvents as validateEventsWithoutLog } from 'calendar-utils';
export var /** @type {?} */ validateEvents = function (events) {
    var /** @type {?} */ warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.warn.apply(console, tslib_1.__spread(['angular-calendar'], args));
    };
    return validateEventsWithoutLog(events, warn);
};
/**
 * @param {?} outer
 * @param {?} inner
 * @return {?}
 */
export function isInside(outer, inner) {
    return (outer.left <= inner.left &&
        inner.left <= outer.right &&
        outer.left <= inner.right &&
        inner.right <= outer.right &&
        outer.top <= inner.top &&
        inner.top <= outer.bottom &&
        outer.top <= inner.bottom &&
        inner.bottom <= outer.bottom);
}
export var /** @type {?} */ trackByEventId = function (index, event) {
    return event.id ? event.id : event;
};
export var /** @type {?} */ trackByWeekDayHeaderDate = function (index, day) {
    return day.date.toISOString();
};
export var /** @type {?} */ trackByIndex = function (index) { return index; };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXItaW1hbnJvLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFTCxjQUFjLElBQUksd0JBQXdCLEVBRTNDLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsTUFBTSxDQUFDLHFCQUFNLGNBQWMsR0FBRyxVQUFDLE1BQXVCO0lBQ3BELHFCQUFNLElBQUksR0FBRztRQUFDLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O1FBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxPQUFaLE9BQU8sb0JBQU0sa0JBQWtCLEdBQUssSUFBSTtJQUF4QyxDQUF5QyxDQUFDO0lBQ3BFLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDL0MsQ0FBQzs7Ozs7O0FBRUYsTUFBTSxtQkFBbUIsS0FBaUIsRUFBRSxLQUFpQjtJQUMzRCxNQUFNLENBQUMsQ0FDTCxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJO1FBQ3hCLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUs7UUFDekIsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSztRQUN6QixLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQzFCLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUc7UUFDdEIsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTTtRQUN6QixLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FDN0IsQ0FBQztDQUNIO0FBRUQsTUFBTSxDQUFDLHFCQUFNLGNBQWMsR0FBRyxVQUFDLEtBQWEsRUFBRSxLQUFvQjtJQUNoRSxPQUFBLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFBM0IsQ0FBMkIsQ0FBQztBQUU5QixNQUFNLENBQUMscUJBQU0sd0JBQXdCLEdBQUcsVUFBQyxLQUFhLEVBQUUsR0FBWTtJQUNsRSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQXRCLENBQXNCLENBQUM7QUFFekIsTUFBTSxDQUFDLHFCQUFNLFlBQVksR0FBRyxVQUFDLEtBQWEsSUFBSyxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICB2YWxpZGF0ZUV2ZW50cyBhcyB2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2csXG4gIFdlZWtEYXlcbn0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVFdmVudHMgPSAoZXZlbnRzOiBDYWxlbmRhckV2ZW50W10pID0+IHtcbiAgY29uc3Qgd2FybiA9ICguLi5hcmdzKSA9PiBjb25zb2xlLndhcm4oJ2FuZ3VsYXItY2FsZW5kYXInLCAuLi5hcmdzKTtcbiAgcmV0dXJuIHZhbGlkYXRlRXZlbnRzV2l0aG91dExvZyhldmVudHMsIHdhcm4pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5zaWRlKG91dGVyOiBDbGllbnRSZWN0LCBpbm5lcjogQ2xpZW50UmVjdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIG91dGVyLmxlZnQgPD0gaW5uZXIubGVmdCAmJlxuICAgIGlubmVyLmxlZnQgPD0gb3V0ZXIucmlnaHQgJiZcbiAgICBvdXRlci5sZWZ0IDw9IGlubmVyLnJpZ2h0ICYmXG4gICAgaW5uZXIucmlnaHQgPD0gb3V0ZXIucmlnaHQgJiZcbiAgICBvdXRlci50b3AgPD0gaW5uZXIudG9wICYmXG4gICAgaW5uZXIudG9wIDw9IG91dGVyLmJvdHRvbSAmJlxuICAgIG91dGVyLnRvcCA8PSBpbm5lci5ib3R0b20gJiZcbiAgICBpbm5lci5ib3R0b20gPD0gb3V0ZXIuYm90dG9tXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5RXZlbnRJZCA9IChpbmRleDogbnVtYmVyLCBldmVudDogQ2FsZW5kYXJFdmVudCkgPT5cbiAgZXZlbnQuaWQgPyBldmVudC5pZCA6IGV2ZW50O1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlID0gKGluZGV4OiBudW1iZXIsIGRheTogV2Vla0RheSkgPT5cbiAgZGF5LmRhdGUudG9JU09TdHJpbmcoKTtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlJbmRleCA9IChpbmRleDogbnVtYmVyKSA9PiBpbmRleDtcbiJdfQ==