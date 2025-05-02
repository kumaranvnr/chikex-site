import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignmodalComponent } from './signmodal.component';

describe('SignmodalComponent', () => {
  let component: SignmodalComponent;
  let fixture: ComponentFixture<SignmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
