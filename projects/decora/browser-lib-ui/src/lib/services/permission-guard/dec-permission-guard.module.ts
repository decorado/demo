import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecPermissionGuard } from './dec-permission-guard.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DecPermissionGuard
  ]
})
export class DecPermissionGuardModule { }
