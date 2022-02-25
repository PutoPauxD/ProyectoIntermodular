import { TestBed } from '@angular/core/testing';

import { ComentariosResolver } from './comentarios.resolver';

describe('ComentariosResolver', () => {
  let resolver: ComentariosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ComentariosResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
