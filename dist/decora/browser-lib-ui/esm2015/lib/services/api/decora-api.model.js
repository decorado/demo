/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class UserAuthData {
    /**
     * @param {?=} user
     */
    constructor(user = {}) {
        this.id = user.id || undefined;
        this.email = user.email || undefined;
        this.name = user.name || undefined;
        this.country = user.country || undefined;
        this.company = user.company || undefined;
        this.role = user.role || undefined;
        this.permissions = user.permissions || undefined;
    }
}
function UserAuthData_tsickle_Closure_declarations() {
    /** @type {?} */
    UserAuthData.prototype.id;
    /** @type {?} */
    UserAuthData.prototype.email;
    /** @type {?} */
    UserAuthData.prototype.name;
    /** @type {?} */
    UserAuthData.prototype.country;
    /** @type {?} */
    UserAuthData.prototype.company;
    /** @type {?} */
    UserAuthData.prototype.role;
    /** @type {?} */
    UserAuthData.prototype.permissions;
}
/**
 * @record
 */
export function LoginData() { }
function LoginData_tsickle_Closure_declarations() {
    /** @type {?} */
    LoginData.prototype.email;
    /** @type {?} */
    LoginData.prototype.password;
    /** @type {?} */
    LoginData.prototype.keepLogged;
}
/**
 * @record
 */
export function FacebookLoginData() { }
function FacebookLoginData_tsickle_Closure_declarations() {
    /** @type {?} */
    FacebookLoginData.prototype.keepLogged;
    /** @type {?} */
    FacebookLoginData.prototype.facebookToken;
}
/**
 * @record
 */
export function ServiceConfig() { }
function ServiceConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    ServiceConfig.prototype.host;
    /** @type {?|undefined} */
    ServiceConfig.prototype.authHost;
    /** @type {?|undefined} */
    ServiceConfig.prototype.useMockApi;
    /** @type {?|undefined} */
    ServiceConfig.prototype.mockApiHost;
}
/**
 * @record
 */
export function FilterData() { }
function FilterData_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterData.prototype.endpoint;
    /** @type {?} */
    FilterData.prototype.payload;
    /** @type {?|undefined} */
    FilterData.prototype.cbk;
    /** @type {?|undefined} */
    FilterData.prototype.clear;
}
/**
 * @record
 */
export function DecFilter() { }
function DecFilter_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    DecFilter.prototype.filterGroups;
    /** @type {?|undefined} */
    DecFilter.prototype.projectView;
    /** @type {?|undefined} */
    DecFilter.prototype.columns;
    /** @type {?|undefined} */
    DecFilter.prototype.page;
    /** @type {?|undefined} */
    DecFilter.prototype.limit;
    /** @type {?|undefined} */
    DecFilter.prototype.textSearch;
}
/**
 * @record
 */
export function SerializedDecFilter() { }
function SerializedDecFilter_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SerializedDecFilter.prototype.filter;
    /** @type {?|undefined} */
    SerializedDecFilter.prototype.projectView;
    /** @type {?|undefined} */
    SerializedDecFilter.prototype.columns;
    /** @type {?|undefined} */
    SerializedDecFilter.prototype.page;
    /** @type {?|undefined} */
    SerializedDecFilter.prototype.limit;
    /** @type {?|undefined} */
    SerializedDecFilter.prototype.textSearch;
}
/**
 * @record
 */
export function Filter() { }
function Filter_tsickle_Closure_declarations() {
    /** @type {?} */
    Filter.prototype.property;
    /** @type {?} */
    Filter.prototype.value;
}
/**
 * @record
 */
export function FilterGroup() { }
function FilterGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterGroup.prototype.filters;
}
/**
 * @record
 */
export function ColumnsSortConfig() { }
function ColumnsSortConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    ColumnsSortConfig.prototype.property;
    /** @type {?} */
    ColumnsSortConfig.prototype.order;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU07Ozs7SUFTSixZQUFZLE9BQVksRUFBRTtRQUN4QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO0tBQ2xEO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXNlckF1dGhEYXRhIHtcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgY291bnRyeTogc3RyaW5nO1xuICBwdWJsaWMgY29tcGFueTogc3RyaW5nO1xuICBwdWJsaWMgcm9sZTogbnVtYmVyO1xuICBwdWJsaWMgcGVybWlzc2lvbnM6IEFycmF5PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IodXNlcjogYW55ID0ge30pIHtcbiAgICB0aGlzLmlkID0gdXNlci5pZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5lbWFpbCA9IHVzZXIuZW1haWwgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubmFtZSA9IHVzZXIubmFtZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb3VudHJ5ID0gdXNlci5jb3VudHJ5IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvbXBhbnkgPSB1c2VyLmNvbXBhbnkgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucm9sZSA9IHVzZXIucm9sZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wZXJtaXNzaW9ucyA9IHVzZXIucGVybWlzc2lvbnMgfHwgdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9naW5EYXRhIHtcbiAgZW1haWw6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAga2VlcExvZ2dlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYWNlYm9va0xvZ2luRGF0YSB7XG4gIGtlZXBMb2dnZWQ6IGJvb2xlYW47XG4gIGZhY2Vib29rVG9rZW46IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXJ2aWNlQ29uZmlnIHtcbiAgaG9zdDogc3RyaW5nO1xuICBhdXRoSG9zdD86IHN0cmluZztcbiAgdXNlTW9ja0FwaT86IGJvb2xlYW47XG4gIG1vY2tBcGlIb3N0Pzogc3RyaW5nO1xufVxuXG5cblxuLypcbiAgKiBGaWx0ZXJHcm91cHNcbiAgKlxuICAqIGFuIEFycmF5IG9mIGZpbHRlciBncm91cFxuICAqL1xuZXhwb3J0IHR5cGUgRmlsdGVyR3JvdXBzID0gRmlsdGVyR3JvdXBbXTtcblxuLypcbiAgKiBGaWx0ZXJzXG4gICpcbiAgKiBhbiBBcnJheSBvZiBmaWx0ZXJcbiAgKi9cbmV4cG9ydCB0eXBlIEZpbHRlcnMgPSBGaWx0ZXJbXTtcblxuLypcbiAgKiBGaWx0ZXJEYXRhXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJEYXRhIHtcbiAgZW5kcG9pbnQ6IHN0cmluZztcbiAgcGF5bG9hZDogRGVjRmlsdGVyO1xuICBjYms/OiBGdW5jdGlvbjtcbiAgY2xlYXI/OiBib29sZWFuO1xufVxuXG4vKlxuICAqIEZpbHRlclxuICAqXG4gICogRmlsdGVyIGNvbmZpZ3VyYXRpb25cbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjRmlsdGVyIHtcbiAgZmlsdGVyR3JvdXBzPzogRmlsdGVyR3JvdXBzO1xuICBwcm9qZWN0Vmlldz86IGFueTtcbiAgY29sdW1ucz86IGFueTtcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBGaWx0ZXIgY29uZmlndXJhdGlvblxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkRGVjRmlsdGVyIHtcbiAgZmlsdGVyPzogc3RyaW5nO1xuICBwcm9qZWN0Vmlldz86IHN0cmluZztcbiAgY29sdW1ucz86IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHRleHRTZWFyY2g/OiBzdHJpbmc7XG59XG5cbi8qXG4gICogRmlsdGVyXG4gICpcbiAgKiBTaWdubGUgZmlsdGVyXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlciB7XG4gIHByb3BlcnR5OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcbn1cblxuLypcbiAgKiBGaWx0ZXJHcm91cFxuICAqXG4gICogR3JvdXAgb2YgRmlsdGVyXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlckdyb3VwIHtcbiAgZmlsdGVyczogRmlsdGVycztcbn1cblxuLypcbiAgKiBDb2x1bW5zU29ydENvbmZpZ1xuICAqXG4gICogQ29uZmlndXJhdGlvbiB0byBzb3J0IGNvbHVtbnNcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uc1NvcnRDb25maWcge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICBvcmRlcjoge1xuICAgIHR5cGU6ICdhc2MnIHwgJ2Rlc2MnXG4gIH07XG59XG4iXX0=