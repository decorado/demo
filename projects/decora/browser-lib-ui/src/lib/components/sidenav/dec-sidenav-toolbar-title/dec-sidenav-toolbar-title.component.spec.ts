import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavToolbarTitleComponent } from './dec-sidenav-toolbar-title.component';

describe('DecSidenavToolbarTitleComponent', () => {
  let component: DecSidenavToolbarTitleComponent;
  let fixture: ComponentFixture<DecSidenavToolbarTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavToolbarTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavToolbarTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
