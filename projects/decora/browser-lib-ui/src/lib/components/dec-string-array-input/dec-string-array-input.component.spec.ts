import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecStringArrayInputComponent } from './dec-string-array-input.component';

describe('DecStringArrayInputComponent', () => {
  let component: DecStringArrayInputComponent;
  let fixture: ComponentFixture<DecStringArrayInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecStringArrayInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecStringArrayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
