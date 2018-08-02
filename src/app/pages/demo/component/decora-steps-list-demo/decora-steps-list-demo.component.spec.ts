import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraStepsListDemoComponent } from './decora-steps-list-demo.component';

describe('DecoraStepsListDemoComponent', () => {
  let component: DecoraStepsListDemoComponent;
  let fixture: ComponentFixture<DecoraStepsListDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraStepsListDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraStepsListDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
