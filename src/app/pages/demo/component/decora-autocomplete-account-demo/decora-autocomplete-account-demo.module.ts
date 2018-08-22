import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecAutocompleteAccountModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';
import { DecoraAutocompleteAccountDemoRoutingModule } from './decora-autocomplete-account-demo-routing.module';
import { DecoraAutocompleteAccountDemoComponent } from './decora-autocomplete-account-demo.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DecoraAutocompleteAccountDemoRoutingModule,
    DecAutocompleteAccountModule,
    DemoContainerModule,
    FormsModule,
  ],
  declarations: [DecoraAutocompleteAccountDemoComponent]
})
export class DecoraAutocompleteAccountDemoModule { }
