import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecConfigurationDemoComponent } from './decora-config.component';

describe('DecConfigurationDemoComponent', () => {
  let component: DecConfigurationDemoComponent;
  let fixture: ComponentFixture<DecConfigurationDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecConfigurationDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecConfigurationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
