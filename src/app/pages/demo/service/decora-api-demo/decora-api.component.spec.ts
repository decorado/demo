import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecApiComponent } from './decora-api.component';

describe('DecApiComponent', () => {
  let component: DecApiComponent;
  let fixture: ComponentFixture<DecApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
