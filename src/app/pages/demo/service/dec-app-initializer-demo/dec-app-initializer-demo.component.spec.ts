import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAppInitializerDemoComponent } from './dec-app-initializer-demo.component';

describe('DecAppInitializerDemoComponent', () => {
  let component: DecAppInitializerDemoComponent;
  let fixture: ComponentFixture<DecAppInitializerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAppInitializerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAppInitializerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
