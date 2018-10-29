import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecStatusJobRoundComponent } from './dec-status-job-round.component';

describe('DecJobRoundComponent', () => {
  let component: DecStatusJobRoundComponent;
  let fixture: ComponentFixture<DecStatusJobRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecStatusJobRoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecStatusJobRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
