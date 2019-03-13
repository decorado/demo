import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraContrastFontWithBgDemoRoutingModule } from './decora-contrast-font-with-bg-demo-routing.module';
import { DecoraContrastFontWithBgDemoComponent } from './decora-contrast-font-with-bg-demo.component';
import { DecContrastFontWithBgModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  declarations: [DecoraContrastFontWithBgDemoComponent],
  imports: [
    CommonModule,
    DecoraContrastFontWithBgDemoRoutingModule,
    DemoContainerModule,
    DecContrastFontWithBgModule,
  ]
})
export class DecoraContrastFontWithBgDemoModule { }
