import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecStatusJobRoundItemComponent } from './dec-status-job-round-item.component';

describe('DecStatusJobRoundItemComponent', () => {
  let component: DecStatusJobRoundItemComponent;
  let fixture: ComponentFixture<DecStatusJobRoundItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecStatusJobRoundItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecStatusJobRoundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
