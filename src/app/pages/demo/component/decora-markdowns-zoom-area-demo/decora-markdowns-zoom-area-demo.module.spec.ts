import { DecoraMarkdownsZoomAreaDemoModule } from './decora-markdowns-zoom-area-demo.module';

describe('DecoraMarkdownsZoomAreaDemoModule', () => {
  let decoraMarkdownsZoomAreaDemoModule: DecoraMarkdownsZoomAreaDemoModule;

  beforeEach(() => {
    decoraMarkdownsZoomAreaDemoModule = new DecoraMarkdownsZoomAreaDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraMarkdownsZoomAreaDemoModule).toBeTruthy();
  });
});
