import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraBreadcrumbDemoComponent } from './decora-breadcrumb-demo.component';

describe('DecoraBreadcrumbDemoComponent', () => {
  let component: DecoraBreadcrumbDemoComponent;
  let fixture: ComponentFixture<DecoraBreadcrumbDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraBreadcrumbDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraBreadcrumbDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
