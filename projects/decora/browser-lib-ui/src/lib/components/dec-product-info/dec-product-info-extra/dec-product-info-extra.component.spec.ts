import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecProductInfoExtraComponent } from './dec-product-info-extra.component';

describe('DecProductInfoExtraComponent', () => {
  let component: DecProductInfoExtraComponent;
  let fixture: ComponentFixture<DecProductInfoExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecProductInfoExtraComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecProductInfoExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
