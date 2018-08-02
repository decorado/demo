import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecTabMenuComponent } from './tab-menu.component';

describe('DecTabMenuComponent', () => {
  let component: DecTabMenuComponent;
  let fixture: ComponentFixture<DecTabMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecTabMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecTabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
