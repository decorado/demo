import { DecZoomAreaModule } from './dec-zoom-area.module';

describe('DecZoomAreaModule', () => {
  let decZoomAreaModule: DecZoomAreaModule;

  beforeEach(() => {
    decZoomAreaModule = new DecZoomAreaModule();
  });

  it('should create an instance', () => {
    expect(decZoomAreaModule).toBeTruthy();
  });
});
