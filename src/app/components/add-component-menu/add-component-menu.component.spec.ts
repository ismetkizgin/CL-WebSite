import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponentMenuComponent } from './add-component-menu.component';

describe('AddComponentMenuComponent', () => {
  let component: AddComponentMenuComponent;
  let fixture: ComponentFixture<AddComponentMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComponentMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
