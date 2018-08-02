import { DecoraPermissionDemoRoutingModule } from './decora-permission-demo-routing.module';

describe('DecoraPermissionDemoRoutingModule', () => {
  let decoraPermissionDemoRoutingModule: DecoraPermissionDemoRoutingModule;

  beforeEach(() => {
    decoraPermissionDemoRoutingModule = new DecoraPermissionDemoRoutingModule();
  });

  it('should create an instance', () => {
    expect(decoraPermissionDemoRoutingModule).toBeTruthy();
  });
});
