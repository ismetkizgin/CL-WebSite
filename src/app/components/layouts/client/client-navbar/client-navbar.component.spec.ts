import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNavbarComponent } from './client-navbar.component';

describe('ClientNavbarComponent', () => {
  let component: ClientNavbarComponent;
  let fixture: ComponentFixture<ClientNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
