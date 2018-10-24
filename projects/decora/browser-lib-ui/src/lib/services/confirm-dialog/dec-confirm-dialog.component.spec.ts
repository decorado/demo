import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecConfirmDialogComponent } from './dec-confirm-dialog.component';

describe('DecConfirmDialogComponent', () => {
  let component: DecConfirmDialogComponent;
  let fixture: ComponentFixture<DecConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
