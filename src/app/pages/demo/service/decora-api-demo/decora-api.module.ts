import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecApiComponent } from './decora-api.component';
import { DecApiRoutingModule } from './decora-api-routing.module';
import { MatInputModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DecApiRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    DemoContainerModule,
    FlexLayoutModule,
  ],
  declarations: [DecApiComponent]
})
export class DecApiDemoModule { }
