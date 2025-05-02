import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTicketsComponent } from './account-tickets.component';

describe('AccountTicketsComponent', () => {
  let component: AccountTicketsComponent;
  let fixture: ComponentFixture<AccountTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
