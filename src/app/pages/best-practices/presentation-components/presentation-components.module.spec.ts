import { PresentationComponentsModule } from './presentation-components.module';

describe('PresentationComponentsModule', () => {
  let presentationComponentsModule: PresentationComponentsModule;

  beforeEach(() => {
    presentationComponentsModule = new PresentationComponentsModule();
  });

  it('should create an instance', () => {
    expect(presentationComponentsModule).toBeTruthy();
  });
});
