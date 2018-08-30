import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSketchfabDemoComponent } from './dec-sketchfab-demo.component';

describe('DecSketchfabDemoComponent', () => {
  let component: DecSketchfabDemoComponent;
  let fixture: ComponentFixture<DecSketchfabDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSketchfabDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSketchfabDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
