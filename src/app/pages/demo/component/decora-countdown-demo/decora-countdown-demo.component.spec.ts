import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraCountdownDemoComponent } from './decora-countdown-demo.component';

describe('DecoraCountdownDemoComponent', () => {
  let component: DecoraCountdownDemoComponent;
  let fixture: ComponentFixture<DecoraCountdownDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraCountdownDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraCountdownDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
