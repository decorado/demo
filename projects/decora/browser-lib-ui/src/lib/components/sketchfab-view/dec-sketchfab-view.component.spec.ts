import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSketchfabViewComponent } from './dec-sketchfab-view.component';

describe('DecSketchfabViewComponent', () => {
  let component: DecSketchfabViewComponent;
  let fixture: ComponentFixture<DecSketchfabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSketchfabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSketchfabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
