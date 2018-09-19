/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export class DecLoaderService {
    /**
     * @param {?} translateService
     */
    constructor(translateService) {
        this.translateService = translateService;
    }
    /**
     * @param {?} message
     * @param {?=} duration
     * @return {?}
     */
    addBlockerBackground(message, duration) {
        /** @type {?} */
        const existLoader = document.getElementById('blockerContentLoading');
        if (existLoader) {
            return;
        }
        /** @type {?} */
        const loading = document.createElement('div');
        loading.id = 'blockerContentLoading';
        loading.style.position = 'absolute';
        loading.style.top = '0';
        loading.style.left = '0';
        loading.style.backgroundColor = 'rgba(0,0,0,0.3)';
        loading.style.width = '100%';
        loading.style.height = '100%';
        loading.style.zIndex = '9999';
        loading.style.display = 'flex';
        loading.style.justifyContent = 'center';
        loading.style.alignItems = 'center';
        loading.style.flexDirection = 'column-reverse';
        /** @type {?} */
        const description = document.createElement('h1');
        description.innerText = this.translateService.instant(message);
        loading.appendChild(description);
        /** @type {?} */
        const spinner = document.createElement('span');
        spinner.style.width = '4rem';
        spinner.style.height = '4rem';
        spinner.style.borderTopColor = '#444';
        spinner.style.borderLeftColor = '#444';
        spinner.style.borderBottomColor = 'transparent';
        spinner.style.borderRightColor = 'transparent';
        spinner.style.borderStyle = 'solid';
        spinner.style.borderWidth = '12px';
        spinner.style.borderRadius = '50%';
        spinner.style.animation = 'spinIt 1000ms infinite ease-in-out';
        loading.appendChild(spinner);
        document.body.appendChild(loading);
        /** @type {?} */
        const style = document.createElement('style');
        style.type = 'text/css';
        /** @type {?} */
        const keyFrames = '\
    @-webkit-keyframes spinIt {\
        100% {\
            -webkit-transform: rotate(A_DYNAMIC_VALUE);\
        }\
    }\
    @-moz-keyframes spinIt {\
        100% {\
            -webkit-transform: rotate(A_DYNAMIC_VALUE);\
        }\
    }';
        style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, '360deg');
        loading.appendChild(style);
        if (duration) {
            setTimeout(() => {
                this.removeBlockerBackground();
            }, duration);
        }
    }
    /**
     * @return {?}
     */
    removeBlockerBackground() {
        document.getElementById('blockerContentLoading').remove();
    }
}
DecLoaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
DecLoaderService.ctorParameters = () => [
    { type: TranslateService }
];
/** @nocollapse */ DecLoaderService.ngInjectableDef = i0.defineInjectable({ factory: function DecLoaderService_Factory() { return new DecLoaderService(i0.inject(i1.TranslateService)); }, token: DecLoaderService, providedIn: "root" });
if (false) {
    /** @type {?} */
    DecLoaderService.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sb2FkZXIvZGVjLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFLdkQsTUFBTTs7OztJQUVKLFlBQW9CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0tBQUs7Ozs7OztJQUczRCxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsUUFBUzs7UUFFckMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1NBQ1I7O1FBRUQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsRUFBRSxHQUFHLHVCQUF1QixDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDO1FBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDOztRQUMvQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUNqQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztRQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztRQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLGFBQWEsQ0FBQztRQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztRQUMvRCxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUNuQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDOztRQUN4QixNQUFNLFNBQVMsR0FBRzs7Ozs7Ozs7OztNQVVoQixDQUFDO1FBQ0gsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7YUFDaEMsRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUNiO0tBQ0Y7Ozs7SUFHRCx1QkFBdUI7UUFDckIsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQzNEOzs7WUF0RUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBSlEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZWNMb2FkZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIC8vIEZJWCBNRTogUGFsZWF0aXZvIGF0ZSBvIGNvbXBvbmVudGUgZGVjLWxvYWRlciBzZXIgY3JpYWRvXG4gIGFkZEJsb2NrZXJCYWNrZ3JvdW5kKG1lc3NhZ2UsIGR1cmF0aW9uPykge1xuICAgIFxuICAgIGNvbnN0IGV4aXN0TG9hZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2NrZXJDb250ZW50TG9hZGluZycpO1xuICAgIGlmIChleGlzdExvYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxvYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsb2FkaW5nLmlkID0gJ2Jsb2NrZXJDb250ZW50TG9hZGluZyc7XG4gICAgbG9hZGluZy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgbG9hZGluZy5zdHlsZS50b3AgPSAnMCc7XG4gICAgbG9hZGluZy5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgIGxvYWRpbmcuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwwLDAsMC4zKSc7XG4gICAgbG9hZGluZy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBsb2FkaW5nLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBsb2FkaW5nLnN0eWxlLnpJbmRleCA9ICc5OTk5JztcbiAgICBsb2FkaW5nLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgbG9hZGluZy5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInO1xuICAgIGxvYWRpbmcuc3R5bGUuYWxpZ25JdGVtcyA9ICdjZW50ZXInO1xuICAgIGxvYWRpbmcuc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4tcmV2ZXJzZSc7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGRlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KG1lc3NhZ2UpO1xuICAgIGxvYWRpbmcuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICAgIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bpbm5lci5zdHlsZS53aWR0aCA9ICc0cmVtJztcbiAgICBzcGlubmVyLnN0eWxlLmhlaWdodCA9ICc0cmVtJztcbiAgICBzcGlubmVyLnN0eWxlLmJvcmRlclRvcENvbG9yID0gJyM0NDQnO1xuICAgIHNwaW5uZXIuc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gJyM0NDQnO1xuICAgIHNwaW5uZXIuc3R5bGUuYm9yZGVyQm90dG9tQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgIHNwaW5uZXIuc3R5bGUuYm9yZGVyUmlnaHRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgc3Bpbm5lci5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG4gICAgc3Bpbm5lci5zdHlsZS5ib3JkZXJXaWR0aCA9ICcxMnB4JztcbiAgICBzcGlubmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuICAgIHNwaW5uZXIuc3R5bGUuYW5pbWF0aW9uID0gJ3NwaW5JdCAxMDAwbXMgaW5maW5pdGUgZWFzZS1pbi1vdXQnO1xuICAgIGxvYWRpbmcuYXBwZW5kQ2hpbGQoc3Bpbm5lcik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkaW5nKTtcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgY29uc3Qga2V5RnJhbWVzID0gJ1xcXG4gICAgQC13ZWJraXQta2V5ZnJhbWVzIHNwaW5JdCB7XFxcbiAgICAgICAgMTAwJSB7XFxcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoQV9EWU5BTUlDX1ZBTFVFKTtcXFxuICAgICAgICB9XFxcbiAgICB9XFxcbiAgICBALW1vei1rZXlmcmFtZXMgc3Bpbkl0IHtcXFxuICAgICAgICAxMDAlIHtcXFxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZShBX0RZTkFNSUNfVkFMVUUpO1xcXG4gICAgICAgIH1cXFxuICAgIH0nO1xuICAgIHN0eWxlLmlubmVySFRNTCA9IGtleUZyYW1lcy5yZXBsYWNlKC9BX0RZTkFNSUNfVkFMVUUvZywgJzM2MGRlZycpO1xuICAgIGxvYWRpbmcuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVCbG9ja2VyQmFja2dyb3VuZCgpO1xuICAgICAgfSwgZHVyYXRpb24pXG4gICAgfVxuICB9XG5cbiAgLy8gRklYIE1FOiBQYWxlYXRpdm8gYXRlIG8gY29tcG9uZW50ZSBkZWMtbG9hZGVyIHNlciBjcmlhZG9cbiAgcmVtb3ZlQmxvY2tlckJhY2tncm91bmQoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2NrZXJDb250ZW50TG9hZGluZycpLnJlbW92ZSgpO1xuICB9XG59XG4iXX0=