import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecGalleryMarksComponent } from './dec-gallery-marks.component';

describe('DecGalleryMarksComponent', () => {
  let component: DecGalleryMarksComponent;
  let fixture: ComponentFixture<DecGalleryMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecGalleryMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecGalleryMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
