import { DecoraProductMeasuresComparisonDemoModule } from './decora-product-measures-comparison-demo.module';

describe('DecoraProductMeasuresComparisonDemoModule', () => {
  let decoraProductMeasuresComparisonDemoModule: DecoraProductMeasuresComparisonDemoModule;

  beforeEach(() => {
    decoraProductMeasuresComparisonDemoModule = new DecoraProductMeasuresComparisonDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraProductMeasuresComparisonDemoModule).toBeTruthy();
  });
});
