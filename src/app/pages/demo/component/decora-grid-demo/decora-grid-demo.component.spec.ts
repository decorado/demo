import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraGridDemoComponent } from './decora-grid-demo.component';

describe('DecoraGridDemoComponent', () => {
  let component: DecoraGridDemoComponent;
  let fixture: ComponentFixture<DecoraGridDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraGridDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
