import { DecProductMeasuresComparisonModule } from './dec-product-measures-comparison.module';

describe('DecProductMeasuresComparisonModule', () => {
  let decProductMeasuresComparisonModule: DecProductMeasuresComparisonModule;

  beforeEach(() => {
    decProductMeasuresComparisonModule = new DecProductMeasuresComparisonModule();
  });

  it('should create an instance', () => {
    expect(decProductMeasuresComparisonModule).toBeTruthy();
  });
});
