import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecCommentDialogComponent } from './dec-comment-dialog.component';

describe('DecCommentDialogComponent', () => {
  let component: DecCommentDialogComponent;
  let fixture: ComponentFixture<DecCommentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecCommentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
