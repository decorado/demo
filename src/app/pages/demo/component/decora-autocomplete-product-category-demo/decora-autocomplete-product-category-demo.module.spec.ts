import { DecoraAutocompleteProductCategoryDemoModule } from './decora-autocomplete-product-category-demo.module';

describe('DecoraAutocompleteProductCategoryDemoModule', () => {
  let decoraAutocompleteProductCategoryDemoModule: DecoraAutocompleteProductCategoryDemoModule;

  beforeEach(() => {
    decoraAutocompleteProductCategoryDemoModule = new DecoraAutocompleteProductCategoryDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteProductCategoryDemoModule).toBeTruthy();
  });
});
