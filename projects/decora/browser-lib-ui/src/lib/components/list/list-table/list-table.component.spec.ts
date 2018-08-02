import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListTableComponent } from './list-table.component';

describe('DecListTableComponent', () => {
  let component: DecListTableComponent;
  let fixture: ComponentFixture<DecListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
