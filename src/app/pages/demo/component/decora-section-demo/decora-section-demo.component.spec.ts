import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraSectionDemoComponent } from './decora-section-demo.component';

describe('DecoraSectionDemoComponent', () => {
  let component: DecoraSectionDemoComponent;
  let fixture: ComponentFixture<DecoraSectionDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraSectionDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraSectionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
