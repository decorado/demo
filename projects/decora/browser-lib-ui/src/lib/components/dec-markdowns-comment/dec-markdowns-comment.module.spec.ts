import { DecMarkdownsCommentModule } from './dec-markdowns-comment.module';

describe('DecMarkdownsCommentModule', () => {
  let decMarkdownsCommentModule: DecMarkdownsCommentModule;

  beforeEach(() => {
    decMarkdownsCommentModule = new DecMarkdownsCommentModule();
  });

  it('should create an instance', () => {
    expect(decMarkdownsCommentModule).toBeTruthy();
  });
});
