import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecoraI18nInputDemoRoutingModule } from './decora-i18n-input-demo-routing.module';
import { DecoraI18nInputDemoComponent } from './decora-i18n-input-demo.component';
import { DecI18nInputModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-i18n-input/dec-i18n-input.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecIconModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  declarations: [DecoraI18nInputDemoComponent],
  imports: [
    CommonModule,
    DecoraI18nInputDemoRoutingModule,
    DecI18nInputModule,
    DecIconModule,
    FormsModule,
    DemoContainerModule,
  ]
})
export class DecoraI18nInputDemoModule { }
