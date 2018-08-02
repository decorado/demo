import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavContentComponent } from './dec-sidenav-content.component';

describe('DecSidenavContentComponent', () => {
  let component: DecSidenavContentComponent;
  let fixture: ComponentFixture<DecSidenavContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
