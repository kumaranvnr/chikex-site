import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLevel1LightComponent } from './navbar-level1-light.component';

describe('NavbarLevel1LightComponent', () => {
  let component: NavbarLevel1LightComponent;
  let fixture: ComponentFixture<NavbarLevel1LightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLevel1LightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLevel1LightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
