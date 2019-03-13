import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraI18nInputDemoComponent } from './decora-i18n-input-demo.component';

describe('DecoraI18nInputDemoComponent', () => {
  let component: DecoraI18nInputDemoComponent;
  let fixture: ComponentFixture<DecoraI18nInputDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraI18nInputDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraI18nInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
