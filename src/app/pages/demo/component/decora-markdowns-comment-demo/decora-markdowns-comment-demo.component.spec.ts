import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraMarkdownsCommentDemoComponent } from './decora-markdowns-comment-demo.component';

describe('DecoraMarkdownsCommentDemoComponent', () => {
  let component: DecoraMarkdownsCommentDemoComponent;
  let fixture: ComponentFixture<DecoraMarkdownsCommentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraMarkdownsCommentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraMarkdownsCommentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
