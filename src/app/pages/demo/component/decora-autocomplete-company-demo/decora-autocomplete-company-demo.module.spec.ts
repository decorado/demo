import { DecoraAutocompleteCompanyDemoModule } from './decora-autocomplete-company-demo.module';

describe('DecoraAutocompleteCompanyDemoModule', () => {
  let decoraAutocompleteCompanyDemoModule: DecoraAutocompleteCompanyDemoModule;

  beforeEach(() => {
    decoraAutocompleteCompanyDemoModule = new DecoraAutocompleteCompanyDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteCompanyDemoModule).toBeTruthy();
  });
});
