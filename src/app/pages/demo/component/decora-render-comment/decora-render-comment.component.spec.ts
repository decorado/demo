import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraRenderCommentComponent } from './decora-render-comment.component';

describe('DecoraRenderCommentComponent', () => {
  let component: DecoraRenderCommentComponent;
  let fixture: ComponentFixture<DecoraRenderCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraRenderCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraRenderCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
