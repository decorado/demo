import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavMenuItemComponent } from './dec-sidenav-menu-item.component';

describe('DecSidenavMenuItemComponent', () => {
  let component: DecSidenavMenuItemComponent;
  let fixture: ComponentFixture<DecSidenavMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
