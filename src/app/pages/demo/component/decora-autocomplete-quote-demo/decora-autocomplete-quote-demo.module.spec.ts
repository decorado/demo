import { DecoraAutocompleteQuoteDemoModule } from './decora-autocomplete-quote-demo.module';

describe('DecoraAutocompleteQuoteDemoModule', () => {
  let decoraAutocompleteQuoteDemoModule: DecoraAutocompleteQuoteDemoModule;

  beforeEach(() => {
    decoraAutocompleteQuoteDemoModule = new DecoraAutocompleteQuoteDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteQuoteDemoModule).toBeTruthy();
  });
});
