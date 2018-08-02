import { DemoContainerModule } from './demo-container.module';

describe('DemoContainerModule', () => {
  let demoContainerModule: DemoContainerModule;

  beforeEach(() => {
    demoContainerModule = new DemoContainerModule();
  });

  it('should create an instance', () => {
    expect(demoContainerModule).toBeTruthy();
  });
});
