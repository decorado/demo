import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecAutocompleteRoleModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';
import { DecoraAutocompleteRoleDemoRoutingModule } from './decora-autocomplete-role-demo-routing.module';
import { DecoraAutocompleteRoleDemoComponent } from './decora-autocomplete-role-demo.component';
import { DecAutocompleteProjectModule } from 'projects/decora/browser-lib-ui/src/public_api';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DecoraAutocompleteRoleDemoRoutingModule,
    DecAutocompleteRoleModule,
    DemoContainerModule,
    FormsModule,
    DecAutocompleteProjectModule
  ],
  declarations: [DecoraAutocompleteRoleDemoComponent]
})
export class DecoraAutocompleteRoleDemoModule { }
