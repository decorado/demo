import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecTabComponent } from './tab.component';

describe('DecTabComponent', () => {
  let component: DecTabComponent;
  let fixture: ComponentFixture<DecTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
