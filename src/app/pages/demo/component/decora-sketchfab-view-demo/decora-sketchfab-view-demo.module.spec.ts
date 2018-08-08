import { DecoraSketchfabViewDemoModule } from './decora-sketchfab-view-demo.module';

describe('DecoraSketchfabViewDemoModule', () => {
  let decoraSketchfabViewDemoModule: DecoraSketchfabViewDemoModule;

  beforeEach(() => {
    decoraSketchfabViewDemoModule = new DecoraSketchfabViewDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraSketchfabViewDemoModule).toBeTruthy();
  });
});
