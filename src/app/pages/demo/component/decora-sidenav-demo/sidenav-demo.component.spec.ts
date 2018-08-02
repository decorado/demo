import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDemoComponent } from './sidenav-demo.component';

describe('SidenavDemoComponent', () => {
  let component: SidenavDemoComponent;
  let fixture: ComponentFixture<SidenavDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
