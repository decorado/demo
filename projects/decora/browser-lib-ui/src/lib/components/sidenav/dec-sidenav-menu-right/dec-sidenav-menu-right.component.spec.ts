import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavMenuRightComponent } from './dec-sidenav-menu-right.component';

describe('DecSidenavMenuRightComponent', () => {
  let component: DecSidenavMenuRightComponent;
  let fixture: ComponentFixture<DecSidenavMenuRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavMenuRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavMenuRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
