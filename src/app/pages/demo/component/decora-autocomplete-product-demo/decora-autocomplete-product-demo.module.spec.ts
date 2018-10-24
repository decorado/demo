import { DecoraAutocompleteProductDemoModule } from './decora-autocomplete-product-demo.module';

describe('DecoraAutocompleteProductDemoModule', () => {
  let decoraAutocompleteProductDemoModule: DecoraAutocompleteProductDemoModule;

  beforeEach(() => {
    decoraAutocompleteProductDemoModule = new DecoraAutocompleteProductDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraAutocompleteProductDemoModule).toBeTruthy();
  });
});
