import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSpinnerComponent } from './dec-spinner.component';

describe('DecSpinnerComponent', () => {
  let component: DecSpinnerComponent;
  let fixture: ComponentFixture<DecSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
