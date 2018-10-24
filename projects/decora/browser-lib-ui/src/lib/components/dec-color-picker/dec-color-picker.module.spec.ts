import { DecColorPickerModule } from './dec-color-picker.module';

describe('DecColorPickerModule', () => {
  let decColorPickerModule: DecColorPickerModule;

  beforeEach(() => {
    decColorPickerModule = new DecColorPickerModule();
  });

  it('should create an instance', () => {
    expect(decColorPickerModule).toBeTruthy();
  });
});
