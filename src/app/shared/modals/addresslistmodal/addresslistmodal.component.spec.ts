import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresslistmodalComponent } from './addresslistmodal.component';

describe('AddresslistmodalComponent', () => {
  let component: AddresslistmodalComponent;
  let fixture: ComponentFixture<AddresslistmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddresslistmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddresslistmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
