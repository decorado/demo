import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecProductFeaturesComponent } from './dec-product-features.component';

describe('DecProductFeaturesComponent', () => {
  let component: DecProductFeaturesComponent;
  let fixture: ComponentFixture<DecProductFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecProductFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecProductFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
