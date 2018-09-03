import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraCategoryDemoComponent } from './decora-category-demo.component';

describe('DecoraCategoryDemoComponent', () => {
  let component: DecoraCategoryDemoComponent;
  let fixture: ComponentFixture<DecoraCategoryDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraCategoryDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraCategoryDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
