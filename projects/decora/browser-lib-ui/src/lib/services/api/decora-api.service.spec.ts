import { TestBed, inject } from '@angular/core/testing';

import { DecApiService } from './decora-api.service';

describe('DecApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecApiService]
    });
  });

  it('should be created', inject([DecApiService], (service: DecApiService) => {
    expect(service).toBeTruthy();
  }));
});
