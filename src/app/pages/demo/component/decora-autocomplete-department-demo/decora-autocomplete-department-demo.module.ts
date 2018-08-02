import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';
import { DecoraAutocompleteDepartmentDemoRoutingModule } from './decora-autocomplete-department-demo-routing.module';
import { DecoraAutocompleteDepartmentDemoComponent } from './decora-autocomplete-department-demo.component';
import { DecAutocompleteDepartmentModule, DecAutocompleteCompanyModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    DecAutocompleteDepartmentModule,
    DecAutocompleteCompanyModule,
    CommonModule,
    DecoraAutocompleteDepartmentDemoRoutingModule,
    DemoContainerModule,
    FormsModule,
  ],
  declarations: [DecoraAutocompleteDepartmentDemoComponent]
})
export class DecoraAutocompleteDepartmentDemoModule { }
