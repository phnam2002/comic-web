import { TestBed } from '@angular/core/testing';

import { FollowedComicServicesService } from './followed-comic-services.service';

describe('FollowedComicServicesService', () => {
  let service: FollowedComicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowedComicServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
