/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecJobRoundItemComponent } from './dec-job-round-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { DecLabelStatusModule } from './../../dec-label-status/dec-label-status.module';
import { TimeAgoModule } from './../../../pipes/time-ago/time-ago.module';
import { TranslateModule } from '@ngx-translate/core';
import { DecCountdownModule } from './../../dec-countdown/dec-countdown.module';
export class DecJobRoundItemModule {
}
DecJobRoundItemModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    MatIconModule,
                    DecLabelStatusModule,
                    TimeAgoModule,
                    TranslateModule,
                    DecCountdownModule
                ],
                declarations: [
                    DecJobRoundItemComponent
                ],
                exports: [
                    DecJobRoundItemComponent
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWpvYi1yb3VuZC1pdGVtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtam9iLXJvdW5kL2RlYy1qb2Itcm91bmQtaXRlbS9kZWMtam9iLXJvdW5kLWl0ZW0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQW1CaEYsTUFBTTs7O1lBakJMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLGVBQWU7b0JBQ2Ysa0JBQWtCO2lCQUNuQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO2lCQUN6QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1Asd0JBQXdCO2lCQUN6QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNKb2JSb3VuZEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2RlYy1qb2Itcm91bmQtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNMYWJlbFN0YXR1c01vZHVsZSB9IGZyb20gJy4vLi4vLi4vZGVjLWxhYmVsLXN0YXR1cy9kZWMtbGFiZWwtc3RhdHVzLm1vZHVsZSc7XG5pbXBvcnQgeyBUaW1lQWdvTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi8uLi9waXBlcy90aW1lLWFnby90aW1lLWFnby5tb2R1bGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBEZWNDb3VudGRvd25Nb2R1bGUgfSBmcm9tICcuLy4uLy4uL2RlYy1jb3VudGRvd24vZGVjLWNvdW50ZG93bi5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBEZWNMYWJlbFN0YXR1c01vZHVsZSxcbiAgICBUaW1lQWdvTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBEZWNDb3VudGRvd25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRGVjSm9iUm91bmRJdGVtQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBEZWNKb2JSb3VuZEl0ZW1Db21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNKb2JSb3VuZEl0ZW1Nb2R1bGUgeyB9XG4iXX0=