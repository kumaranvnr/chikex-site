import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSingleTopicComponent } from './help-single-topic.component';

describe('HelpSingleTopicComponent', () => {
  let component: HelpSingleTopicComponent;
  let fixture: ComponentFixture<HelpSingleTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpSingleTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpSingleTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
