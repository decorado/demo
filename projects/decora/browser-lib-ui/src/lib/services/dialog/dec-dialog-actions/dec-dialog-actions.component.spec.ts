import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecDialogActionsComponent } from './dec-dialog-actions.component';

describe('DecDialogActionsComponent', () => {
  let component: DecDialogActionsComponent;
  let fixture: ComponentFixture<DecDialogActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecDialogActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecDialogActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
