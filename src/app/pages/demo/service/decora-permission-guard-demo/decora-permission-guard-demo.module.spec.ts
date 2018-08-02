import { DecoraPermissionGuardDemoModule } from './decora-permission-guard-demo.module';

describe('DecoraPermissionGuardDemoModule', () => {
  let decoraPermissionGuardDemoModule: DecoraPermissionGuardDemoModule;

  beforeEach(() => {
    decoraPermissionGuardDemoModule = new DecoraPermissionGuardDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraPermissionGuardDemoModule).toBeTruthy();
  });
});
