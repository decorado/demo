/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecRenderCommentComponent } from './dec-render-comment.component';
import { MatDialogModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
var DecRenderCommentModule = /** @class */ (function () {
    function DecRenderCommentModule() {
    }
    DecRenderCommentModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FlexLayoutModule,
                        MatDialogModule,
                        MatButtonModule,
                        MatInputModule,
                        FormsModule,
                        MatIconModule,
                        TranslateModule,
                    ],
                    declarations: [DecRenderCommentComponent],
                    entryComponents: [DecRenderCommentComponent],
                    providers: [DecRenderCommentService]
                },] },
    ];
    return DecRenderCommentModule;
}());
export { DecRenderCommentModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXJlbmRlci1jb21tZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtcmVuZGVyLWNvbW1lbnQvZGVjLXJlbmRlci1jb21tZW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7Ozs7O2dCQUU1RixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxXQUFXO3dCQUNYLGFBQWE7d0JBQ2IsZUFBZTtxQkFDaEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3pDLGVBQWUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUM1QyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDckM7O2lDQXZCRDs7U0F3QmEsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEZWNSZW5kZXJDb21tZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtcmVuZGVyLWNvbW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudFNlcnZpY2UgfSBmcm9tICcuLy4uL2RlYy1yZW5kZXItY29tbWVudC9kZWMtcmVuZGVyLWNvbW1lbnQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWNSZW5kZXJDb21tZW50Q29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0RlY1JlbmRlckNvbW1lbnRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNSZW5kZXJDb21tZW50TW9kdWxlIHsgfVxuIl19