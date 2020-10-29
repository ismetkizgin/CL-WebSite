import { TestBed } from '@angular/core/testing';

import { BlogMenuService } from './blog-menu.service';

describe('BlogMenuService', () => {
  let service: BlogMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
