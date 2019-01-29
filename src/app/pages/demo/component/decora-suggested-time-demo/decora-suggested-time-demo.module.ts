import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraSuggestedTimeDemoRoutingModule } from './decora-suggested-time-demo-routing.module';
import { DecoraSuggestedTimeDemoComponent } from './decora-suggested-time-demo.component';
import { DecSuggestedTimeModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DecoraSuggestedTimeDemoRoutingModule,
    DecSuggestedTimeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DecoraSuggestedTimeDemoComponent],
  exports: [DecoraSuggestedTimeDemoComponent]
})
export class DecoraSuggestedTimeDemoModule { }
