import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraScrollDemoComponent } from './decora-scroll-demo.component';

describe('DecoraScrollDemoComponent', () => {
  let component: DecoraScrollDemoComponent;
  let fixture: ComponentFixture<DecoraScrollDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraScrollDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraScrollDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
