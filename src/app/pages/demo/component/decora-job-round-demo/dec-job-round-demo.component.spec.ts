import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecJobRoundDemoComponent } from './dec-job-round-demo.component';

describe('DecJobRoundDemoComponent', () => {
  let component: DecJobRoundDemoComponent;
  let fixture: ComponentFixture<DecJobRoundDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecJobRoundDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecJobRoundDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
