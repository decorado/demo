import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListGridComponent } from './list-grid.component';

describe('DecListGridComponent', () => {
  let component: DecListGridComponent;
  let fixture: ComponentFixture<DecListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
