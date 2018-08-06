import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecListFilterComponent } from './list-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecListActiveFilterResumeModule } from './../list-active-filter-resume/list-active-filter-resume.module';
import { DecPermissionModule } from './../../../directives/permission/dec-permission.module';
import { DecListTabsFilterComponent } from './list-tabs-filter/list-tabs-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    DecListActiveFilterResumeModule,
    DecPermissionModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
  ],
  declarations: [DecListFilterComponent, DecListTabsFilterComponent],
  exports: [DecListFilterComponent],
})
export class DecListFilterModule { }
