import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraUploadDemoComponent } from './decora-upload-demo.component';

describe('DecoraUploadDemoComponent', () => {
  let component: DecoraUploadDemoComponent;
  let fixture: ComponentFixture<DecoraUploadDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraUploadDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraUploadDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
