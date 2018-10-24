import { DecoraRenderCommentModule } from './decora-render-comment.module';

describe('DecoraRenderCommentModule', () => {
  let decoraRenderCommentModule: DecoraRenderCommentModule;

  beforeEach(() => {
    decoraRenderCommentModule = new DecoraRenderCommentModule();
  });

  it('should create an instance', () => {
    expect(decoraRenderCommentModule).toBeTruthy();
  });
});
