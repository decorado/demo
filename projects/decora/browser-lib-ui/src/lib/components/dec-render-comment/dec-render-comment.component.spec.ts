import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecRenderCommentComponent } from './dec-render-comment.component';

describe('DecRenderCommentComponent', () => {
  let component: DecRenderCommentComponent;
  let fixture: ComponentFixture<DecRenderCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecRenderCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecRenderCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
