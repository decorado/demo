/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class DecJobRoundComponent {
    constructor() {
        this.roundsQnt = 3;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set job(v) {
        if (v) {
            console.log(v);
            if (v.rounds.length > 1) {
                v.rounds[0].status = 'DENIED';
                if (v.rounds.length > 2) {
                    v.rounds[1].status = 'DENIED';
                }
            }
            this._job = v;
        }
    }
    /**
     * @return {?}
     */
    get job() {
        return this._job;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
DecJobRoundComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-job-round',
                template: `<dec-grid gap="0">
  <dec-grid-row>
    <dec-grid-column>
      <div class="header-title">
        <div *ngIf="job?.type == 'MODELING_FIX'" class="left-triangle modeling-fix">
          <mat-icon class="icon-position">build</mat-icon>
        </div>
        <div *ngIf="job?.type == 'COLOR'" class="left-triangle texture-color-swap">
          <mat-icon class="icon-position">palette</mat-icon>
        </div>
        <div *ngIf="job?.type == 'MODELING'" class="left-triangle full-model">
          <mat-icon class="icon-position"></mat-icon>
        </div>
        <div class="text-header" fxLayout="column" fxLayoutGap="2px">
          <span class="smaller-font dec-color-grey uppercase">{{ 'label.type' | translate }}</span>
          <span *ngIf="job?.type == 'MODELING_FIX'" class="font-text dec-font-500 uppercase">{{
            'label.modeling-fix-info' | translate }}</span>
          <span *ngIf="job?.type == 'COLOR'" class="font-text dec-font-500 uppercase">{{ 'label.color-variation-info' |
            translate }}</span>
          <span *ngIf="job?.type == 'MODELING'" class="font-text dec-font-500 uppercase">{{ 'label.full-model-info' |
            translate }}</span>
        </div>
      </div>
    </dec-grid-column>
  </dec-grid-row>
  <dec-grid-row>
    <dec-grid-column span="8">
      <dec-job-round-item [jobId]="job?.id" [round]="job?.rounds[0]" [roundQnt]="roundsQnt" [roundNumber]="1"></dec-job-round-item>
    </dec-grid-column>
  </dec-grid-row>
  <dec-grid-row>
    <dec-grid-column span="8">
      <dec-job-round-item [jobId]="job?.id" [round]="job?.rounds[1]" [roundQnt]="roundsQnt" [roundNumber]="2"></dec-job-round-item>
    </dec-grid-column>
  </dec-grid-row>
  <dec-grid-row>
    <dec-grid-column span="8">
      <dec-job-round-item [jobId]="job?.id" [round]="job?.rounds[2]" [roundQnt]="roundsQnt" [roundNumber]="3"></dec-job-round-item>
    </dec-grid-column>
  </dec-grid-row>
</dec-grid>
`,
                styles: [`.rounds-container{width:250px}.header-title{height:70px;width:100%}.left-triangle{position:relative;width:0;height:0;border-style:solid;border-width:58px 58px 0 0;text-indent:1px;line-height:1px;color:#fff}.modeling-fix{border-color:#ff8f00 transparent transparent}.texture-color-swap{border-color:#4f83fd transparent transparent}.full-model{border-color:#263238 transparent transparent}.icon-position{position:absolute;top:-56px;left:3px}.text-header{min-width:240px;max-width:500px;position:relative;top:-49px;left:55px}.font-text{font-size:16px}`]
            },] },
];
/** @nocollapse */
DecJobRoundComponent.ctorParameters = () => [];
DecJobRoundComponent.propDecorators = {
    job: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecJobRoundComponent.prototype._job;
    /** @type {?} */
    DecJobRoundComponent.prototype.roundsQnt;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWpvYi1yb3VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWpvYi1yb3VuZC9kZWMtam9iLXJvdW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFnRHpELE1BQU07SUF1Qko7eUJBRlksQ0FBQztLQUVJOzs7OztJQXJCakIsSUFDSSxHQUFHLENBQUMsQ0FBQztRQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO2dCQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7aUJBQy9CO2FBQ0Y7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNmO0tBQ0Y7Ozs7SUFFRCxJQUFJLEdBQUc7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjs7OztJQU9ELFFBQVE7S0FDUDs7O1lBeEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXlDWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxzaUJBQXNpQixDQUFDO2FBQ2pqQjs7Ozs7a0JBR0UsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtam9iLXJvdW5kJyxcbiAgdGVtcGxhdGU6IGA8ZGVjLWdyaWQgZ2FwPVwiMFwiPlxuICA8ZGVjLWdyaWQtcm93PlxuICAgIDxkZWMtZ3JpZC1jb2x1bW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJqb2I/LnR5cGUgPT0gJ01PREVMSU5HX0ZJWCdcIiBjbGFzcz1cImxlZnQtdHJpYW5nbGUgbW9kZWxpbmctZml4XCI+XG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbi1wb3NpdGlvblwiPmJ1aWxkPC9tYXQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJqb2I/LnR5cGUgPT0gJ0NPTE9SJ1wiIGNsYXNzPVwibGVmdC10cmlhbmdsZSB0ZXh0dXJlLWNvbG9yLXN3YXBcIj5cbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJpY29uLXBvc2l0aW9uXCI+cGFsZXR0ZTwvbWF0LWljb24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiam9iPy50eXBlID09ICdNT0RFTElORydcIiBjbGFzcz1cImxlZnQtdHJpYW5nbGUgZnVsbC1tb2RlbFwiPlxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb24tcG9zaXRpb25cIj48L21hdC1pY29uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaGVhZGVyXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjJweFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic21hbGxlci1mb250IGRlYy1jb2xvci1ncmV5IHVwcGVyY2FzZVwiPnt7ICdsYWJlbC50eXBlJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cImpvYj8udHlwZSA9PSAnTU9ERUxJTkdfRklYJ1wiIGNsYXNzPVwiZm9udC10ZXh0IGRlYy1mb250LTUwMCB1cHBlcmNhc2VcIj57e1xuICAgICAgICAgICAgJ2xhYmVsLm1vZGVsaW5nLWZpeC1pbmZvJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cImpvYj8udHlwZSA9PSAnQ09MT1InXCIgY2xhc3M9XCJmb250LXRleHQgZGVjLWZvbnQtNTAwIHVwcGVyY2FzZVwiPnt7ICdsYWJlbC5jb2xvci12YXJpYXRpb24taW5mbycgfFxuICAgICAgICAgICAgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiam9iPy50eXBlID09ICdNT0RFTElORydcIiBjbGFzcz1cImZvbnQtdGV4dCBkZWMtZm9udC01MDAgdXBwZXJjYXNlXCI+e3sgJ2xhYmVsLmZ1bGwtbW9kZWwtaW5mbycgfFxuICAgICAgICAgICAgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGVjLWdyaWQtY29sdW1uPlxuICA8L2RlYy1ncmlkLXJvdz5cbiAgPGRlYy1ncmlkLXJvdz5cbiAgICA8ZGVjLWdyaWQtY29sdW1uIHNwYW49XCI4XCI+XG4gICAgICA8ZGVjLWpvYi1yb3VuZC1pdGVtIFtqb2JJZF09XCJqb2I/LmlkXCIgW3JvdW5kXT1cImpvYj8ucm91bmRzWzBdXCIgW3JvdW5kUW50XT1cInJvdW5kc1FudFwiIFtyb3VuZE51bWJlcl09XCIxXCI+PC9kZWMtam9iLXJvdW5kLWl0ZW0+XG4gICAgPC9kZWMtZ3JpZC1jb2x1bW4+XG4gIDwvZGVjLWdyaWQtcm93PlxuICA8ZGVjLWdyaWQtcm93PlxuICAgIDxkZWMtZ3JpZC1jb2x1bW4gc3Bhbj1cIjhcIj5cbiAgICAgIDxkZWMtam9iLXJvdW5kLWl0ZW0gW2pvYklkXT1cImpvYj8uaWRcIiBbcm91bmRdPVwiam9iPy5yb3VuZHNbMV1cIiBbcm91bmRRbnRdPVwicm91bmRzUW50XCIgW3JvdW5kTnVtYmVyXT1cIjJcIj48L2RlYy1qb2Itcm91bmQtaXRlbT5cbiAgICA8L2RlYy1ncmlkLWNvbHVtbj5cbiAgPC9kZWMtZ3JpZC1yb3c+XG4gIDxkZWMtZ3JpZC1yb3c+XG4gICAgPGRlYy1ncmlkLWNvbHVtbiBzcGFuPVwiOFwiPlxuICAgICAgPGRlYy1qb2Itcm91bmQtaXRlbSBbam9iSWRdPVwiam9iPy5pZFwiIFtyb3VuZF09XCJqb2I/LnJvdW5kc1syXVwiIFtyb3VuZFFudF09XCJyb3VuZHNRbnRcIiBbcm91bmROdW1iZXJdPVwiM1wiPjwvZGVjLWpvYi1yb3VuZC1pdGVtPlxuICAgIDwvZGVjLWdyaWQtY29sdW1uPlxuICA8L2RlYy1ncmlkLXJvdz5cbjwvZGVjLWdyaWQ+XG5gLFxuICBzdHlsZXM6IFtgLnJvdW5kcy1jb250YWluZXJ7d2lkdGg6MjUwcHh9LmhlYWRlci10aXRsZXtoZWlnaHQ6NzBweDt3aWR0aDoxMDAlfS5sZWZ0LXRyaWFuZ2xle3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDo1OHB4IDU4cHggMCAwO3RleHQtaW5kZW50OjFweDtsaW5lLWhlaWdodDoxcHg7Y29sb3I6I2ZmZn0ubW9kZWxpbmctZml4e2JvcmRlci1jb2xvcjojZmY4ZjAwIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS50ZXh0dXJlLWNvbG9yLXN3YXB7Ym9yZGVyLWNvbG9yOiM0ZjgzZmQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LmZ1bGwtbW9kZWx7Ym9yZGVyLWNvbG9yOiMyNjMyMzggdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9Lmljb24tcG9zaXRpb257cG9zaXRpb246YWJzb2x1dGU7dG9wOi01NnB4O2xlZnQ6M3B4fS50ZXh0LWhlYWRlcnttaW4td2lkdGg6MjQwcHg7bWF4LXdpZHRoOjUwMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotNDlweDtsZWZ0OjU1cHh9LmZvbnQtdGV4dHtmb250LXNpemU6MTZweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNKb2JSb3VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGpvYih2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIGNvbnNvbGUubG9nKHYpO1xuICAgICAgaWYgKHYucm91bmRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdi5yb3VuZHNbMF0uc3RhdHVzID0gJ0RFTklFRCc7XG4gICAgICAgIGlmICh2LnJvdW5kcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgdi5yb3VuZHNbMV0uc3RhdHVzID0gJ0RFTklFRCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2pvYiA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGpvYigpIHtcbiAgICByZXR1cm4gdGhpcy5fam9iO1xuICB9XG5cbiAgcHJpdmF0ZSBfam9iO1xuICByb3VuZHNRbnQgPSAzO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cbn1cbiJdfQ==