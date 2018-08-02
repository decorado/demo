import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecListFooterComponent } from './list-footer.component';

describe('DecListFooterComponent', () => {
  let component: DecListFooterComponent;
  let fixture: ComponentFixture<DecListFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecListFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
