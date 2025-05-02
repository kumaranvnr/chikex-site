import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSubmitRequestComponent } from './help-submit-request.component';

describe('HelpSubmitRequestComponent', () => {
  let component: HelpSubmitRequestComponent;
  let fixture: ComponentFixture<HelpSubmitRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpSubmitRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpSubmitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
