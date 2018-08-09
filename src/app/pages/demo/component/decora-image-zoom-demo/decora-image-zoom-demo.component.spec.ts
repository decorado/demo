import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraImageZoomDemoComponent } from './decora-image-zoom-demo.component';

describe('DecoraImageZoomDemoComponent', () => {
  let component: DecoraImageZoomDemoComponent;
  let fixture: ComponentFixture<DecoraImageZoomDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraImageZoomDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraImageZoomDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
