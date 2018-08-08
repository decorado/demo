import { DecSketchfabViewModule } from './dec-sketchfab-view.module';

describe('DecSketchfabViewModule', () => {
  let decSketchfabViewModule: DecSketchfabViewModule;

  beforeEach(() => {
    decSketchfabViewModule = new DecSketchfabViewModule();
  });

  it('should create an instance', () => {
    expect(decSketchfabViewModule).toBeTruthy();
  });
});
