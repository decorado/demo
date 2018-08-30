import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteSquadsDemoRoutingModule } from './decora-autocomplete-squads-demo-routing.module';
import { DecoraAutocompleteSquadsDemoComponent } from './decora-autocomplete-squads-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { AutocompleteSquadsModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraAutocompleteSquadsDemoRoutingModule,
    DemoContainerModule,
    AutocompleteSquadsModule
  ],
  declarations: [
    DecoraAutocompleteSquadsDemoComponent
  ],
  exports: [
    DecoraAutocompleteSquadsDemoComponent
  ]
})
export class DecoraAutocompleteSquadsDemoModule { }
