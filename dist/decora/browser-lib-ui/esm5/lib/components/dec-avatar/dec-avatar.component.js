/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var DecAvatarComponent = /** @class */ (function () {
    function DecAvatarComponent() {
    }
    Object.defineProperty(DecAvatarComponent.prototype, "account", {
        get: /**
         * @return {?}
         */
        function () {
            return this._account;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._account) {
                this._account = v;
                if (v && !v['profilePicture']) {
                    this.getInitialsName();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecAvatarComponent.prototype.getInitialsName = /**
     * @return {?}
     */
    function () {
        if (!this.account['profilePicture']) {
            var name_1 = this.account.name;
            this.initialsName = name_1[0].toUpperCase();
            /** @type {?} */
            var arrName = name_1.split(' ');
            this.initialsName += arrName[arrName.length - 1][0].toUpperCase();
        }
    };
    DecAvatarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-avatar',
                    template: "<div class=\"avatar\" *ngIf=\"account?.profilePicture\" [decImage]=\"account?.profilePicture\" [decImageSize]=\"{width:200, height:200}\"></div>\n\n<div *ngIf=\"!account?.profilePicture\" class=\"avatar-initials\">\n  {{ initialsName }}\n</div>\n",
                    styles: [".avatar{width:52px;height:52px;border-radius:50%;background-color:#f1f1f1}.avatar-initials{width:52px;height:52px;border-radius:50%;background-color:#ef3f54;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"]
                },] },
    ];
    DecAvatarComponent.propDecorators = {
        account: [{ type: Input }]
    };
    return DecAvatarComponent;
}());
export { DecAvatarComponent };
if (false) {
    /** @type {?} */
    DecAvatarComponent.prototype._account;
    /** @type {?} */
    DecAvatarComponent.prototype.initialsName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWF2YXRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWF2YXRhci9kZWMtYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7SUFjL0Msc0JBQ0ksdUNBQU87Ozs7UUFVWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7OztRQWJELFVBQ1ksQ0FBTTtZQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDeEI7YUFDRjtTQUNGOzs7T0FBQTs7OztJQVNPLDRDQUFlOzs7O1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFBLDBCQUFJLENBQWtCO1lBRTlCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUMxQyxJQUFNLE9BQU8sR0FBRyxNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkU7OztnQkFyQ0osU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsd1BBS1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMscVZBQXFWLENBQUM7aUJBQ2hXOzs7MEJBR0UsS0FBSzs7NkJBZFI7O1NBWWEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXZhdGFyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYXZhdGFyXCIgKm5nSWY9XCJhY2NvdW50Py5wcm9maWxlUGljdHVyZVwiIFtkZWNJbWFnZV09XCJhY2NvdW50Py5wcm9maWxlUGljdHVyZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjIwMCwgaGVpZ2h0OjIwMH1cIj48L2Rpdj5cblxuPGRpdiAqbmdJZj1cIiFhY2NvdW50Py5wcm9maWxlUGljdHVyZVwiIGNsYXNzPVwiYXZhdGFyLWluaXRpYWxzXCI+XG4gIHt7IGluaXRpYWxzTmFtZSB9fVxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmF2YXRhcnt3aWR0aDo1MnB4O2hlaWdodDo1MnB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2YxZjFmMX0uYXZhdGFyLWluaXRpYWxze3dpZHRoOjUycHg7aGVpZ2h0OjUycHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojZWYzZjU0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo4MDA7Y29sb3I6I2ZmZjstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXZhdGFyQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgYWNjb3VudCh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fYWNjb3VudCkge1xuICAgICAgdGhpcy5fYWNjb3VudCA9IHY7XG5cbiAgICAgIGlmICh2ICYmICF2Wydwcm9maWxlUGljdHVyZSddKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5pdGlhbHNOYW1lKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjY291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjY291bnQ7XG4gIH1cbiAgcHJpdmF0ZSBfYWNjb3VudDogYW55O1xuXG4gIGluaXRpYWxzTmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgZ2V0SW5pdGlhbHNOYW1lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hY2NvdW50Wydwcm9maWxlUGljdHVyZSddKSB7XG4gICAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuYWNjb3VudDtcblxuICAgICAgdGhpcy5pbml0aWFsc05hbWUgPSBuYW1lWzBdLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCBhcnJOYW1lID0gbmFtZS5zcGxpdCgnICcpO1xuICAgICAgdGhpcy5pbml0aWFsc05hbWUgKz0gYXJyTmFtZVthcnJOYW1lLmxlbmd0aCAtIDFdWzBdLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==