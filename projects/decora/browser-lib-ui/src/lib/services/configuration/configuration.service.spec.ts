import { TestBed, inject } from '@angular/core/testing';

import { DecConfigurationService } from './configuration.service';

describe('DecConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecConfigurationService]
    });
  });

  it('should be created', inject([DecConfigurationService], (service: DecConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
