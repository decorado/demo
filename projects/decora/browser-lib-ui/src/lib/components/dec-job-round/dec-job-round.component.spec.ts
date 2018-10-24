import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecJobRoundComponent } from './dec-job-round.component';

describe('DecJobRoundComponent', () => {
  let component: DecJobRoundComponent;
  let fixture: ComponentFixture<DecJobRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecJobRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecJobRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
