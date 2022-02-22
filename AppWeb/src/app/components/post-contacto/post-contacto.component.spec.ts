import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContactoComponent } from './post-contacto.component';

describe('PostContactoComponent', () => {
  let component: PostContactoComponent;
  let fixture: ComponentFixture<PostContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
