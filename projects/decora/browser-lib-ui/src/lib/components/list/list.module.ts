import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';

import { DecListFilterModule } from './list-filter/list-filter.module';
import { DecListTabsFilterModule } from './list-tabs-filter/list-tabs-filter.module';

import { DecListComponent } from './list.component';
import { DecListGridComponent } from './list-grid/list-grid.component';
import { DecListTableModule } from './list-table/list-table.module';
import { DecListFooterComponent } from './list-footer/list-footer.component';
import { DecListAdvancedFilterModule } from './list-advanced-filter/list-advanced-filter.module';
import { DecSpinnerModule } from './../dec-spinner/dec-spinner.module';
import { DecListActionsModule } from './list-actions/list-actions.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    NgxDatatableModule,
    RouterModule,
    TranslateModule,
    DecListAdvancedFilterModule,
    DecListFilterModule,
    DecListTabsFilterModule,
    DecListTableModule,
    DecSpinnerModule,
  ],
  declarations: [
    DecListComponent,
    DecListGridComponent,
    DecListFooterComponent,
  ],
  exports: [
    DecListComponent,
    DecListGridComponent,
    DecListTableModule,
    DecListFooterComponent,
    DecListFilterModule,
    DecListAdvancedFilterModule,
    DecListTabsFilterModule,
    DecListActionsModule,
  ],
})
export class DecListModule { }
