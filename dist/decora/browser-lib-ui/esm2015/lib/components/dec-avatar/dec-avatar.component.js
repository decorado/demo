/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class DecAvatarComponent {
    /**
     * @param {?} v
     * @return {?}
     */
    set account(v) {
        if (v !== this._account) {
            this._account = v;
            if (v && !v['profilePicture']) {
                this.getInitialsName();
            }
        }
    }
    /**
     * @return {?}
     */
    get account() {
        return this._account;
    }
    /**
     * @return {?}
     */
    getInitialsName() {
        if (!this.account['profilePicture']) {
            const { name } = this.account;
            this.initialsName = name[0].toUpperCase();
            /** @type {?} */
            const arrName = name.split(' ');
            this.initialsName += arrName[arrName.length - 1][0].toUpperCase();
        }
    }
}
DecAvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-avatar',
                template: `<div class="avatar" *ngIf="account?.profilePicture" [decImage]="account?.profilePicture" [decImageSize]="{width:200, height:200}"></div>

<div *ngIf="!account?.profilePicture" class="avatar-initials">
  {{ initialsName }}
</div>
`,
                styles: [`.avatar{width:52px;height:52px;border-radius:50%;background-color:#f1f1f1}.avatar-initials{width:52px;height:52px;border-radius:50%;background-color:#ef3f54;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`]
            },] },
];
DecAvatarComponent.propDecorators = {
    account: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecAvatarComponent.prototype._account;
    /** @type {?} */
    DecAvatarComponent.prototype.initialsName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWF2YXRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWF2YXRhci9kZWMtYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZakQsTUFBTTs7Ozs7SUFFSixJQUNJLE9BQU8sQ0FBQyxDQUFNO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN4QjtTQUNGO0tBQ0Y7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7OztJQUtPLGVBQWU7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRTlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUMxQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkU7Ozs7WUFyQ0osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7O0NBS1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMscVZBQXFWLENBQUM7YUFDaFc7OztzQkFHRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXZhdGFyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYXZhdGFyXCIgKm5nSWY9XCJhY2NvdW50Py5wcm9maWxlUGljdHVyZVwiIFtkZWNJbWFnZV09XCJhY2NvdW50Py5wcm9maWxlUGljdHVyZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjIwMCwgaGVpZ2h0OjIwMH1cIj48L2Rpdj5cblxuPGRpdiAqbmdJZj1cIiFhY2NvdW50Py5wcm9maWxlUGljdHVyZVwiIGNsYXNzPVwiYXZhdGFyLWluaXRpYWxzXCI+XG4gIHt7IGluaXRpYWxzTmFtZSB9fVxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmF2YXRhcnt3aWR0aDo1MnB4O2hlaWdodDo1MnB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQtY29sb3I6I2YxZjFmMX0uYXZhdGFyLWluaXRpYWxze3dpZHRoOjUycHg7aGVpZ2h0OjUycHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZC1jb2xvcjojZWYzZjU0O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXNpemU6MjRweDtmb250LXdlaWdodDo4MDA7Y29sb3I6I2ZmZjstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXZhdGFyQ29tcG9uZW50IHtcblxuICBASW5wdXQoKVxuICBzZXQgYWNjb3VudCh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fYWNjb3VudCkge1xuICAgICAgdGhpcy5fYWNjb3VudCA9IHY7XG5cbiAgICAgIGlmICh2ICYmICF2Wydwcm9maWxlUGljdHVyZSddKSB7XG4gICAgICAgIHRoaXMuZ2V0SW5pdGlhbHNOYW1lKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjY291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjY291bnQ7XG4gIH1cbiAgcHJpdmF0ZSBfYWNjb3VudDogYW55O1xuXG4gIGluaXRpYWxzTmFtZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgZ2V0SW5pdGlhbHNOYW1lKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hY2NvdW50Wydwcm9maWxlUGljdHVyZSddKSB7XG4gICAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuYWNjb3VudDtcblxuICAgICAgdGhpcy5pbml0aWFsc05hbWUgPSBuYW1lWzBdLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCBhcnJOYW1lID0gbmFtZS5zcGxpdCgnICcpO1xuICAgICAgdGhpcy5pbml0aWFsc05hbWUgKz0gYXJyTmFtZVthcnJOYW1lLmxlbmd0aCAtIDFdWzBdLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==