import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecZoomMarksComponent } from './dec-zoom-marks.component';

describe('DecZoomMarksComponent', () => {
  let component: DecZoomMarksComponent;
  let fixture: ComponentFixture<DecZoomMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecZoomMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecZoomMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
