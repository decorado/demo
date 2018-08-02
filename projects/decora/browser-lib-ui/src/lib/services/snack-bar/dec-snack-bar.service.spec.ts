import { TestBed, inject } from '@angular/core/testing';

import { DecSnackBarService } from './dec-snack-bar.service';

describe('DecSnackBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecSnackBarService]
    });
  });

  it('should be created', inject([DecSnackBarService], (service: DecSnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
