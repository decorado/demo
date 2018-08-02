import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecWsClientService } from './ws-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DecWsClientService
  ]
})
export class DecWsClientModule { }
