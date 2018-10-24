import { DecMarkdownsZoomAreaModule } from './dec-markdowns-zoom-area.module';

describe('DecMarkdownsZoomAreaModule', () => {
  let decMarkdownsZoomAreaModule: DecMarkdownsZoomAreaModule;

  beforeEach(() => {
    decMarkdownsZoomAreaModule = new DecMarkdownsZoomAreaModule();
  });

  it('should create an instance', () => {
    expect(decMarkdownsZoomAreaModule).toBeTruthy();
  });
});
