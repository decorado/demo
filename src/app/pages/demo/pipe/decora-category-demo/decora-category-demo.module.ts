import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraCategoryDemoRoutingModule } from './decora-category-demo-routing.module';
import { DecoraCategoryDemoComponent } from '@app/pages/demo/pipe/decora-category-demo/decora-category-demo.component';
import { CategoryPipeModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraCategoryDemoRoutingModule,
    CategoryPipeModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraCategoryDemoComponent
  ],
  exports: [
    DecoraCategoryDemoComponent
  ]
})
export class DecoraCategoryDemoModule { }
