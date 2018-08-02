/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UserAuthData = /** @class */ (function () {
    function UserAuthData(user) {
        if (user === void 0) { user = {}; }
        this.id = user.id || undefined;
        this.email = user.email || undefined;
        this.name = user.name || undefined;
        this.country = user.country || undefined;
        this.company = user.company || undefined;
        this.role = user.role || undefined;
        this.permissions = user.permissions || undefined;
    }
    return UserAuthData;
}());
export { UserAuthData };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhLWFwaS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXBpL2RlY29yYS1hcGkubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQUE7SUFTRSxzQkFBWSxJQUFjO1FBQWQscUJBQUEsRUFBQSxTQUFjO1FBQ3hCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUM7S0FDbEQ7dUJBakJIO0lBa0JDLENBQUE7QUFsQkQsd0JBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFVzZXJBdXRoRGF0YSB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwdWJsaWMgZW1haWw6IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIGNvdW50cnk6IHN0cmluZztcbiAgcHVibGljIGNvbXBhbnk6IHN0cmluZztcbiAgcHVibGljIHJvbGU6IG51bWJlcjtcbiAgcHVibGljIHBlcm1pc3Npb25zOiBBcnJheTxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHVzZXI6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5pZCA9IHVzZXIuaWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZW1haWwgPSB1c2VyLmVtYWlsIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5hbWUgPSB1c2VyLm5hbWUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuY291bnRyeSA9IHVzZXIuY291bnRyeSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb21wYW55ID0gdXNlci5jb21wYW55IHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJvbGUgPSB1c2VyLnJvbGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucGVybWlzc2lvbnMgPSB1c2VyLnBlcm1pc3Npb25zIHx8IHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2luRGF0YSB7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIGtlZXBMb2dnZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZWJvb2tMb2dpbkRhdGEge1xuICBrZWVwTG9nZ2VkOiBib29sZWFuO1xuICBmYWNlYm9va1Rva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VydmljZUNvbmZpZyB7XG4gIGhvc3Q6IHN0cmluZztcbiAgYXV0aEhvc3Q/OiBzdHJpbmc7XG4gIHVzZU1vY2tBcGk/OiBib29sZWFuO1xuICBtb2NrQXBpSG9zdD86IHN0cmluZztcbn1cblxuXG5cbi8qXG4gICogRmlsdGVyR3JvdXBzXG4gICpcbiAgKiBhbiBBcnJheSBvZiBmaWx0ZXIgZ3JvdXBcbiAgKi9cbmV4cG9ydCB0eXBlIEZpbHRlckdyb3VwcyA9IEZpbHRlckdyb3VwW107XG5cbi8qXG4gICogRmlsdGVyc1xuICAqXG4gICogYW4gQXJyYXkgb2YgZmlsdGVyXG4gICovXG5leHBvcnQgdHlwZSBGaWx0ZXJzID0gRmlsdGVyW107XG5cbi8qXG4gICogRmlsdGVyRGF0YVxuICAqXG4gICogRmlsdGVyIGNvbmZpZ3VyYXRpb25cbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyRGF0YSB7XG4gIGVuZHBvaW50OiBzdHJpbmc7XG4gIHBheWxvYWQ6IERlY0ZpbHRlcjtcbiAgY2JrPzogRnVuY3Rpb247XG4gIGNsZWFyPzogYm9vbGVhbjtcbn1cblxuLypcbiAgKiBGaWx0ZXJcbiAgKlxuICAqIEZpbHRlciBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIERlY0ZpbHRlciB7XG4gIGZpbHRlckdyb3Vwcz86IEZpbHRlckdyb3VwcztcbiAgcHJvamVjdFZpZXc/OiBhbnk7XG4gIGNvbHVtbnM/OiBhbnk7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIGxpbWl0PzogbnVtYmVyO1xuICB0ZXh0U2VhcmNoPzogc3RyaW5nO1xufVxuXG4vKlxuICAqIEZpbHRlclxuICAqXG4gICogRmlsdGVyIGNvbmZpZ3VyYXRpb25cbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplZERlY0ZpbHRlciB7XG4gIGZpbHRlcj86IHN0cmluZztcbiAgcHJvamVjdFZpZXc/OiBzdHJpbmc7XG4gIGNvbHVtbnM/OiBzdHJpbmc7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIGxpbWl0PzogbnVtYmVyO1xuICB0ZXh0U2VhcmNoPzogc3RyaW5nO1xufVxuXG4vKlxuICAqIEZpbHRlclxuICAqXG4gICogU2lnbmxlIGZpbHRlclxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICBwcm9wZXJ0eTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW107XG59XG5cbi8qXG4gICogRmlsdGVyR3JvdXBcbiAgKlxuICAqIEdyb3VwIG9mIEZpbHRlclxuICAqL1xuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJHcm91cCB7XG4gIGZpbHRlcnM6IEZpbHRlcnM7XG59XG5cbi8qXG4gICogQ29sdW1uc1NvcnRDb25maWdcbiAgKlxuICAqIENvbmZpZ3VyYXRpb24gdG8gc29ydCBjb2x1bW5zXG4gICovXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbnNTb3J0Q29uZmlnIHtcbiAgcHJvcGVydHk6IHN0cmluZztcbiAgb3JkZXI6IHtcbiAgICB0eXBlOiAnYXNjJyB8ICdkZXNjJ1xuICB9O1xufVxuIl19