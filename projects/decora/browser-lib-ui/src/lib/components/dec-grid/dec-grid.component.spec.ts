import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecGridComponent } from './dec-grid.component';

describe('DecGridComponent', () => {
  let component: DecGridComponent;
  let fixture: ComponentFixture<DecGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
