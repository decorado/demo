import { DecoraPermissionDemoModule } from './decora-permission-demo.module';

describe('DecoraPermissionDemoModule', () => {
  let decoraPermissionDemoModule: DecoraPermissionDemoModule;

  beforeEach(() => {
    decoraPermissionDemoModule = new DecoraPermissionDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraPermissionDemoModule).toBeTruthy();
  });
});
