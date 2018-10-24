import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecMarksComponent } from './dec-marks.component';

describe('DecMarksComponent', () => {
  let component: DecMarksComponent;
  let fixture: ComponentFixture<DecMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
