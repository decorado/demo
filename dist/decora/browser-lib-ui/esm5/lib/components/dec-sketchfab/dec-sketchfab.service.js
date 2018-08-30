/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { catchError, share } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var DecSketchfabService = /** @class */ (function () {
    function DecSketchfabService(http) {
        this.http = http;
        this.handleError = function (error) {
            var /** @type {?} */ message = error.message;
            var /** @type {?} */ bodyMessage = (error && error.error) ? error.error.message : '';
            var /** @type {?} */ status = error.status;
            var /** @type {?} */ statusText = error.statusText;
            return throwError({ status: status, statusText: statusText, message: message, bodyMessage: bodyMessage });
        };
    }
    /**
     * @param {?} uid
     * @param {?} configs
     * @return {?}
     */
    DecSketchfabService.prototype.pachConfigs = /**
     * @param {?} uid
     * @param {?} configs
     * @return {?}
     */
    function (uid, configs) {
        var /** @type {?} */ options = {};
        var /** @type {?} */ headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        options.headers = headers;
        var /** @type {?} */ url = 'https://api.sketchfab.com/v2/models/' + uid + '?token=b230fac2222243258a36619600ba78c1';
        var /** @type {?} */ callObservable = this.http.patch(url, configs, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @param {?} uid
     * @return {?}
     */
    DecSketchfabService.prototype.getAllTextures = /**
     * @param {?} uid
     * @return {?}
     */
    function (uid) {
        var /** @type {?} */ options = {};
        var /** @type {?} */ headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        options.headers = headers;
        var /** @type {?} */ url = "https://sketchfab.com/i/models/" + uid + "/textures";
        var /** @type {?} */ callObservable = this.http.get(url, options)
            .pipe(catchError(this.handleError));
        return this.shareObservable(callObservable);
    };
    /**
     * @param {?} call
     * @return {?}
     */
    DecSketchfabService.prototype.shareObservable = /**
     * @param {?} call
     * @return {?}
     */
    function (call) {
        return call.pipe(share());
    };
    DecSketchfabService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecSketchfabService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return DecSketchfabService;
}());
export { DecSketchfabService };
function DecSketchfabService_tsickle_Closure_declarations() {
    /** @type {?} */
    DecSketchfabService.prototype.handleError;
    /** @type {?} */
    DecSketchfabService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNrZXRjaGZhYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1za2V0Y2hmYWIvZGVjLXNrZXRjaGZhYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFjLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBMkIsTUFBTSxzQkFBc0IsQ0FBQzs7SUFldEYsNkJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7MkJBMEJkLFVBQUMsS0FBVTtZQUMvQixxQkFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM5QixxQkFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RFLHFCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzVCLHFCQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDLENBQUM7U0FDakU7S0FoQ3dDOzs7Ozs7SUFFekMseUNBQVc7Ozs7O0lBQVgsVUFBWSxHQUFXLEVBQUUsT0FBWTtRQUNuQyxxQkFBTSxPQUFPLEdBQWdCLEVBQUUsQ0FBQztRQUNoQyxxQkFBTSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzFCLHFCQUFNLEdBQUcsR0FBRyxzQ0FBc0MsR0FBRyxHQUFHLEdBQUcseUNBQXlDLENBQUM7UUFDckcscUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzVELElBQUksQ0FDSCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM3QixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDN0M7Ozs7O0lBRUQsNENBQWM7Ozs7SUFBZCxVQUFlLEdBQVc7UUFDeEIscUJBQU0sT0FBTyxHQUFnQixFQUFFLENBQUM7UUFDaEMscUJBQU0sT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMxQixxQkFBTSxHQUFHLEdBQUcsb0NBQWtDLEdBQUcsY0FBVyxDQUFDO1FBQzdELHFCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2pELElBQUksQ0FDSCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM3QixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDN0M7Ozs7O0lBVU8sNkNBQWU7Ozs7Y0FBQyxJQUFxQjtRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDOzs7Z0JBdEM3QixVQUFVOzs7O2dCQVpGLFVBQVU7OzhCQUhuQjs7U0FnQmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc2hhcmUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5leHBvcnQgdHlwZSBDYWxsT3B0aW9ucyA9IHtcbiAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICBwYXJhbXM/OiB7XG4gICAgW3Byb3A6IHN0cmluZ106IGFueTtcbiAgfTtcbn0gJiB7XG4gIFtwcm9wOiBzdHJpbmddOiBhbnk7XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjU2tldGNoZmFiU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICBwYWNoQ29uZmlncyh1aWQ6IHN0cmluZywgY29uZmlnczogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9O1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIGNvbnN0IHVybCA9ICdodHRwczovL2FwaS5za2V0Y2hmYWIuY29tL3YyL21vZGVscy8nICsgdWlkICsgJz90b2tlbj1iMjMwZmFjMjIyMjI0MzI1OGEzNjYxOTYwMGJhNzhjMSc7XG4gICAgY29uc3QgY2FsbE9ic2VydmFibGUgPSB0aGlzLmh0dHAucGF0Y2godXJsLCBjb25maWdzLCBvcHRpb25zKVxuICAgIC5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIGdldEFsbFRleHR1cmVzKHVpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBvcHRpb25zOiBDYWxsT3B0aW9ucyA9IHt9O1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTtcbiAgICBvcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL3NrZXRjaGZhYi5jb20vaS9tb2RlbHMvJHt1aWR9L3RleHR1cmVzYDtcbiAgICBjb25zdCBjYWxsT2JzZXJ2YWJsZSA9IHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKVxuICAgIC5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVPYnNlcnZhYmxlKGNhbGxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgIGNvbnN0IGJvZHlNZXNzYWdlID0gKGVycm9yICYmIGVycm9yLmVycm9yKSA/IGVycm9yLmVycm9yLm1lc3NhZ2UgOiAnJztcbiAgICBjb25zdCBzdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgY29uc3Qgc3RhdHVzVGV4dCA9IGVycm9yLnN0YXR1c1RleHQ7XG4gICAgcmV0dXJuIHRocm93RXJyb3IoeyBzdGF0dXMsIHN0YXR1c1RleHQsIG1lc3NhZ2UsIGJvZHlNZXNzYWdlIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzaGFyZU9ic2VydmFibGUoY2FsbDogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgcmV0dXJuIGNhbGwucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuIl19