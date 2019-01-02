import { TestBed } from '@angular/core/testing';

import { DecLanguageService } from './dec-language.service';

describe('DecLanguageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecLanguageService = TestBed.get(DecLanguageService);
    expect(service).toBeTruthy();
  });
});
