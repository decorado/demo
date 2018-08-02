import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListComponent } from './list.component';

describe('DecListComponent', () => {
  let component: DecListComponent;
  let fixture: ComponentFixture<DecListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
