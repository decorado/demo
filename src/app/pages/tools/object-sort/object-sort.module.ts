import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectSortRoutingModule } from './object-sort-routing.module';
import { ObjectSortComponent } from './object-sort.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { DecSnackBarModule } from 'projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecSnackBarModule,
    ObjectSortRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    PrettyJsonModule
  ],
  declarations: [ObjectSortComponent]
})
export class ObjectSortModule { }
