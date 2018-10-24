import { TestBed, inject } from '@angular/core/testing';

import { DecDialogService } from './dec-dialog.service';

describe('DecDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecDialogService]
    });
  });

  it('should be created', inject([DecDialogService], (service: DecDialogService) => {
    expect(service).toBeTruthy();
  }));
});
