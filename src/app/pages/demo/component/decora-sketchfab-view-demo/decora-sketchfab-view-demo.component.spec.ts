import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraSketchfabViewDemoComponent } from './decora-sketchfab-view-demo.component';

describe('DecoraSketchfabViewDemoComponent', () => {
  let component: DecoraSketchfabViewDemoComponent;
  let fixture: ComponentFixture<DecoraSketchfabViewDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraSketchfabViewDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraSketchfabViewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
