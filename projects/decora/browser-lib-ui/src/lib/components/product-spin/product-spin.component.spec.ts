import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSpinTestingModule } from './testing/product-spin-testing.module';
import { DecProductSpinComponent } from './product-spin.component';

describe('ProductSpinSpinnerComponent', () => {
  let component: DecProductSpinComponent;
  let fixture: ComponentFixture<DecProductSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductSpinTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecProductSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
