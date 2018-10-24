import { TestBed, inject } from '@angular/core/testing';

import { ColorPickerService } from './color-picker.service';

describe('ColorPickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorPickerService]
    });
  });

  it('should be created', inject([ColorPickerService], (service: ColorPickerService) => {
    expect(service).toBeTruthy();
  }));
});
