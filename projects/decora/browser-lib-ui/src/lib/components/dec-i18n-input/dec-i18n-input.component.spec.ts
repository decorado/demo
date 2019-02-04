import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecI18nInputComponent } from './dec-i18n-input.component';

describe('DecI18nInputComponent', () => {
  let component: DecI18nInputComponent;
  let fixture: ComponentFixture<DecI18nInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecI18nInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecI18nInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
