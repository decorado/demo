import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecListFilterComponent } from './list-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecListActiveFilterResumeModule } from './../list-active-filter-resume/list-active-filter-resume.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    DecListActiveFilterResumeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
  ],
  declarations: [DecListFilterComponent],
  exports: [DecListFilterComponent],
})
export class DecListFilterModule { }
