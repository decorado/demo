import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecIconComponent } from './dec-icon.component';

describe('DecIconComponent', () => {
  let component: DecIconComponent;
  let fixture: ComponentFixture<DecIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
