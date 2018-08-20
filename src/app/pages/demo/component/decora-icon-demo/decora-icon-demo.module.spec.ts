import { DecoraIconDemoModule } from './decora-icon-demo.module';

describe('DecoraIconDemoModule', () => {
  let decoraIconDemoModule: DecoraIconDemoModule;

  beforeEach(() => {
    decoraIconDemoModule = new DecoraIconDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraIconDemoModule).toBeTruthy();
  });
});
