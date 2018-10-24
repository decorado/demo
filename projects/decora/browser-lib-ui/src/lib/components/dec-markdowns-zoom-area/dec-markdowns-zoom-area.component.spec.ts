import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecMarkdownsZoomAreaComponent } from './dec-markdowns-zoom-area.component';

describe('DecMarkdownsZoomAreaComponent', () => {
  let component: DecMarkdownsZoomAreaComponent;
  let fixture: ComponentFixture<DecMarkdownsZoomAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecMarkdownsZoomAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecMarkdownsZoomAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
