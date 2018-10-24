import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecZoomMarksGalleryComponent } from './dec-zoom-marks-gallery.component';

describe('DecZoomMarksGalleryComponent', () => {
  let component: DecZoomMarksGalleryComponent;
  let fixture: ComponentFixture<DecZoomMarksGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecZoomMarksGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecZoomMarksGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
