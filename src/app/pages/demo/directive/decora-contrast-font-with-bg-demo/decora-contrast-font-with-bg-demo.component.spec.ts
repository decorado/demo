import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraContrastFontWithBgDemoComponent } from './decora-contrast-font-with-bg-demo.component';

describe('DecoraContrastFontWithBgDemoComponent', () => {
  let component: DecoraContrastFontWithBgDemoComponent;
  let fixture: ComponentFixture<DecoraContrastFontWithBgDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraContrastFontWithBgDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraContrastFontWithBgDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
