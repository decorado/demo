import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraIconDemoComponent } from './decora-icon-demo.component';

describe('DecoraIconDemoComponent', () => {
  let component: DecoraIconDemoComponent;
  let fixture: ComponentFixture<DecoraIconDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraIconDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraIconDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
