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
export class DecDialogOpenConfiguration {
    /**
     * @param {?=} data
     */
    constructor(data = {}) {
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
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxNQUFNOzs7O0lBV0osWUFBWSxPQUFZLEVBQUU7cUJBRjBDLFNBQVM7UUFHM0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztLQUN0QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBEZWNEaWFsb2dBY3Rpb24ge1xuICBsYWJlbD86IHN0cmluZztcbiAgaTE4bkxhYmVsPzogc3RyaW5nO1xuICBjb2xvcj86ICdwcmltYXJ5JyB8ICdhY2NlbnQnIHwgJ3dhcm4nIHwgJ2RlZmF1bHQnO1xuICBidXR0b25UeXBlPzogJ21hdC1idXR0b24nIHwgJ21hdC1yYWlzZWQtYnV0dG9uJztcbiAgY2FsbGJhY2s6IChjb250ZXh0OiBhbnkpID0+IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIERlY0RpYWxvZ09wZW5Db25maWd1cmF0aW9uIHtcbiAgd2lkdGg/OiBzdHJpbmc7XG4gIGhlaWdodD86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHRvcEFjdGlvbnM/OiBEZWNEaWFsb2dBY3Rpb25bXTtcbiAgYm90dG9tQWN0aW9ucz86IERlY0RpYWxvZ0FjdGlvbltdO1xuICBjb250ZXh0PzogYW55O1xuICBoaWRlQmFja0J1dHRvbj86IGJvb2xlYW47XG4gIHNob3dDYW5jZWxCdXR0b24/OiBib29sZWFuO1xuICBjb2xvcj86ICdwcmltYXJ5JyB8ICdhY2NlbnQnIHwgJ3dhcm4nIHwgJ2RlZmF1bHQnIHwgJ3RyYW5zcGFyZW50JyA9ICdwcmltYXJ5JztcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkgPSB7fSkge1xuICAgIHRoaXMud2lkdGggPSBkYXRhLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgdGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XG4gICAgdGhpcy50b3BBY3Rpb25zID0gZGF0YS50b3BBY3Rpb25zO1xuICAgIHRoaXMuYm90dG9tQWN0aW9ucyA9IGRhdGEuYm90dG9tQWN0aW9ucztcbiAgICB0aGlzLmNvbnRleHQgPSBkYXRhLmNvbnRleHQ7XG4gICAgdGhpcy5oaWRlQmFja0J1dHRvbiA9IGRhdGEuaGlkZUJhY2tCdXR0b247XG4gICAgdGhpcy5zaG93Q2FuY2VsQnV0dG9uID0gZGF0YS5zaG93Q2FuY2VsQnV0dG9uO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yIHx8ICdwcmltYXJ5JztcbiAgfVxufVxuIl19