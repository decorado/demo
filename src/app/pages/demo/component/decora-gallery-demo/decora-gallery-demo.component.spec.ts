import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraGalleryDemoComponent } from './decora-gallery-demo.component';

describe('DecoraGalleryDemoComponent', () => {
  let component: DecoraGalleryDemoComponent;
  let fixture: ComponentFixture<DecoraGalleryDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraGalleryDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraGalleryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
