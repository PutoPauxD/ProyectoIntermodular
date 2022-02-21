import { TestBed } from '@angular/core/testing';

import { ContactarService } from './contactar.service';

describe('ContactarService', () => {
  let service: ContactarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
