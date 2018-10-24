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
export class OpenConfiguration {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWRpYWxvZy5tb2RlbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2RpYWxvZy9kZWMtZGlhbG9nLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxNQUFNOzs7O0lBV0osWUFBWSxPQUFZLEVBQUU7cUJBRjBDLFNBQVM7UUFHM0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztLQUN0QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBEaWFsb2dBY3Rpb24ge1xuICBsYWJlbD86IHN0cmluZztcbiAgaTE4bkxhYmVsPzogc3RyaW5nO1xuICBjYWxsYmFjazogRnVuY3Rpb247XG4gIGNvbG9yPzogJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCAnZGVmYXVsdCc7XG4gIGJ1dHRvblR5cGU/OiAnbWF0LWJ1dHRvbicgfCAnbWF0LXJhaXNlZC1idXR0b24nO1xufVxuXG5leHBvcnQgY2xhc3MgT3BlbkNvbmZpZ3VyYXRpb24ge1xuICB3aWR0aD86IHN0cmluZztcbiAgaGVpZ2h0Pzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgdG9wQWN0aW9ucz86IERpYWxvZ0FjdGlvbltdO1xuICBib3R0b21BY3Rpb25zPzogRGlhbG9nQWN0aW9uW107XG4gIGNvbnRleHQ/OiBhbnk7XG4gIGhpZGVCYWNrQnV0dG9uPzogYm9vbGVhbjtcbiAgc2hvd0NhbmNlbEJ1dHRvbj86IGJvb2xlYW47XG4gIGNvbG9yPzogJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCAnZGVmYXVsdCcgfCAndHJhbnNwYXJlbnQnID0gJ3ByaW1hcnknO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IGFueSA9IHt9KSB7XG4gICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICB0aGlzLnRpdGxlID0gZGF0YS50aXRsZTtcbiAgICB0aGlzLnRvcEFjdGlvbnMgPSBkYXRhLnRvcEFjdGlvbnM7XG4gICAgdGhpcy5ib3R0b21BY3Rpb25zID0gZGF0YS5ib3R0b21BY3Rpb25zO1xuICAgIHRoaXMuY29udGV4dCA9IGRhdGEuY29udGV4dDtcbiAgICB0aGlzLmhpZGVCYWNrQnV0dG9uID0gZGF0YS5oaWRlQmFja0J1dHRvbjtcbiAgICB0aGlzLnNob3dDYW5jZWxCdXR0b24gPSBkYXRhLnNob3dDYW5jZWxCdXR0b247XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3IgfHwgJ3ByaW1hcnknO1xuICB9XG59XG4iXX0=