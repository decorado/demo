import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecProductBriefingComponent } from './dec-product-briefing.component';

describe('DecProductBriefingComponent', () => {
  let component: DecProductBriefingComponent;
  let fixture: ComponentFixture<DecProductBriefingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecProductBriefingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecProductBriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
