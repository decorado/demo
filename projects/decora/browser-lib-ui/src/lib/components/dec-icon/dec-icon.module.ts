import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecIconComponent } from './dec-icon.component';
import { MatIconModule, MatIconRegistry } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [DecIconComponent],
  exports: [DecIconComponent]
})
export class DecIconModule {
  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.registerFontClassAlias('fas', 'fa');
  }
}
