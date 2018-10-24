import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraZoomMarksDemoComponent } from './decora-zoom-marks-demo.component';

describe('DecoraZoomMarksDemoComponent', () => {
  let component: DecoraZoomMarksDemoComponent;
  let fixture: ComponentFixture<DecoraZoomMarksDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraZoomMarksDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraZoomMarksDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
