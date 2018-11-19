import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecJobDetailsComponent } from './dec-job-details.component';

describe('DecJobDetailsComponent', () => {
  let component: DecJobDetailsComponent;
  let fixture: ComponentFixture<DecJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
