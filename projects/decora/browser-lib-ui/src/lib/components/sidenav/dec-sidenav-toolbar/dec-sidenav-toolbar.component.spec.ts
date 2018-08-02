import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavToolbarComponent } from './dec-sidenav-toolbar.component';

describe('DecSidenavToolbarComponent', () => {
  let component: DecSidenavToolbarComponent;
  let fixture: ComponentFixture<DecSidenavToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
