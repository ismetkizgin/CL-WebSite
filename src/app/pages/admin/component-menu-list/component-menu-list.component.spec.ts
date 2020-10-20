import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMenuListComponent } from './component-menu-list.component';

describe('ComponentMenuListComponent', () => {
  let component: ComponentMenuListComponent;
  let fixture: ComponentFixture<ComponentMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentMenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
