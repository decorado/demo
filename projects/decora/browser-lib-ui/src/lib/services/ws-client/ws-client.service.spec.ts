import { TestBed, inject } from '@angular/core/testing';

import { DecWsClientService } from './ws-client.service';

describe('DecWsClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecWsClientService]
    });
  });

  it('should be created', inject([DecWsClientService], (service: DecWsClientService) => {
    expect(service).toBeTruthy();
  }));
});
