import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecZoomAreaComponent } from './dec-zoom-area.component';

describe('DecZoomAreaComponent', () => {
  let component: DecZoomAreaComponent;
  let fixture: ComponentFixture<DecZoomAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecZoomAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecZoomAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
