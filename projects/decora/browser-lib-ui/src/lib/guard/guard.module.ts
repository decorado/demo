import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecAuthGuard } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DecAuthGuard
  ]
})
export class DecGuardModule { }
