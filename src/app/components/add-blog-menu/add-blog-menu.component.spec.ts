import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogMenuComponent } from './add-blog-menu.component';

describe('AddBlogMenuComponent', () => {
  let component: AddBlogMenuComponent;
  let fixture: ComponentFixture<AddBlogMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlogMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
