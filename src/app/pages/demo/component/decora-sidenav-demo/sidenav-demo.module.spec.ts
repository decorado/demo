import { SidenavDemoModule } from './sidenav-demo.module';

describe('SidenavDemoModule', () => {
  let sidenavDemoModule: SidenavDemoModule;

  beforeEach(() => {
    sidenavDemoModule = new SidenavDemoModule();
  });

  it('should create an instance', () => {
    expect(sidenavDemoModule).toBeTruthy();
  });
});
