import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListTableColumnComponent } from './list-table-column.component';

describe('DecListTableColumnComponent', () => {
  let component: DecListTableColumnComponent;
  let fixture: ComponentFixture<DecListTableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListTableColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
