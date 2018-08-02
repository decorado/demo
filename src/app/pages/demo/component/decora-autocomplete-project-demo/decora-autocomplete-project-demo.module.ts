import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteProjectDemoComponent } from './decora-autocomplete-project-demo.component';
import { DecoraAutocompleteProjectDemoRoutingModule } from './decora-autocomplete-project-demo-routing.module';
import { FormsModule } from '@angular/forms';
import { DecAutocompleteProjectModule, DecAutocompleteCompanyModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecoraAutocompleteProjectDemoRoutingModule,
    DecAutocompleteProjectModule,
    DecAutocompleteCompanyModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraAutocompleteProjectDemoComponent
  ],
  exports: [
    DecoraAutocompleteProjectDemoComponent
  ]
})
export class DecoraAutocompleteProjectDemoModule { }
