import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraDownloadButtonDemoComponent } from './decora-download-button-demo.component';

describe('DecoraDownloadButtonDemoComponent', () => {
  let component: DecoraDownloadButtonDemoComponent;
  let fixture: ComponentFixture<DecoraDownloadButtonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraDownloadButtonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraDownloadButtonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
