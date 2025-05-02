import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSingleTicketComponent } from './account-single-ticket.component';

describe('AccountSingleTicketComponent', () => {
  let component: AccountSingleTicketComponent;
  let fixture: ComponentFixture<AccountSingleTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSingleTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSingleTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
