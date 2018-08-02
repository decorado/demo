import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';
import { DecAutocompleteCompanyModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DecoraAutocompleteCompanyDemoRoutingModule } from './decora-autocomplete-company-demo-routing.module';
import { DecoraAutocompleteCompanyDemoComponent } from './decora-autocomplete-company-demo.component';

@NgModule({
  imports: [
    CommonModule,
    DecoraAutocompleteCompanyDemoRoutingModule,
    DecAutocompleteCompanyModule,
    DemoContainerModule,
    FormsModule,
  ],
  declarations: [DecoraAutocompleteCompanyDemoComponent]
})
export class DecoraAutocompleteCompanyDemoModule { }
