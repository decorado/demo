import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecLabelStatusComponent } from './dec-label-status.component';

describe('DecLabelStatusComponent', () => {
  let component: DecLabelStatusComponent;
  let fixture: ComponentFixture<DecLabelStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecLabelStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecLabelStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
