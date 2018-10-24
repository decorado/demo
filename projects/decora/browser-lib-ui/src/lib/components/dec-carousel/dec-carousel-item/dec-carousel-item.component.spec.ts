import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecCarouselItemComponent } from './dec-carousel-item.component';

describe('DecCarouselItemComponent', () => {
  let component: DecCarouselItemComponent;
  let fixture: ComponentFixture<DecCarouselItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecCarouselItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
