import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecInputTimeComponent } from './dec-input-time.component';

describe('DecInputTimeComponent', () => {
  let component: DecInputTimeComponent;
  let fixture: ComponentFixture<DecInputTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecInputTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecInputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
