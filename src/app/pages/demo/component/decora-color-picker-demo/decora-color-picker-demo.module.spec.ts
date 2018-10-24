import { DecoraColorPickerDemoModule } from './decora-color-picker-demo.module';

describe('DecoraColorPickerDemoModule', () => {
  let decoraColorPickerDemoModule: DecoraColorPickerDemoModule;

  beforeEach(() => {
    decoraColorPickerDemoModule = new DecoraColorPickerDemoModule();
  });

  it('should create an instance', () => {
    expect(decoraColorPickerDemoModule).toBeTruthy();
  });
});
