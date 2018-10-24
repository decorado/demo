import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecGridRowComponent } from './dec-grid-row.component';

describe('DecGridRowComponent', () => {
  let component: DecGridRowComponent;
  let fixture: ComponentFixture<DecGridRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecGridRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
