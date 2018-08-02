import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecGalleryComponent } from './dec-gallery.component';

describe('DecGalleryComponent', () => {
  let component: DecGalleryComponent;
  let fixture: ComponentFixture<DecGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
