import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecZoomImageViewComponent } from './dec-zoom-image-view.component';

describe('DecZoomImageViewComponent', () => {
  let component: DecZoomImageViewComponent;
  let fixture: ComponentFixture<DecZoomImageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecZoomImageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecZoomImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
