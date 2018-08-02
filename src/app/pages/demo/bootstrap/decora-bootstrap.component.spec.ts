import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraBootstrapComponent } from './decora-bootstrap.component';

describe('DecoraBootstrapComponent', () => {
  let component: DecoraBootstrapComponent;
  let fixture: ComponentFixture<DecoraBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
