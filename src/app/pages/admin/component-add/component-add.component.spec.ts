import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAddComponent } from './component-add.component';

describe('ComponentAddComponent', () => {
  let component: ComponentAddComponent;
  let fixture: ComponentFixture<ComponentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
