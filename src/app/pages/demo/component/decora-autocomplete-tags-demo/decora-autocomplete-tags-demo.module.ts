import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteTagsDemoComponent } from './decora-autocomplete-tags-demo.component';
import { DecoraAutocompleteTagsDemoRoutingModule } from './decora-autocomplete-tags-demo-routing.module';
import { AutocompleteTagsModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraAutocompleteTagsDemoRoutingModule,
    AutocompleteTagsModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraAutocompleteTagsDemoComponent
  ]
})
export class DecoraAutocompleteTagsDemoModule { }
