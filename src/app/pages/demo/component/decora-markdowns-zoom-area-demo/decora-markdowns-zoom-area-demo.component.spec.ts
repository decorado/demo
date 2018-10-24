import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraMarkdownsZoomAreaDemoComponent } from './decora-markdowns-zoom-area-demo.component';

describe('DecoraMarkdownsZoomAreaDemoComponent', () => {
  let component: DecoraMarkdownsZoomAreaDemoComponent;
  let fixture: ComponentFixture<DecoraMarkdownsZoomAreaDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraMarkdownsZoomAreaDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraMarkdownsZoomAreaDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
