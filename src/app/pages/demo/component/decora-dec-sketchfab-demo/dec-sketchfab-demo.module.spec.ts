import { DecSketchfabDemoModule } from './dec-sketchfab-demo.module';

describe('DecSketchfabDemoModule', () => {
  let decSketchfabDemoModule: DecSketchfabDemoModule;

  beforeEach(() => {
    decSketchfabDemoModule = new DecSketchfabDemoModule();
  });

  it('should create an instance', () => {
    expect(decSketchfabDemoModule).toBeTruthy();
  });
});
