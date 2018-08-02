import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecTabsComponent } from './tabs.component';

describe('DecTabsComponent', () => {
  let component: DecTabsComponent;
  let fixture: ComponentFixture<DecTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
