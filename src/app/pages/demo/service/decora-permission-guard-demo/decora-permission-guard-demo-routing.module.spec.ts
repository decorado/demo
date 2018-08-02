import { DecoraPermissionGuardDemoRoutingModule } from './decora-permission-guard-demo-routing.module';

describe('DecoraPermissionGuardDemoRoutingModule', () => {
  let decoraPermissionGuardDemoRoutingModule: DecoraPermissionGuardDemoRoutingModule;

  beforeEach(() => {
    decoraPermissionGuardDemoRoutingModule = new DecoraPermissionGuardDemoRoutingModule();
  });

  it('should create an instance', () => {
    expect(decoraPermissionGuardDemoRoutingModule).toBeTruthy();
  });
});
