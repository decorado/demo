/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
window['decoraScriptService'] = window['decoraScriptService'] || {};
var DecScriptLoaderService = /** @class */ (function () {
    function DecScriptLoaderService() {
    }
    /**
     * @param {?} url
     * @param {?} scriptName
     * @return {?}
     */
    DecScriptLoaderService.prototype.load = /**
     * @param {?} url
     * @param {?} scriptName
     * @return {?}
     */
    function (url, scriptName) {
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var scriptLoaded = window['decoraScriptService'][scriptName];
            if (scriptLoaded) {
                /** @type {?} */
                var script = window[scriptName];
                resolve(script);
            }
            else {
                /** @type {?} */
                var scriptTag = document.createElement('script');
                scriptTag.setAttribute('src', url);
                scriptTag.setAttribute('type', 'text/javascript');
                scriptTag.onload = function () {
                    window['decoraScriptService'][scriptName] = true;
                    /** @type {?} */
                    var script = window[scriptName];
                    resolve(script);
                };
                scriptTag.onerror = reject;
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
        });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    DecScriptLoaderService.prototype.loadStyle = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return new Promise(function (resolve, reject) {
            window['scriptServiceLoadedStylesArray'] = window['scriptServiceLoadedStylesArray'] || {};
            /** @type {?} */
            var styleLoaded = window['scriptServiceLoadedStylesArray'][url];
            if (styleLoaded) {
                resolve();
            }
            else {
                /** @type {?} */
                var linkTag = document.createElement('link');
                linkTag.setAttribute('rel', 'stylesheet');
                linkTag.setAttribute('type', 'text/css');
                linkTag.setAttribute('media', 'all');
                linkTag.setAttribute('href', url);
                linkTag.onload = function () {
                    window['scriptServiceLoadedStylesArray'][url] = true;
                    resolve();
                };
                linkTag.onerror = reject;
                document.getElementsByTagName('head')[0].appendChild(linkTag);
            }
        });
    };
    /**
     * @param {?} styleUrl
     * @param {?} scriptUrl
     * @param {?} scriptNamespace
     * @return {?}
     */
    DecScriptLoaderService.prototype.loadStyleAndScript = /**
     * @param {?} styleUrl
     * @param {?} scriptUrl
     * @param {?} scriptNamespace
     * @return {?}
     */
    function (styleUrl, scriptUrl, scriptNamespace) {
        var _this = this;
        return this.loadStyle(styleUrl).then(function () {
            return _this.load(scriptUrl, scriptNamespace);
        });
    };
    DecScriptLoaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    DecScriptLoaderService.ctorParameters = function () { return []; };
    /** @nocollapse */ DecScriptLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function DecScriptLoaderService_Factory() { return new DecScriptLoaderService(); }, token: DecScriptLoaderService, providedIn: "root" });
    return DecScriptLoaderService;
}());
export { DecScriptLoaderService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNjcmlwdC1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7O0lBT2xFO0tBQWlCOzs7Ozs7SUFFakIscUNBQUk7Ozs7O0lBQUosVUFBSyxHQUFXLEVBQUUsVUFBa0I7UUFFbEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07O1lBQ2pDLElBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRS9ELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O2dCQUVqQixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRWxDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUVqQjtZQUFDLElBQUksQ0FBQyxDQUFDOztnQkFFTixJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVuRCxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFbkMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFFbEQsU0FBUyxDQUFDLE1BQU0sR0FBRztvQkFFakIsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDOztvQkFFakQsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUVsQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBRWpCLENBQUM7Z0JBRUYsU0FBUyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBRTNCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7YUFFakU7U0FFRixDQUFDLENBQUM7S0FFSjs7Ozs7SUFFRCwwQ0FBUzs7OztJQUFULFVBQVUsR0FBVztRQUVuQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUVqQyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsR0FBRyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsSUFBSSxFQUFFLENBQUM7O1lBRTFGLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWxFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBRWhCLE9BQU8sRUFBRSxDQUFDO2FBRVg7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBRU4sSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRWxDLE9BQU8sQ0FBQyxNQUFNLEdBQUc7b0JBRWYsTUFBTSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUVyRCxPQUFPLEVBQUUsQ0FBQztpQkFFWCxDQUFDO2dCQUVGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUV6QixRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBRS9EO1NBRUYsQ0FBQyxDQUFDO0tBRUo7Ozs7Ozs7SUFFRCxtREFBa0I7Ozs7OztJQUFsQixVQUFtQixRQUFRLEVBQUUsU0FBUyxFQUFFLGVBQWU7UUFBdkQsaUJBTUM7UUFKQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkMsTUFBTSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQzlDLENBQUMsQ0FBQztLQUVKOztnQkEzRkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7aUNBTkQ7O1NBT2Esc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG53aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXSA9IHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddIHx8IHt9O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGxvYWQodXJsOiBzdHJpbmcsIHNjcmlwdE5hbWU6IHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNjcmlwdExvYWRlZCA9IHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddW3NjcmlwdE5hbWVdO1xuXG4gICAgICBpZiAoc2NyaXB0TG9hZGVkKSB7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gd2luZG93W3NjcmlwdE5hbWVdO1xuXG4gICAgICAgIHJlc29sdmUoc2NyaXB0KTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBzY3JpcHRUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICBzY3JpcHRUYWcuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xuXG4gICAgICAgIHNjcmlwdFRhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG5cbiAgICAgICAgc2NyaXB0VGFnLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHdpbmRvd1snZGVjb3JhU2NyaXB0U2VydmljZSddW3NjcmlwdE5hbWVdID0gdHJ1ZTtcblxuICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHdpbmRvd1tzY3JpcHROYW1lXTtcblxuICAgICAgICAgIHJlc29sdmUoc2NyaXB0KTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIHNjcmlwdFRhZy5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0VGFnKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGxvYWRTdHlsZSh1cmw6IHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXSA9IHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J10gfHwge307XG5cbiAgICAgIGNvbnN0IHN0eWxlTG9hZGVkID0gd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXVt1cmxdO1xuXG4gICAgICBpZiAoc3R5bGVMb2FkZWQpIHtcblxuICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3QgbGlua1RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgICAgICAgbGlua1RhZy5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgJ2FsbCcpO1xuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG5cbiAgICAgICAgbGlua1RhZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddW3VybF0gPSB0cnVlO1xuXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbGlua1RhZy5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBsb2FkU3R5bGVBbmRTY3JpcHQoc3R5bGVVcmwsIHNjcmlwdFVybCwgc2NyaXB0TmFtZXNwYWNlKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoc3R5bGVVcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZChzY3JpcHRVcmwsIHNjcmlwdE5hbWVzcGFjZSk7XG4gICAgfSk7XG5cbiAgfVxufVxuIl19