import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecCountdownComponent } from './dec-countdown.component';

describe('DecCountdownComponent', () => {
  let component: DecCountdownComponent;
  let fixture: ComponentFixture<DecCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
