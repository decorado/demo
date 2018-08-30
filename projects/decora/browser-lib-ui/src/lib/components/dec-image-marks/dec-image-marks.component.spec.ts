import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecImageMarksComponent } from './dec-image-marks.component';

describe('DecImageMarksComponent', () => {
  let component: DecImageMarksComponent;
  let fixture: ComponentFixture<DecImageMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecImageMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecImageMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
