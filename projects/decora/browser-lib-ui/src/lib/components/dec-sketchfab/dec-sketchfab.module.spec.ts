import { DecSketchfabModule } from './dec-sketchfab.module';

describe('DecSketchfabModule', () => {
  let decSketchfabModule: DecSketchfabModule;

  beforeEach(() => {
    decSketchfabModule = new DecSketchfabModule();
  });

  it('should create an instance', () => {
    expect(decSketchfabModule).toBeTruthy();
  });
});
