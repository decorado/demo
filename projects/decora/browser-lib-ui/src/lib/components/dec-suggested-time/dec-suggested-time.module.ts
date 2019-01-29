import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSuggestedTimeComponent } from './dec-suggested-time.component';
import { MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    DecSuggestedTimeComponent
  ],
  exports: [
    DecSuggestedTimeComponent
  ]
})
export class DecSuggestedTimeModule { }
