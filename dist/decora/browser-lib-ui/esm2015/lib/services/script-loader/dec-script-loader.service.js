/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
window['decoraScriptService'] = window['decoraScriptService'] || {};
export class DecScriptLoaderService {
    constructor() { }
    /**
     * @param {?} url
     * @param {?} scriptName
     * @return {?}
     */
    load(url, scriptName) {
        return new Promise((resolve, reject) => {
            /** @type {?} */
            const scriptLoaded = window['decoraScriptService'][scriptName];
            if (scriptLoaded) {
                /** @type {?} */
                const script = window[scriptName];
                resolve(script);
            }
            else {
                /** @type {?} */
                const scriptTag = document.createElement('script');
                scriptTag.setAttribute('src', url);
                scriptTag.setAttribute('type', 'text/javascript');
                scriptTag.onload = function () {
                    window['decoraScriptService'][scriptName] = true;
                    /** @type {?} */
                    const script = window[scriptName];
                    resolve(script);
                };
                scriptTag.onerror = reject;
                document.getElementsByTagName('head')[0].appendChild(scriptTag);
            }
        });
    }
    ;
    /**
     * @param {?} url
     * @return {?}
     */
    loadStyle(url) {
        return new Promise((resolve, reject) => {
            window['scriptServiceLoadedStylesArray'] = window['scriptServiceLoadedStylesArray'] || {};
            /** @type {?} */
            const styleLoaded = window['scriptServiceLoadedStylesArray'][url];
            if (styleLoaded) {
                resolve();
            }
            else {
                /** @type {?} */
                const linkTag = document.createElement('link');
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
    }
    ;
    /**
     * @param {?} styleUrl
     * @param {?} scriptUrl
     * @param {?} scriptNamespace
     * @return {?}
     */
    loadStyleAndScript(styleUrl, scriptUrl, scriptNamespace) {
        return this.loadStyle(styleUrl).then(() => {
            return this.load(scriptUrl, scriptNamespace);
        });
    }
    /**
     * @return {?}
     */
    loadLeafletScriptsAndStyle() {
        return this.loadStyle('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css').then(() => {
            return this.loadStyle('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css').then(() => {
                return this.loadStyle('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css').then(() => {
                    return this.load('https://unpkg.com/leaflet@1.3.3/dist/leaflet.js', 'Leaflet').then(() => {
                        return this.load('https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js', 'EasyButton').then(() => {
                        });
                    });
                });
            });
        });
    }
}
DecScriptLoaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
DecScriptLoaderService.ctorParameters = () => [];
/** @nocollapse */ DecScriptLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function DecScriptLoaderService_Factory() { return new DecScriptLoaderService(); }, token: DecScriptLoaderService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXNjcmlwdC1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7QUFLcEUsTUFBTTtJQUVKLGlCQUFpQjs7Ozs7O0lBRWpCLElBQUksQ0FBQyxHQUFXLEVBQUUsVUFBa0I7UUFFbEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUvRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztnQkFFakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVsQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFFakI7WUFBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBRU4sTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFbkQsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRW5DLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7Z0JBRWxELFNBQVMsQ0FBQyxNQUFNLEdBQUc7b0JBRWpCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQzs7b0JBRWpELE1BQU0sTUFB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TUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxud2luZG93WydkZWNvcmFTY3JpcHRTZXJ2aWNlJ10gPSB3aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXSB8fCB7fTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGVjU2NyaXB0TG9hZGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBsb2FkKHVybDogc3RyaW5nLCBzY3JpcHROYW1lOiBzdHJpbmcpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBzY3JpcHRMb2FkZWQgPSB3aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXVtzY3JpcHROYW1lXTtcblxuICAgICAgaWYgKHNjcmlwdExvYWRlZCkge1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IHdpbmRvd1tzY3JpcHROYW1lXTtcblxuICAgICAgICByZXNvbHZlKHNjcmlwdCk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0VGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgc2NyaXB0VGFnLnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsKTtcblxuICAgICAgICBzY3JpcHRUYWcuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuXG4gICAgICAgIHNjcmlwdFRhZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICB3aW5kb3dbJ2RlY29yYVNjcmlwdFNlcnZpY2UnXVtzY3JpcHROYW1lXSA9IHRydWU7XG5cbiAgICAgICAgICBjb25zdCBzY3JpcHQgPSB3aW5kb3dbc2NyaXB0TmFtZV07XG5cbiAgICAgICAgICByZXNvbHZlKHNjcmlwdCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBzY3JpcHRUYWcub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHNjcmlwdFRhZyk7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH07XG5cbiAgbG9hZFN0eWxlKHVybDogc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddID0gd2luZG93WydzY3JpcHRTZXJ2aWNlTG9hZGVkU3R5bGVzQXJyYXknXSB8fCB7fTtcblxuICAgICAgY29uc3Qgc3R5bGVMb2FkZWQgPSB3aW5kb3dbJ3NjcmlwdFNlcnZpY2VMb2FkZWRTdHlsZXNBcnJheSddW3VybF07XG5cbiAgICAgIGlmIChzdHlsZUxvYWRlZCkge1xuXG4gICAgICAgIHJlc29sdmUoKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjb25zdCBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgICBsaW5rVGFnLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCAnYWxsJyk7XG4gICAgICAgIGxpbmtUYWcuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcblxuICAgICAgICBsaW5rVGFnLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIHdpbmRvd1snc2NyaXB0U2VydmljZUxvYWRlZFN0eWxlc0FycmF5J11bdXJsXSA9IHRydWU7XG5cbiAgICAgICAgICByZXNvbHZlKCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICBsaW5rVGFnLm9uZXJyb3IgPSByZWplY3Q7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rVGFnKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfTtcblxuICBsb2FkU3R5bGVBbmRTY3JpcHQoc3R5bGVVcmwsIHNjcmlwdFVybCwgc2NyaXB0TmFtZXNwYWNlKSB7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoc3R5bGVVcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZChzY3JpcHRVcmwsIHNjcmlwdE5hbWVzcGFjZSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGxvYWRMZWFmbGV0U2NyaXB0c0FuZFN0eWxlKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRTdHlsZSgnaHR0cHM6Ly91bnBrZy5jb20vbGVhZmxldEAxLjMuMy9kaXN0L2xlYWZsZXQuY3NzJykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkU3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5jc3MnKS50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZFN0eWxlKCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2xlYWZsZXQtZWFzeWJ1dHRvbkAyL3NyYy9lYXN5LWJ1dHRvbi5jc3MnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCdodHRwczovL3VucGtnLmNvbS9sZWFmbGV0QDEuMy4zL2Rpc3QvbGVhZmxldC5qcycsICdMZWFmbGV0JykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2xlYWZsZXQtZWFzeWJ1dHRvbkAyL3NyYy9lYXN5LWJ1dHRvbi5qcycsICdFYXN5QnV0dG9uJykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==