import { DecoraListDemoModule } from './decora-list-demo.module';

describe('DecoraListDemoModule', () => {
  let decoraListDemoModule: DecoraListDemoModule;

  beforeEach(() => {
    decoraListDemoModule = new DecoraListDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraListDemoModule).toBeTruthy();
  });
});
