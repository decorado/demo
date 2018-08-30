import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecImageMarkerComponent } from './dec-image-marker.component';

describe('DecImageMarkerComponent', () => {
  let component: DecImageMarkerComponent;
  let fixture: ComponentFixture<DecImageMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecImageMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecImageMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
