import { DecoraAutocompleteCountryDemoModule } from './decora-autocomplete-country-demo.module';

describe('DecoraAutocompleteCountryDemoModule', () => {
  let decoraAutocompleteCountryDemoModule: DecoraAutocompleteCountryDemoModule;

  beforeEach(() => {
    decoraAutocompleteCountryDemoModule = new DecoraAutocompleteCountryDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteCountryDemoModule).toBeTruthy();
  });
});
