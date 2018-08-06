import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListTabsFilterComponent } from './list-tabs-filter.component';

describe('DecListTabsFilterComponent', () => {
  let component: DecListTabsFilterComponent;
  let fixture: ComponentFixture<DecListTabsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListTabsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListTabsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
