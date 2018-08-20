import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecImageZoomComponent } from './dec-image-zoom.component';

describe('DecImageZoomComponent', () => {
  let component: DecImageZoomComponent;
  let fixture: ComponentFixture<DecImageZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecImageZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecImageZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
