/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function DecListFetchMethodResponse() { }
function DecListFetchMethodResponse_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListFetchMethodResponse.prototype.result;
}
export class DecListFilter {
    /**
     * @param {?=} data
     */
    constructor(data = {}) {
        this.children = data.children ? data.children.map(filter => new DecListFilter(filter)) : undefined;
        this.count = data.count || undefined;
        this.default = data.default || undefined;
        this.filters = data.filters || undefined;
        this.hide = data.hide || undefined;
        this.label = data.label || undefined;
        this.color = data.color || '#6E757A';
        this.listMode = data.listMode || undefined;
        this.permissions = data.permissions || undefined;
        this.uid = data.uid || data.label;
    }
}
function DecListFilter_tsickle_Closure_declarations() {
    /** @type {?} */
    DecListFilter.prototype.children;
    /** @type {?} */
    DecListFilter.prototype.count;
    /** @type {?} */
    DecListFilter.prototype.default;
    /** @type {?} */
    DecListFilter.prototype.filters;
    /** @type {?} */
    DecListFilter.prototype.hide;
    /** @type {?} */
    DecListFilter.prototype.label;
    /** @type {?} */
    DecListFilter.prototype.color;
    /** @type {?} */
    DecListFilter.prototype.listMode;
    /** @type {?} */
    DecListFilter.prototype.permissions;
    /** @type {?} */
    DecListFilter.prototype.uid;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdC9saXN0Lm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUEyQ0EsTUFBTTs7OztJQVlKLFlBQVksT0FBWSxFQUFFO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDbkcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO1FBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25DO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWx0ZXJzLCBGaWx0ZXJHcm91cHMgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLm1vZGVsJztcblxuXG4vKlxuICAqIERlY0xpc3RQcmVTZWFyY2hcbiAgKlxuICAqIFVzZWQgYXMgbWlkZGxld2FyZSB0byBtYW5pcHVsYXRlIHRoZSBmaWx0ZXIgYmVmb3JlIGZldGNobmcgdGhlIGRhdGFcbiAgKi9cbmV4cG9ydCB0eXBlIERlY0xpc3RQcmVTZWFyY2ggPSAoZmlsdGVyR3JvdXBzOiBGaWx0ZXJHcm91cHMpID0+IEZpbHRlckdyb3VwcztcblxuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFxuICAqXG4gICogVXNlZCB0byBmZXRjaCBkYXRhIGZyb20gcmVtb3RlIEFQSVxuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdEZldGNoTWV0aG9kID0gKGVuZHBvaW50OiBzdHJpbmcsIGZpbHRlcjogYW55KSA9PiBPYnNlcnZhYmxlPERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlPjtcblxuLypcbiAgKiBMaXN0VHlwZVxuICAqXG4gICogTGlzdCB0eXBlc1xuICAqL1xuZXhwb3J0IHR5cGUgRGVjTGlzdFR5cGUgPSAndGFibGUnIHwgJ2dyaWQnO1xuXG4vKlxuICAqIERlY0xpc3RGZXRjaE1ldGhvZFJlc3BvbnNlXG4gICpcbiAgKiBSZXNwb25zZSByZWNlaXZlZCBieSBmZXRjaCBEZWNMaXN0RmV0Y2hNZXRob2RcbiAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjTGlzdEZldGNoTWV0aG9kUmVzcG9uc2Uge1xuICByZXN1bHQ6IHtcbiAgICByb3dzOiBhbnlbXTtcbiAgICBjb3VudDogbnVtYmVyO1xuICB9O1xufVxuXG4vKlxuICAqIERlY0xpc3RGaWx0ZXJcbiAgKlxuICAqIFN0cnVjdHVyZSBvZiB0YWJzIGZpbHRlcnNcbiAgKi9cbmV4cG9ydCBjbGFzcyBEZWNMaXN0RmlsdGVyIHtcbiAgY2hpbGRyZW4/OiBEZWNMaXN0RmlsdGVyW107XG4gIGNvdW50PzogRnVuY3Rpb24gfCBzdHJpbmc7XG4gIGRlZmF1bHQ/OiBib29sZWFuO1xuICBmaWx0ZXJzOiBGaWx0ZXJzO1xuICBoaWRlPzogYm9vbGVhbjtcbiAgbGFiZWw6IHN0cmluZztcbiAgY29sb3I6IHN0cmluZztcbiAgbGlzdE1vZGU/OiBEZWNMaXN0VHlwZTtcbiAgcGVybWlzc2lvbnM/OiBzdHJpbmdbXTtcbiAgdWlkPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGRhdGEuY2hpbGRyZW4gPyBkYXRhLmNoaWxkcmVuLm1hcChmaWx0ZXIgPT4gbmV3IERlY0xpc3RGaWx0ZXIoZmlsdGVyKSkgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5jb3VudCA9IGRhdGEuY291bnQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVmYXVsdCA9IGRhdGEuZGVmYXVsdCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5maWx0ZXJzID0gZGF0YS5maWx0ZXJzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmhpZGUgPSBkYXRhLmhpZGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubGFiZWwgPSBkYXRhLmxhYmVsIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvciB8fCAnIzZFNzU3QSc7XG4gICAgdGhpcy5saXN0TW9kZSA9IGRhdGEubGlzdE1vZGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucGVybWlzc2lvbnMgPSBkYXRhLnBlcm1pc3Npb25zIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnVpZCA9IGRhdGEudWlkIHx8IGRhdGEubGFiZWw7XG4gIH1cbn1cbiJdfQ==