import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraTabsDemoComponent } from './decora-tabs-demo.component';

describe('DecoraTabsDemoComponent', () => {
  let component: DecoraTabsDemoComponent;
  let fixture: ComponentFixture<DecoraTabsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraTabsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraTabsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
