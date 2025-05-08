import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewaddressmodalComponent } from './newaddressmodal.component';

describe('NewaddressmodalComponent', () => {
  let component: NewaddressmodalComponent;
  let fixture: ComponentFixture<NewaddressmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewaddressmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewaddressmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
