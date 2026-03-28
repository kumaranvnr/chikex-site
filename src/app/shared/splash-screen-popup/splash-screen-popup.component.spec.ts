import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashScreenPopupComponent } from './splash-screen-popup.component';

describe('SplashScreenPopupComponent', () => {
  let component: SplashScreenPopupComponent;
  let fixture: ComponentFixture<SplashScreenPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashScreenPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashScreenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
