import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavMenuComponent } from './dec-sidenav-menu.component';

describe('DecSidenavMenuComponent', () => {
  let component: DecSidenavMenuComponent;
  let fixture: ComponentFixture<DecSidenavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
