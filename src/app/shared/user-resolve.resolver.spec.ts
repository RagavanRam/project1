import { TestBed } from '@angular/core/testing';

import { UserResolveResolver } from './user-resolve.resolver';

describe('UserResolveResolver', () => {
  let resolver: UserResolveResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserResolveResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
