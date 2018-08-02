import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecListActiveFilterResumeComponent } from './list-active-filter-resume.component';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [DecListActiveFilterResumeComponent],
  exports: [DecListActiveFilterResumeComponent],
})
export class DecListActiveFilterResumeModule { }
