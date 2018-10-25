/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
/**
 * Cotrast configuration
 *
 * Used to define some custom configuration as colors and breakpoint
 * @record
 */
export function DecContrastFontWithBgDirectiveConfig() { }
/** @type {?} */
DecContrastFontWithBgDirectiveConfig.prototype.lumaBreakPoint;
/** @type {?} */
DecContrastFontWithBgDirectiveConfig.prototype.lightColor;
/** @type {?} */
DecContrastFontWithBgDirectiveConfig.prototype.darkColor;
/** @type {?} */
var DEFAULT_LUMA_BREAKPOINT = 200;
/**
 * @param {?} hex
 * @return {?}
 */
export function hexToRgbNew(hex) {
    /** @type {?} */
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
/**
 * @param {?} bgColor
 * @return {?}
 */
export function standardize_color(bgColor) {
    /** @type {?} */
    var canvas = document.createElement('canvas');
    /** @type {?} */
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    return ctx.fillStyle;
}
var DecContrastFontWithBgDirective = /** @class */ (function () {
    function DecContrastFontWithBgDirective(el) {
        this.el = el;
        this.bgColor = this.el.nativeElement.style.backgroundColor;
    }
    Object.defineProperty(DecContrastFontWithBgDirective.prototype, "decContrastFontWithBg", {
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this.config = config;
            this.doDecContrastFontWithBg();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecContrastFontWithBgDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bgColor = this.el.nativeElement.style.backgroundColor;
        if (bgColor !== this.bgColor) {
            this.bgColor = bgColor;
            this.doDecContrastFontWithBg();
        }
    };
    /**
     * @return {?}
     */
    DecContrastFontWithBgDirective.prototype.doDecContrastFontWithBg = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lumaBreakPoint = (this.config && this.config.lumaBreakPoint) ? this.config.lumaBreakPoint : DEFAULT_LUMA_BREAKPOINT;
        /** @type {?} */
        var hexaBgColor = standardize_color(this.bgColor);
        /** @type {?} */
        var rgbColor = hexToRgbNew(hexaBgColor);
        /** @type {?} */
        var luma = 0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b; // per ITU-R BT.709
        if (luma < lumaBreakPoint) {
            this.el.nativeElement.style.color = (this.config && this.config.lightColor) ? this.config.lightColor : 'rgba(255,255,255,1)';
        }
        else {
            this.el.nativeElement.style.color = (this.config && this.config.darkColor) ? this.config.darkColor : '#232e38';
        }
    };
    DecContrastFontWithBgDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[decContrastFontWithBg]'
                },] },
    ];
    /** @nocollapse */
    DecContrastFontWithBgDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    DecContrastFontWithBgDirective.propDecorators = {
        decContrastFontWithBg: [{ type: Input }]
    };
    return DecContrastFontWithBgDirective;
}());
export { DecContrastFontWithBgDirective };
if (false) {
    /** @type {?} */
    DecContrastFontWithBgDirective.prototype.config;
    /** @type {?} */
    DecContrastFontWithBgDirective.prototype.bgColor;
    /** @type {?} */
    DecContrastFontWithBgDirective.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbnRyYXN0LWZvbnQtd2l0aC1iZy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvY29sb3IvY29udHJhc3QtZm9udC13aXRoLWJnL2RlYy1jb250cmFzdC1mb250LXdpdGgtYmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVcsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQWF0RSxJQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQzs7Ozs7QUFnQnBDLE1BQU0sc0JBQXNCLEdBQUc7O0lBRTdCLElBQU0sTUFBTSxHQUFHLDJDQUEyQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0tBQzNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztDQUNWOzs7OztBQUVELE1BQU0sNEJBQTRCLE9BQU87O0lBRXZDLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBRWhELElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFcEMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7Q0FDdEI7O0lBb0JDLHdDQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7S0FFNUQ7SUFaRCxzQkFBYSxpRUFBcUI7Ozs7O1FBQWxDLFVBQW1DLE1BQTRDO1lBRTdFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRXJCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBRWhDOzs7T0FBQTs7OztJQVFELGtEQUFTOzs7SUFBVDs7UUFFRSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBRTVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUU3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUV2QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUVoQztLQUVGOzs7O0lBRU8sZ0VBQXVCOzs7OztRQUU3QixJQUFNLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDOztRQUUxSCxJQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBRXBELElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFFMUMsSUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFN0UsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFFMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO1NBRTlIO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBRWhIOzs7Z0JBdkRKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO2lCQUNwQzs7OztnQkFyRG1CLFVBQVU7Ozt3Q0E0RDNCLEtBQUs7O3lDQTVEUjs7U0FzRGEsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIENvdHJhc3QgY29uZmlndXJhdGlvblxuICpcbiAqIFVzZWQgdG8gZGVmaW5lIHNvbWUgY3VzdG9tIGNvbmZpZ3VyYXRpb24gYXMgY29sb3JzIGFuZCBicmVha3BvaW50XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnIHtcbiAgbHVtYUJyZWFrUG9pbnQ6IHN0cmluZztcbiAgbGlnaHRDb2xvcjogc3RyaW5nO1xuICBkYXJrQ29sb3I6IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQgPSAyMDA7XG5cbi8qXG4qIENvbnRyYXN0IEZvbnQgV2l0aCBCYWNrZ3JvdW5kIERpcmVjdGl2ZVxuKlxuKiBDb250cmFzdHMgdGhlIHRleHQgY29sb3Igd2l0aCB0aGUgYmFja2dyb3VuZC1jb2xvciB0byBhdm9pZCB3aGl0ZSBjb2xvciBpbiBsaWdoIGJhY2tncm91bmQgYW5kIGJsYWNrIGNvbG9yIGluIGRhcmtlbiBvbmVzLlxuKiBJdCBjYW4gYmUgdXNlZCBhcyBhdHRyaWJ1dGUgaW4gYW55IGVsZW1lbnQgd2l0aCBvciB3aXRob3V0IHBhc3NpbmcgY3VzdG9tIGNvbmZpZ3VyYXRpb25cbiogRXhhbXBsZSB3aXRob3V0IGN1c3RvbSBjb25maWd1cmF0aW9uOiA8ZGl2IGRlY0NvbnRyYXN0Rm9udFdpdGhCZ1wiPjwvZGl2PlxuKiBFeGFtcGxlIHdpdGggY3VzdG9tIGNvbmZpZ3VyYXRpb246IDxkaXYgW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ109XCJ7ZGFya0NvbG9yOiAncmVkJ31cIj48L2Rpdj5cbipcbiogQ29uZmlndXJhdGlvbiBwYXJhbXM6XG4qIGx1bWFCcmVha1BvaW50OiB0aGUgcG9pbnQgd2hlcmUgd2Ugc2hvdWxkIGNoYW5nZSB0aGUgZm9udCBjb2xvci4gVGhpcyBpcyB0aGUgbGlndGggZmVlbGluZyBicmVha3BvaW50LlxuKiBsaWdodENvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGRhcmsgYmFja2dyb3VuZHNcbiogZGFya0NvbG9yOiB0aGUgdGV4dCBjb2xvciB1c2VkIGluIGxpZ3RoIGJhY2tncm91bmRzXG4qL1xuXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9SZ2JOZXcoaGV4KSB7XG5cbiAgY29uc3QgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHJldHVybiByZXN1bHQgPyB7XG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgfSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFuZGFyZGl6ZV9jb2xvcihiZ0NvbG9yKSB7XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgY3R4LmZpbGxTdHlsZSA9IGJnQ29sb3I7XG5cbiAgcmV0dXJuIGN0eC5maWxsU3R5bGU7XG59XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0NvbnRyYXN0Rm9udFdpdGhCZ10nXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbnRyYXN0Rm9udFdpdGhCZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIHByaXZhdGUgY29uZmlnO1xuXG4gIHByaXZhdGUgYmdDb2xvcjtcblxuICBASW5wdXQoKSBzZXQgZGVjQ29udHJhc3RGb250V2l0aEJnKGNvbmZpZzogRGVjQ29udHJhc3RGb250V2l0aEJnRGlyZWN0aXZlQ29uZmlnKSB7XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcblxuICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuXG4gICAgdGhpcy5iZ0NvbG9yID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcjtcblxuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuXG4gICAgY29uc3QgYmdDb2xvciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBpZiAoYmdDb2xvciAhPT0gdGhpcy5iZ0NvbG9yKSB7XG5cbiAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG5cbiAgICAgIHRoaXMuZG9EZWNDb250cmFzdEZvbnRXaXRoQmcoKTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBkb0RlY0NvbnRyYXN0Rm9udFdpdGhCZygpIHtcblxuICAgIGNvbnN0IGx1bWFCcmVha1BvaW50ID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50KSA/IHRoaXMuY29uZmlnLmx1bWFCcmVha1BvaW50IDogREVGQVVMVF9MVU1BX0JSRUFLUE9JTlQ7XG5cbiAgICBjb25zdCBoZXhhQmdDb2xvciA9IHN0YW5kYXJkaXplX2NvbG9yKHRoaXMuYmdDb2xvcik7XG5cbiAgICBjb25zdCByZ2JDb2xvciA9IGhleFRvUmdiTmV3KGhleGFCZ0NvbG9yKTtcblxuICAgIGNvbnN0IGx1bWEgPSAwLjIxMjYgKiByZ2JDb2xvci5yICsgMC43MTUyICogcmdiQ29sb3IuZyArIDAuMDcyMiAqIHJnYkNvbG9yLmI7IC8vIHBlciBJVFUtUiBCVC43MDlcblxuICAgIGlmIChsdW1hIDwgbHVtYUJyZWFrUG9pbnQpIHtcblxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbG9yID0gKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmxpZ2h0Q29sb3IpID8gdGhpcy5jb25maWcubGlnaHRDb2xvciA6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5jb2xvciA9ICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5kYXJrQ29sb3IpID8gdGhpcy5jb25maWcuZGFya0NvbG9yIDogJyMyMzJlMzgnO1xuXG4gICAgfVxuXG4gIH1cbn1cblxuXG4iXX0=