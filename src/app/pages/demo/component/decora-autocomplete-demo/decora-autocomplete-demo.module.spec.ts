import { DecoraAutocompleteDemoModule } from './decora-autocomplete-demo.module';

describe('DecoraAutocompleteDemoModule', () => {
  let decoraAutocompleteDemoModule: DecoraAutocompleteDemoModule;

  beforeEach(() => {
    decoraAutocompleteDemoModule = new DecoraAutocompleteDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteDemoModule).toBeTruthy();
  });
});
