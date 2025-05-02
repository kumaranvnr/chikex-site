import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSigninComponent } from './account-signin.component';

describe('AccountSigninComponent', () => {
  let component: AccountSigninComponent;
  let fixture: ComponentFixture<AccountSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
