import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraInputTimeDemoComponent } from './decora-input-time-demo.component';

describe('DecoraInputTimeDemoComponent', () => {
  let component: DecoraInputTimeDemoComponent;
  let fixture: ComponentFixture<DecoraInputTimeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraInputTimeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraInputTimeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
