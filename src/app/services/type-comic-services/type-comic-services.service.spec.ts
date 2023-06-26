import { TestBed } from '@angular/core/testing';

import { TypeComicServicesService } from './type-comic-services.service';

describe('TypeComicServicesService', () => {
  let service: TypeComicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeComicServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
