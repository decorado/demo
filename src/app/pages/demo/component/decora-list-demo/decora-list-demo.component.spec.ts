import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraListDemoComponent } from './decora-list-demo.component';

describe('DecoraListDemoComponent', () => {
  let component: DecoraListDemoComponent;
  let fixture: ComponentFixture<DecoraListDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraListDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraListDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
