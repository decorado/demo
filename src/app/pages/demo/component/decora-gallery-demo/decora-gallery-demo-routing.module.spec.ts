import { DecoraGalleryDemoRoutingModule } from './decora-gallery-demo-routing.module';

describe('DecoraGalleryDemoRoutingModule', () => {
  let decoraGalleryDemoRoutingModule: DecoraGalleryDemoRoutingModule;

  beforeEach(() => {
    decoraGalleryDemoRoutingModule = new DecoraGalleryDemoRoutingModule();
  });

  it('should create an instance', () => {
    expect(decoraGalleryDemoRoutingModule).toBeTruthy();
  });
});
