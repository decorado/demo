import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecJobRoundItemComponent } from './dec-job-round-item.component';

describe('DecJobRoundItemComponent', () => {
  let component: DecJobRoundItemComponent;
  let fixture: ComponentFixture<DecJobRoundItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecJobRoundItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecJobRoundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
