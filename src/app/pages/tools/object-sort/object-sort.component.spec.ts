import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSortComponent } from './object-sort.component';

describe('ObjectSortComponent', () => {
  let component: ObjectSortComponent;
  let fixture: ComponentFixture<ObjectSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
