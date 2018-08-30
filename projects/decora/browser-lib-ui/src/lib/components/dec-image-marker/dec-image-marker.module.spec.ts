import { DecImageMarkerModule } from './dec-image-marker.module';

describe('DecImageMarkerModule', () => {
  let decImageMarkerModule: DecImageMarkerModule;

  beforeEach(() => {
    decImageMarkerModule = new DecImageMarkerModule();
  });

  it('should create an instance', () => {
    expect(decImageMarkerModule).toBeTruthy();
  });
});
