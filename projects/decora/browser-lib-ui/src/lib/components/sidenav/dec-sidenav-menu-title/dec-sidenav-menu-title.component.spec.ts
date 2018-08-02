import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavMenuTitleComponent } from './dec-sidenav-menu-title.component';

describe('DecSidenavMenuTitleComponent', () => {
  let component: DecSidenavMenuTitleComponent;
  let fixture: ComponentFixture<DecSidenavMenuTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavMenuTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavMenuTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
