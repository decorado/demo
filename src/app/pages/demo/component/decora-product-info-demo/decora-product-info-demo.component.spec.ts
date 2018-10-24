import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraProductInfoDemoComponent } from './decora-product-info-demo.component';

describe('DecoraProductInfoDemoComponent', () => {
  let component: DecoraProductInfoDemoComponent;
  let fixture: ComponentFixture<DecoraProductInfoDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraProductInfoDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraProductInfoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
