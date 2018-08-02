import { MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecoraMockServerDemoRoutingModule } from './decora-mock-server-demo-routing.module';
import { DecoraMockServerDemoComponent } from './decora-mock-server-demo.component';
import { DecoraMockServerDemoService } from './decora-mock-server-demo.service';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DecoraMockServerDemoRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DemoContainerModule
  ],
  declarations: [DecoraMockServerDemoComponent],
  providers: [DecoraMockServerDemoService]
})
export class DecoraMockServerDemoModule { }
