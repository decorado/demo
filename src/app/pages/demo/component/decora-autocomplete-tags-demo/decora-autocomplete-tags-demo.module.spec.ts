import { DecoraAutocompleteTagsDemoModule } from './decora-autocomplete-tags-demo.module';

describe('DecoraAutocompleteTagsDemoModule', () => {
  let decoraAutocompleteTagsDemoModule: DecoraAutocompleteTagsDemoModule;

  beforeEach(() => {
    decoraAutocompleteTagsDemoModule = new DecoraAutocompleteTagsDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteTagsDemoModule).toBeTruthy();
  });
});
