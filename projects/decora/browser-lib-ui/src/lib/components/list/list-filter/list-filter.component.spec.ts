import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListFilterComponent } from './list-filter.component';

describe('DecListFilterComponent', () => {
  let component: DecListFilterComponent;
  let fixture: ComponentFixture<DecListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
