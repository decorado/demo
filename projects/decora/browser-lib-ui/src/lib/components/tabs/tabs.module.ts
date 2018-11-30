import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { DecTabsComponent } from './tabs.component';
import { DecTabModule } from './tab/tab.module';
import { DecTabMenuComponent } from './tab-menu/tab-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    DecTabModule,
    RouterModule,
    MatIconModule
  ],
  declarations: [DecTabsComponent, DecTabMenuComponent],
  exports: [
    DecTabsComponent,
    DecTabMenuComponent,
    DecTabModule
  ],
})
export class DecTabsModule { }
