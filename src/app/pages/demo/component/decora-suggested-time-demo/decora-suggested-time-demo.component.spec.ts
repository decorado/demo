import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraSuggestedTimeDemoComponent } from './decora-suggested-time-demo.component';

describe('DecoraSuggestedTimeDemoComponent', () => {
  let component: DecoraSuggestedTimeDemoComponent;
  let fixture: ComponentFixture<DecoraSuggestedTimeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraSuggestedTimeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraSuggestedTimeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
