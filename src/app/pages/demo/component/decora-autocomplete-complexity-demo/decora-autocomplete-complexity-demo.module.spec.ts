import { DecoraAutocompleteComplexityDemoModule } from './decora-autocomplete-complexity-demo.module';

describe('DecoraAutocompleteComplexityDemoModule', () => {
  let decoraAutocompleteComplexityDemoModule: DecoraAutocompleteComplexityDemoModule;

  beforeEach(() => {
    decoraAutocompleteComplexityDemoModule = new DecoraAutocompleteComplexityDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteComplexityDemoModule).toBeTruthy();
  });
});
