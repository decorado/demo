import { DecRenderCommentModule } from './dec-render-comment.module';

describe('DecRenderCommentModule', () => {
  let decRenderCommentModule: DecRenderCommentModule;

  beforeEach(() => {
    decRenderCommentModule = new DecRenderCommentModule();
  });

  it('should create an instance', () => {
    expect(decRenderCommentModule).toBeTruthy();
  });
});
