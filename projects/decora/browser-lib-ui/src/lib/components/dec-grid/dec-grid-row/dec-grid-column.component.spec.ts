import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecGridColumnComponent } from './dec-grid-row.component';

describe('DecGridColumnComponent', () => {
  let component: DecGridColumnComponent;
  let fixture: ComponentFixture<DecGridColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecGridColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecGridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
