import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecProductInfoComponent } from './dec-product-info.component';

describe('ProductInfoComponent', () => {
  let component: DecProductInfoComponent;
  let fixture: ComponentFixture<DecProductInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DecProductInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
