import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraSnackBarDemoRoutingModule } from './decora-snack-bar-demo-routing.module';
import { DecoraSnackBarDemoComponent } from './decora-snack-bar-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatButtonModule } from '@angular/material';
import { DecSnackBarModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DecoraSnackBarDemoRoutingModule,
    DemoContainerModule,
    MatButtonModule,
    DecSnackBarModule,
    FlexLayoutModule
  ],
  declarations: [
    DecoraSnackBarDemoComponent
  ],
  exports: [
    DecoraSnackBarDemoComponent
  ]
})
export class DecoraSnackBarDemoModule { }
