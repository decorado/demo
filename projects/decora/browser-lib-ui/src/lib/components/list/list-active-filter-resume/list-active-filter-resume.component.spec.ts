import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListActiveFilterResumeComponent } from './list-active-filter-resume.component';

describe('DecListActiveFilterResumeComponent', () => {
  let component: DecListActiveFilterResumeComponent;
  let fixture: ComponentFixture<DecListActiveFilterResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListActiveFilterResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListActiveFilterResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
