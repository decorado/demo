/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function DecDialogAction() { }
/** @type {?|undefined} */
DecDialogAction.prototype.label;
/** @type {?|undefined} */
DecDialogAction.prototype.i18nLabel;
/** @type {?|undefined} */
DecDialogAction.prototype.color;
/** @type {?|undefined} */
DecDialogAction.prototype.buttonType;
/** @type {?} */
DecDialogAction.prototype.callback;
var DecDialogOpenConfiguration = /** @class */ (function () {
    function DecDialogOpenConfiguration(data) {
        if (data === void 0) { data = {}; }
        this.color = 'primary';
        this.width = data.width;
        this.height = data.height;
        this.title = data.title;
        this.topActions = data.topActions;
        this.bottomActions = data.bottomActions;
        this.context = data.context;
        this.hideBackButton = data.hideBackButton;
        this.showCancelButton = data.showCancelButton;
        this.color = data.color || 'primary';
    }
    return DecDialogOpenConfiguration;
}());
export { DecDialogOpenConfiguration };
if (false) {
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.width;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.height;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.title;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.topActions;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.bottomActions;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.context;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.hideBackButton;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.showCancelButton;
    /** @type {?} */
    DecDialogOpenConfiguration.prototype.color;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxJQUFBO0lBV0Usb0NBQVksSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYztxQkFGMEMsU0FBUztRQUczRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO0tBQ3RDO3FDQTdCSDtJQThCQyxDQUFBO0FBdEJELHNDQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgRGVjRGlhbG9nQWN0aW9uIHtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIGkxOG5MYWJlbD86IHN0cmluZztcbiAgY29sb3I/OiAncHJpbWFyeScgfCAnYWNjZW50JyB8ICd3YXJuJyB8ICdkZWZhdWx0JztcbiAgYnV0dG9uVHlwZT86ICdtYXQtYnV0dG9uJyB8ICdtYXQtcmFpc2VkLWJ1dHRvbic7XG4gIGNhbGxiYWNrOiAoY29udGV4dDogYW55KSA9PiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWNEaWFsb2dPcGVuQ29uZmlndXJhdGlvbiB7XG4gIHdpZHRoPzogc3RyaW5nO1xuICBoZWlnaHQ/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICB0b3BBY3Rpb25zPzogRGVjRGlhbG9nQWN0aW9uW107XG4gIGJvdHRvbUFjdGlvbnM/OiBEZWNEaWFsb2dBY3Rpb25bXTtcbiAgY29udGV4dD86IGFueTtcbiAgaGlkZUJhY2tCdXR0b24/OiBib29sZWFuO1xuICBzaG93Q2FuY2VsQnV0dG9uPzogYm9vbGVhbjtcbiAgY29sb3I/OiAncHJpbWFyeScgfCAnYWNjZW50JyB8ICd3YXJuJyB8ICdkZWZhdWx0JyB8ICd0cmFuc3BhcmVudCcgPSAncHJpbWFyeSc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogYW55ID0ge30pIHtcbiAgICB0aGlzLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgIHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xuICAgIHRoaXMudG9wQWN0aW9ucyA9IGRhdGEudG9wQWN0aW9ucztcbiAgICB0aGlzLmJvdHRvbUFjdGlvbnMgPSBkYXRhLmJvdHRvbUFjdGlvbnM7XG4gICAgdGhpcy5jb250ZXh0ID0gZGF0YS5jb250ZXh0O1xuICAgIHRoaXMuaGlkZUJhY2tCdXR0b24gPSBkYXRhLmhpZGVCYWNrQnV0dG9uO1xuICAgIHRoaXMuc2hvd0NhbmNlbEJ1dHRvbiA9IGRhdGEuc2hvd0NhbmNlbEJ1dHRvbjtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvciB8fCAncHJpbWFyeSc7XG4gIH1cbn1cbiJdfQ==