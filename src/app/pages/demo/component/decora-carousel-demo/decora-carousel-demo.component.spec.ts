import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraCarouselDemoComponent } from './decora-carousel-demo.component';

describe('DecoraCarouselDemoComponent', () => {
  let component: DecoraCarouselDemoComponent;
  let fixture: ComponentFixture<DecoraCarouselDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraCarouselDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraCarouselDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
