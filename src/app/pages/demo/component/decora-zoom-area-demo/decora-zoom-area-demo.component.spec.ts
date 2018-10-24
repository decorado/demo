import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraZoomAreaDemoComponent } from './decora-zoom-area-demo.component';

describe('DecoraZoomAreaDemoComponent', () => {
  let component: DecoraZoomAreaDemoComponent;
  let fixture: ComponentFixture<DecoraZoomAreaDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraZoomAreaDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraZoomAreaDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
