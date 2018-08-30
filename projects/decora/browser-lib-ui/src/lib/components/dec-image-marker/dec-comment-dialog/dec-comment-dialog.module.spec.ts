import { DecCommentDialogModule } from './dec-comment-dialog.module';

describe('DecCommentDialogModule', () => {
  let decCommentDialogModule: DecCommentDialogModule;

  beforeEach(() => {
    decCommentDialogModule = new DecCommentDialogModule();
  });

  it('should create an instance', () => {
    expect(decCommentDialogModule).toBeTruthy();
  });
});
