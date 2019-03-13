import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecSectionComponent } from './dec-section.component';

describe('DecSectionComponent', () => {
  let component: DecSectionComponent;
  let fixture: ComponentFixture<DecSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
