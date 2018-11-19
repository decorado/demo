import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraJobDetailsDemoComponent } from './decora-job-details-demo.component';

describe('DecoraJobDetailsDemoComponent', () => {
  let component: DecoraJobDetailsDemoComponent;
  let fixture: ComponentFixture<DecoraJobDetailsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraJobDetailsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraJobDetailsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
