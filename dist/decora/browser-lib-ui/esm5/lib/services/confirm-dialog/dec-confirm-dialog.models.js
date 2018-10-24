/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DecConfirmDialogConfig = /** @class */ (function () {
    function DecConfirmDialogConfig(data) {
        if (data === void 0) { data = {}; }
        this.color = 'primary';
        this.title = data.title;
        this.message = data.message;
        this.customButtonTitle = data.customButtonTitle || 'label.Confirm';
        this.width = data.width || '480px';
        this.height = data.height;
        this.color = data.color || 'transparent';
        this.extraButtons = data.extraButtons;
    }
    return DecConfirmDialogConfig;
}());
export { DecConfirmDialogConfig };
if (false) {
    /** @type {?} */
    DecConfirmDialogConfig.prototype.title;
    /** @type {?} */
    DecConfirmDialogConfig.prototype.message;
    /** @type {?} */
    DecConfirmDialogConfig.prototype.customButtonTitle;
    /** @type {?} */
    DecConfirmDialogConfig.prototype.width;
    /** @type {?} */
    DecConfirmDialogConfig.prototype.height;
    /** @type {?} */
    DecConfirmDialogConfig.prototype.color;
    /** @type {?} */
    DecConfirmDialogConfig.prototype.extraButtons;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbmZpcm0tZGlhbG9nLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlybS1kaWFsb2cvZGVjLWNvbmZpcm0tZGlhbG9nLm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsSUFBQTtJQVNFLGdDQUFZLElBQWM7UUFBZCxxQkFBQSxFQUFBLFNBQWM7cUJBSDBDLFNBQVM7UUFJM0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLGVBQWUsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUN2QztpQ0FuQkg7SUFvQkMsQ0FBQTtBQWxCRCxrQ0FrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaWFsb2dBY3Rpb24gfSBmcm9tICcuLy4uL2RpYWxvZy9kZWMtZGlhbG9nLm1vZGVscyc7XG5cbmV4cG9ydCBjbGFzcyBEZWNDb25maXJtRGlhbG9nQ29uZmlnIHtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgY3VzdG9tQnV0dG9uVGl0bGU/OiBzdHJpbmc7XG4gIHdpZHRoPzogc3RyaW5nO1xuICBoZWlnaHQ/OiBzdHJpbmc7XG4gIGNvbG9yPzogJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCAnZGVmYXVsdCcgfCAndHJhbnNwYXJlbnQnID0gJ3ByaW1hcnknO1xuICBleHRyYUJ1dHRvbnM/OiBEaWFsb2dBY3Rpb25bXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkgPSB7fSkge1xuICAgIHRoaXMudGl0bGUgPSBkYXRhLnRpdGxlO1xuICAgIHRoaXMubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICB0aGlzLmN1c3RvbUJ1dHRvblRpdGxlID0gZGF0YS5jdXN0b21CdXR0b25UaXRsZSB8fCAnbGFiZWwuQ29uZmlybSc7XG4gICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGggfHwgJzQ4MHB4JztcbiAgICB0aGlzLmhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yIHx8ICd0cmFuc3BhcmVudCc7XG4gICAgdGhpcy5leHRyYUJ1dHRvbnMgPSBkYXRhLmV4dHJhQnV0dG9ucztcbiAgfVxufVxuIl19