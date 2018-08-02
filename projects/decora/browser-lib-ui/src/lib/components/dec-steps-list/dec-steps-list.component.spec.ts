import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecStepsListComponent } from './dec-steps-list.component';

describe('DecStepsListComponent', () => {
  let component: DecStepsListComponent;
  let fixture: ComponentFixture<DecStepsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecStepsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecStepsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
