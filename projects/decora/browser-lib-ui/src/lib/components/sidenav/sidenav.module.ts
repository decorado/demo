import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSidenavComponent } from './sidenav.component';
import { MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatProgressBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { DecSidenavContentComponent } from './dec-sidenav-content/dec-sidenav-content.component';
import { DecSidenavMenuItemComponent } from './dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuLeftComponent } from './dec-sidenav-menu-left/dec-sidenav-menu-left.component';
import { DecSidenavMenuRightComponent } from './dec-sidenav-menu-right/dec-sidenav-menu-right.component';
import { DecSidenavMenuComponent } from './dec-sidenav-menu/dec-sidenav-menu.component';
import { DecSidenavMenuTitleComponent } from './dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { DecSidenavToolbarComponent } from './dec-sidenav-toolbar/dec-sidenav-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DecSidenavToolbarTitleComponent } from './dec-sidenav-toolbar-title/dec-sidenav-toolbar-title.component';
import { DecSidenavService } from './sidenav.service';
import { TranslateModule } from '@ngx-translate/core';
import { DecIconModule } from './../dec-icon/dec-icon.module';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    DecIconModule
  ],
  declarations: [
    DecSidenavComponent,
    DecSidenavContentComponent,
    DecSidenavMenuItemComponent,
    DecSidenavMenuLeftComponent,
    DecSidenavMenuRightComponent,
    DecSidenavMenuComponent,
    DecSidenavMenuTitleComponent,
    DecSidenavToolbarComponent,
    DecSidenavToolbarTitleComponent,
  ],
  exports: [
    DecSidenavComponent,
    DecSidenavContentComponent,
    DecSidenavMenuItemComponent,
    DecSidenavMenuLeftComponent,
    DecSidenavMenuRightComponent,
    DecSidenavMenuTitleComponent,
    DecSidenavToolbarComponent,
    DecSidenavToolbarTitleComponent,
  ],
  providers: [
    DecSidenavService,
  ]
})
export class DecSidenavModule { }
