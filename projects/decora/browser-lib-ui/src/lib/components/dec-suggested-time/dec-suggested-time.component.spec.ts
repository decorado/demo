import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSuggestedTimeComponent } from './dec-suggested-time.component';

describe('DecSuggestedTimeComponent', () => {
  let component: DecSuggestedTimeComponent;
  let fixture: ComponentFixture<DecSuggestedTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSuggestedTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSuggestedTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
