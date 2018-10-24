import { TestBed, inject } from '@angular/core/testing';

import { DecConfirmDialogService } from './dec-confirm-dialog.service';

describe('DecConfirmDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecConfirmDialogService]
    });
  });

  it('should be created', inject([DecConfirmDialogService], (service: DecConfirmDialogService) => {
    expect(service).toBeTruthy();
  }));
});
