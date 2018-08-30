import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSketchfabComponent } from './dec-sketchfab.component';

describe('DecSketchfabComponent', () => {
  let component: DecSketchfabComponent;
  let fixture: ComponentFixture<DecSketchfabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSketchfabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSketchfabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
