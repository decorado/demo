import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListActionsComponent } from './list-actions.component';

describe('DecListActionsComponent', () => {
  let component: DecListActionsComponent;
  let fixture: ComponentFixture<DecListActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
