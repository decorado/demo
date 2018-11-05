import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecDialogContentComponent } from './dec-dialog-content.component';

describe('DecDialogContentComponent', () => {
  let component: DecDialogContentComponent;
  let fixture: ComponentFixture<DecDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
