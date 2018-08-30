import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DecListTableComponent } from './list-table.component';
import { DecListTableColumnComponent } from './../list-table-column/list-table-column.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxDatatableModule,
    TranslateModule
  ],
  declarations: [
    DecListTableComponent,
    DecListTableColumnComponent,
  ],
  exports: [
    DecListTableComponent,
    DecListTableColumnComponent,
  ],
})
export class DecListTableModule { }
