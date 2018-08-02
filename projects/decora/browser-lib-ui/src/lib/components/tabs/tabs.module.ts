import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { DecTabsComponent } from './tabs.component';
import { DecTabModule } from './tab/tab.module';
import { DecTabMenuComponent } from './tab-menu/tab-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    DecTabModule
  ],
  declarations: [DecTabsComponent, DecTabMenuComponent],
  exports: [
    DecTabsComponent,
    DecTabMenuComponent,
    DecTabModule
  ],
})
export class DecTabsModule { }
