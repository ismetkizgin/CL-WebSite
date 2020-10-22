import { TestBed } from '@angular/core/testing';

import { ComponentMenuService } from './component-menu.service';

describe('ComponentMenuService', () => {
  let service: ComponentMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
