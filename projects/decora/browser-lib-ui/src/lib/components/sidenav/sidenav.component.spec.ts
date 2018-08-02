import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSidenavComponent } from './sidenav.component';

describe('DecSidenavComponent', () => {
  let component: DecSidenavComponent;
  let fixture: ComponentFixture<DecSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
