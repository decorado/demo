import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { DecListTabsFilterComponent } from './list-tabs-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { DecPermissionModule } from './../../../directives/permission/dec-permission.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
    DecPermissionModule
  ],
  declarations: [DecListTabsFilterComponent],
  exports: [DecListTabsFilterComponent],
})
export class DecListTabsFilterModule { }
