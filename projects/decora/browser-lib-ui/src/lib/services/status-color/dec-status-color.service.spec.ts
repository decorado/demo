import { TestBed, inject } from '@angular/core/testing';

import { DecStatusColorService } from './dec-status-color.service';

describe('DecStatusColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecStatusColorService]
    });
  });

  it('should be created', inject([DecStatusColorService], (service: DecStatusColorService) => {
    expect(service).toBeTruthy();
  }));
});
