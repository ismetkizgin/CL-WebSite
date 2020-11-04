import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFooterComponent } from './client-footer.component';

describe('ClientFooterComponent', () => {
  let component: ClientFooterComponent;
  let fixture: ComponentFixture<ClientFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
