import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraPermissionGuardDemoComponent } from './decora-permission-guard-demo.component';

describe('DecoraPermissionGuardDemoComponent', () => {
  let component: DecoraPermissionGuardDemoComponent;
  let fixture: ComponentFixture<DecoraPermissionGuardDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraPermissionGuardDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraPermissionGuardDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
