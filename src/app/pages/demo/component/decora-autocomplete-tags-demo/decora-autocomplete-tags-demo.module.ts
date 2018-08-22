import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteTagsDemoComponent } from './decora-autocomplete-tags-demo.component';
import { DecoraAutocompleteTagsDemoRoutingModule } from './decora-autocomplete-tags-demo-routing.module';
import { DecAutocompleteTagsModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DecoraAutocompleteTagsDemoRoutingModule,
    DecAutocompleteTagsModule,
    DemoContainerModule,
    FormsModule,
  ],
  declarations: [
    DecoraAutocompleteTagsDemoComponent
  ]
})
export class DecoraAutocompleteTagsDemoModule { }
