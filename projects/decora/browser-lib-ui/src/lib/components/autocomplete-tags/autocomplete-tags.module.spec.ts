import { DecAutocompleteTagsModule } from './autocomplete-tags.module';

describe('DecAutocompleteTagsModule', () => {
  let autocompleteTagsModule: DecAutocompleteTagsModule;

  beforeEach(() => {
    autocompleteTagsModule = new DecAutocompleteTagsModule();
  });

  it('should create an instance', () => {
    expect(autocompleteTagsModule).toBeTruthy();
  });
});
