import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecCarouselComponent } from './dec-carousel.component';

describe('DecCarouselComponent', () => {
  let component: DecCarouselComponent;
  let fixture: ComponentFixture<DecCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
