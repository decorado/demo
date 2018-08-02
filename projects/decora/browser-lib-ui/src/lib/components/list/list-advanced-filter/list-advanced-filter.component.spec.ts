import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListAdvancedFilterComponent } from './list-advanced-filter.component';

describe('DecListAdvancedFilterComponent', () => {
  let component: DecListAdvancedFilterComponent;
  let fixture: ComponentFixture<DecListAdvancedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListAdvancedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListAdvancedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
