import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteStudioDemoRoutingModule } from './decora-autocomplete-studio-demo-routing.module';
import { DecoraAutocompleteStudioDemoComponent } from './decora-autocomplete-studio-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { AutocompleteStudioModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraAutocompleteStudioDemoRoutingModule,
    DemoContainerModule,
    AutocompleteStudioModule
  ],
  declarations: [
    DecoraAutocompleteStudioDemoComponent
  ],
  exports: [
    DecoraAutocompleteStudioDemoComponent
  ]
})
export class DecoraAutocompleteStudioDemoModule { }
