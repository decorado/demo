import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecMarkdownsCommentComponent } from './dec-markdowns-comment.component';

describe('DecMarkdownsCommentComponent', () => {
  let component: DecMarkdownsCommentComponent;
  let fixture: ComponentFixture<DecMarkdownsCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecMarkdownsCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecMarkdownsCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
