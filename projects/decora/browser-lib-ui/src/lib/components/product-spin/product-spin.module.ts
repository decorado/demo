import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecProductSpinComponent } from './product-spin.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
  ],
  declarations: [
    DecProductSpinComponent
  ],
  exports: [
    DecProductSpinComponent
  ],
})

export class DecProductSpinModule { }
