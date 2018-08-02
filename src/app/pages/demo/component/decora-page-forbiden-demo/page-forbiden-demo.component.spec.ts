import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForbidenDemoComponent } from './page-forbiden-demo.component';

describe('PageForbidenDemoComponent', () => {
  let component: PageForbidenDemoComponent;
  let fixture: ComponentFixture<PageForbidenDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageForbidenDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForbidenDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
