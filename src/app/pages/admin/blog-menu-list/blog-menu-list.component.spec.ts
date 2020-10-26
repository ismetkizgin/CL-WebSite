import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMenuListComponent } from './blog-menu-list.component';

describe('BlogMenuListComponent', () => {
  let component: BlogMenuListComponent;
  let fixture: ComponentFixture<BlogMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogMenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
