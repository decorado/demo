import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraImageDemoComponent } from './decora-image-demo.component';

describe('DecoraImageDemoComponent', () => {
  let component: DecoraImageDemoComponent;
  let fixture: ComponentFixture<DecoraImageDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraImageDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraImageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
