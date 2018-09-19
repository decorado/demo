import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraLoaderDemoComponent } from './decora-loader-demo.component';

describe('DecoraLoaderDemoComponent', () => {
  let component: DecoraLoaderDemoComponent;
  let fixture: ComponentFixture<DecoraLoaderDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraLoaderDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraLoaderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
