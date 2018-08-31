/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var DecWsClientService = /** @class */ (function () {
    function DecWsClientService() {
        this.connection = {};
    }
    /**
     * @param {?} url
     * @return {?}
     */
    DecWsClientService.prototype.connect = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var connection = this.connection[url];
        if (connection) {
            return connection;
        }
        else {
            return this.connectToWs(url);
        }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    DecWsClientService.prototype.connectToWs = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var connection = this.openConnection(url);
        this.connection[url] = connection;
        return connection;
    };
    /**
     * @param {?} url
     * @param {?=} connection
     * @return {?}
     */
    DecWsClientService.prototype.openConnection = /**
     * @param {?} url
     * @param {?=} connection
     * @return {?}
     */
    function (url, connection) {
        var _this = this;
        if (connection) {
            connection.channel = new WebSocket(url);
        }
        else {
            connection = connection ? connection : {
                channel: new WebSocket(url),
                messages: new BehaviorSubject([]),
            };
        }
        connection.channel.onclose = function () { return _this.openConnection(url, connection); };
        connection.channel.onerror = function () { return _this.openConnection(url, connection); };
        connection.channel.onmessage = function (a) {
            /** @type {?} */
            var currentMessages = connection.messages.getValue();
            currentMessages.unshift(a.data);
            connection.messages.next(currentMessages);
        };
        return connection;
    };
    DecWsClientService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DecWsClientService.ctorParameters = function () { return []; };
    return DecWsClientService;
}());
export { DecWsClientService };
if (false) {
    /** @type {?} */
    DecWsClientService.prototype.connection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3MtY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3dzLWNsaWVudC93cy1jbGllbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOztJQVVqRDswQkFGSSxFQUFFO0tBRVU7Ozs7O0lBRWhCLG9DQUFPOzs7O0lBQVAsVUFBUSxHQUFHOztRQUVULElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUVmLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FFbkI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBRTlCO0tBRUY7Ozs7O0lBRU8sd0NBQVc7Ozs7Y0FBQyxHQUFHOztRQUVyQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7SUFLWiwyQ0FBYzs7Ozs7Y0FBQyxHQUFXLEVBQUUsVUFBMkI7O1FBRTdELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFZixVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBRXpDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUMzQixRQUFRLEVBQUUsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDO2FBQzVDLENBQUM7U0FFSDtRQUVELFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQUV4RSxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQXBDLENBQW9DLENBQUM7UUFFeEUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsVUFBQyxDQUFDOztZQUUvQixJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXZELGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWhDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBRTNDLENBQUM7UUFFRixNQUFNLENBQUMsVUFBVSxDQUFDOzs7Z0JBakVyQixVQUFVOzs7OzZCQUpYOztTQUthLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3BlbkNvbm5lY3Rpb24gfSBmcm9tICcuL3dzLWNsaWVudC5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGVjV3NDbGllbnRTZXJ2aWNlIHtcblxuICBwcml2YXRlIGNvbm5lY3Rpb246IHtcbiAgICBba2V5OiBzdHJpbmddOiBPcGVuQ29ubmVjdGlvblxuICB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNvbm5lY3QodXJsKSB7XG5cbiAgICBjb25zdCBjb25uZWN0aW9uID0gdGhpcy5jb25uZWN0aW9uW3VybF07XG5cbiAgICBpZiAoY29ubmVjdGlvbikge1xuXG4gICAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RUb1dzKHVybCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgY29ubmVjdFRvV3ModXJsKTogT3BlbkNvbm5lY3Rpb24ge1xuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMub3BlbkNvbm5lY3Rpb24odXJsKTtcblxuICAgIHRoaXMuY29ubmVjdGlvblt1cmxdID0gY29ubmVjdGlvbjtcblxuICAgIHJldHVybiBjb25uZWN0aW9uO1xuXG4gIH1cblxuXG4gIHByaXZhdGUgb3BlbkNvbm5lY3Rpb24odXJsOiBzdHJpbmcsIGNvbm5lY3Rpb24/OiBPcGVuQ29ubmVjdGlvbik6IE9wZW5Db25uZWN0aW9uIHtcblxuICAgIGlmIChjb25uZWN0aW9uKSB7XG5cbiAgICAgIGNvbm5lY3Rpb24uY2hhbm5lbCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbm5lY3Rpb24gPSBjb25uZWN0aW9uID8gY29ubmVjdGlvbiA6IHtcbiAgICAgICAgY2hhbm5lbDogbmV3IFdlYlNvY2tldCh1cmwpLFxuICAgICAgICBtZXNzYWdlczogbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pLFxuICAgICAgfTtcblxuICAgIH1cblxuICAgIGNvbm5lY3Rpb24uY2hhbm5lbC5vbmNsb3NlID0gKCkgPT4gdGhpcy5vcGVuQ29ubmVjdGlvbih1cmwsIGNvbm5lY3Rpb24pO1xuXG4gICAgY29ubmVjdGlvbi5jaGFubmVsLm9uZXJyb3IgPSAoKSA9PiB0aGlzLm9wZW5Db25uZWN0aW9uKHVybCwgY29ubmVjdGlvbik7XG5cbiAgICBjb25uZWN0aW9uLmNoYW5uZWwub25tZXNzYWdlID0gKGEpID0+IHtcblxuICAgICAgY29uc3QgY3VycmVudE1lc3NhZ2VzID0gY29ubmVjdGlvbi5tZXNzYWdlcy5nZXRWYWx1ZSgpO1xuXG4gICAgICBjdXJyZW50TWVzc2FnZXMudW5zaGlmdChhLmRhdGEpO1xuXG4gICAgICBjb25uZWN0aW9uLm1lc3NhZ2VzLm5leHQoY3VycmVudE1lc3NhZ2VzKTtcblxuICAgIH07XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcblxuICB9XG5cbn1cbiJdfQ==