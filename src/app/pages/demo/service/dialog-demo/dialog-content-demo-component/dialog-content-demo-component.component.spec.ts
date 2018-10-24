import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentDemoComponentComponent } from './dialog-content-demo-component.component';

describe('DialogContentDemoComponentComponent', () => {
  let component: DialogContentDemoComponentComponent;
  let fixture: ComponentFixture<DialogContentDemoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentDemoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentDemoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
