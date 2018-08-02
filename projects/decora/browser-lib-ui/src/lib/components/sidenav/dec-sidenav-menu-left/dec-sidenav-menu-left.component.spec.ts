import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavMenuLeftComponent } from './dec-sidenav-menu-left.component';

describe('DecSidenavMenuLeftComponent', () => {
  let component: DecSidenavMenuLeftComponent;
  let fixture: ComponentFixture<DecSidenavMenuLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavMenuLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
