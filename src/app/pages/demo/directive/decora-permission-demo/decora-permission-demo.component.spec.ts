import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraPermissionDemoComponent } from './decora-permission-demo.component';

describe('DecoraPermissionDemoComponent', () => {
  let component: DecoraPermissionDemoComponent;
  let fixture: ComponentFixture<DecoraPermissionDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraPermissionDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraPermissionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
