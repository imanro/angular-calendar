/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { validateEvents as validateEventsWithoutLog } from 'calendar-utils';
export const /** @type {?} */ validateEvents = (events) => {
    const /** @type {?} */ warn = (...args) => console.warn('angular-calendar', ...args);
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
export const /** @type {?} */ trackByEventId = (index, event) => event.id ? event.id : event;
export const /** @type {?} */ trackByWeekDayHeaderDate = (index, day) => day.date.toISOString();
export const /** @type {?} */ trackByIndex = (index) => index;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXItaW1hbnJvLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLGNBQWMsSUFBSSx3QkFBd0IsRUFFM0MsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixNQUFNLENBQUMsdUJBQU0sY0FBYyxHQUFHLENBQUMsTUFBdUIsRUFBRSxFQUFFO0lBQ3hELHVCQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDcEUsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMvQyxDQUFDOzs7Ozs7QUFFRixNQUFNLG1CQUFtQixLQUFpQixFQUFFLEtBQWlCO0lBQzNELE1BQU0sQ0FBQyxDQUNMLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUk7UUFDeEIsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSztRQUN6QixLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLO1FBQ3pCLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUs7UUFDMUIsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRztRQUN0QixLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU07UUFDekIsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUM3QixDQUFDO0NBQ0g7QUFFRCxNQUFNLENBQUMsdUJBQU0sY0FBYyxHQUFHLENBQUMsS0FBYSxFQUFFLEtBQW9CLEVBQUUsRUFBRSxDQUNwRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFFOUIsTUFBTSxDQUFDLHVCQUFNLHdCQUF3QixHQUFHLENBQUMsS0FBYSxFQUFFLEdBQVksRUFBRSxFQUFFLENBQ3RFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFekIsTUFBTSxDQUFDLHVCQUFNLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2FsZW5kYXJFdmVudCxcbiAgdmFsaWRhdGVFdmVudHMgYXMgdmFsaWRhdGVFdmVudHNXaXRob3V0TG9nLFxuICBXZWVrRGF5XG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRXZlbnRzID0gKGV2ZW50czogQ2FsZW5kYXJFdmVudFtdKSA9PiB7XG4gIGNvbnN0IHdhcm4gPSAoLi4uYXJncykgPT4gY29uc29sZS53YXJuKCdhbmd1bGFyLWNhbGVuZGFyJywgLi4uYXJncyk7XG4gIHJldHVybiB2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2coZXZlbnRzLCB3YXJuKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luc2lkZShvdXRlcjogQ2xpZW50UmVjdCwgaW5uZXI6IENsaWVudFJlY3QpOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvdXRlci5sZWZ0IDw9IGlubmVyLmxlZnQgJiZcbiAgICBpbm5lci5sZWZ0IDw9IG91dGVyLnJpZ2h0ICYmXG4gICAgb3V0ZXIubGVmdCA8PSBpbm5lci5yaWdodCAmJlxuICAgIGlubmVyLnJpZ2h0IDw9IG91dGVyLnJpZ2h0ICYmXG4gICAgb3V0ZXIudG9wIDw9IGlubmVyLnRvcCAmJlxuICAgIGlubmVyLnRvcCA8PSBvdXRlci5ib3R0b20gJiZcbiAgICBvdXRlci50b3AgPD0gaW5uZXIuYm90dG9tICYmXG4gICAgaW5uZXIuYm90dG9tIDw9IG91dGVyLmJvdHRvbVxuICApO1xufVxuXG5leHBvcnQgY29uc3QgdHJhY2tCeUV2ZW50SWQgPSAoaW5kZXg6IG51bWJlciwgZXZlbnQ6IENhbGVuZGFyRXZlbnQpID0+XG4gIGV2ZW50LmlkID8gZXZlbnQuaWQgOiBldmVudDtcblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlXZWVrRGF5SGVhZGVyRGF0ZSA9IChpbmRleDogbnVtYmVyLCBkYXk6IFdlZWtEYXkpID0+XG4gIGRheS5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5SW5kZXggPSAoaW5kZXg6IG51bWJlcikgPT4gaW5kZXg7XG4iXX0=