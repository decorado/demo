/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function DialogAction() { }
/** @type {?|undefined} */
DialogAction.prototype.label;
/** @type {?|undefined} */
DialogAction.prototype.i18nLabel;
/** @type {?} */
DialogAction.prototype.callback;
/** @type {?|undefined} */
DialogAction.prototype.color;
/** @type {?|undefined} */
DialogAction.prototype.buttonType;
var OpenConfiguration = /** @class */ (function () {
    function OpenConfiguration(data) {
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
    return OpenConfiguration;
}());
export { OpenConfiguration };
if (false) {
    /** @type {?} */
    OpenConfiguration.prototype.width;
    /** @type {?} */
    OpenConfiguration.prototype.height;
    /** @type {?} */
    OpenConfiguration.prototype.title;
    /** @type {?} */
    OpenConfiguration.prototype.topActions;
    /** @type {?} */
    OpenConfiguration.prototype.bottomActions;
    /** @type {?} */
    OpenConfiguration.prototype.context;
    /** @type {?} */
    OpenConfiguration.prototype.hideBackButton;
    /** @type {?} */
    OpenConfiguration.prototype.showCancelButton;
    /** @type {?} */
    OpenConfiguration.prototype.color;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxJQUFBO0lBV0UsMkJBQVksSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYztxQkFGMEMsU0FBUztRQUczRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO0tBQ3RDOzRCQTdCSDtJQThCQyxDQUFBO0FBdEJELDZCQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nQWN0aW9uIHtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIGkxOG5MYWJlbD86IHN0cmluZztcbiAgY2FsbGJhY2s6IEZ1bmN0aW9uO1xuICBjb2xvcj86ICdwcmltYXJ5JyB8ICdhY2NlbnQnIHwgJ3dhcm4nIHwgJ2RlZmF1bHQnO1xuICBidXR0b25UeXBlPzogJ21hdC1idXR0b24nIHwgJ21hdC1yYWlzZWQtYnV0dG9uJztcbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5Db25maWd1cmF0aW9uIHtcbiAgd2lkdGg/OiBzdHJpbmc7XG4gIGhlaWdodD86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHRvcEFjdGlvbnM/OiBEaWFsb2dBY3Rpb25bXTtcbiAgYm90dG9tQWN0aW9ucz86IERpYWxvZ0FjdGlvbltdO1xuICBjb250ZXh0PzogYW55O1xuICBoaWRlQmFja0J1dHRvbj86IGJvb2xlYW47XG4gIHNob3dDYW5jZWxCdXR0b24/OiBib29sZWFuO1xuICBjb2xvcj86ICdwcmltYXJ5JyB8ICdhY2NlbnQnIHwgJ3dhcm4nIHwgJ2RlZmF1bHQnIHwgJ3RyYW5zcGFyZW50JyA9ICdwcmltYXJ5JztcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkgPSB7fSkge1xuICAgIHRoaXMud2lkdGggPSBkYXRhLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG4gICAgdGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XG4gICAgdGhpcy50b3BBY3Rpb25zID0gZGF0YS50b3BBY3Rpb25zO1xuICAgIHRoaXMuYm90dG9tQWN0aW9ucyA9IGRhdGEuYm90dG9tQWN0aW9ucztcbiAgICB0aGlzLmNvbnRleHQgPSBkYXRhLmNvbnRleHQ7XG4gICAgdGhpcy5oaWRlQmFja0J1dHRvbiA9IGRhdGEuaGlkZUJhY2tCdXR0b247XG4gICAgdGhpcy5zaG93Q2FuY2VsQnV0dG9uID0gZGF0YS5zaG93Q2FuY2VsQnV0dG9uO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yIHx8ICdwcmltYXJ5JztcbiAgfVxufVxuIl19