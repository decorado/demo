import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { DecTabComponent } from './tab.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule
  ],
  declarations: [DecTabComponent],
  exports: [DecTabComponent],
})
export class DecTabModule { }
