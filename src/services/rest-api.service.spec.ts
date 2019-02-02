import { TestBed } from '@angular/core/testing';

import { RestApiService } from './rest-api.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestApiService = TestBed.get(RestApiService);
    expect(service).toBeTruthy();
  });
});
