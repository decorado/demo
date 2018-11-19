import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraProductBriefingDemoComponent } from './decora-product-briefing-demo.component';

describe('DecoraProductBriefingDemoComponent', () => {
  let component: DecoraProductBriefingDemoComponent;
  let fixture: ComponentFixture<DecoraProductBriefingDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraProductBriefingDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraProductBriefingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
