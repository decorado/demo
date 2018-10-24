import { DecoraMarkdownsCommentDemoModule } from './decora-markdowns-comment-demo.module';

describe('DecoraMarkdownsCommentDemoModule', () => {
  let decoraMarkdownsCommentDemoModule: DecoraMarkdownsCommentDemoModule;

  beforeEach(() => {
    decoraMarkdownsCommentDemoModule = new DecoraMarkdownsCommentDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraMarkdownsCommentDemoModule).toBeTruthy();
  });
});
