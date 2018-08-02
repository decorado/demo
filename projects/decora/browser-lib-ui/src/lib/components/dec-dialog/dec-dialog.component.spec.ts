import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecDialogComponent } from './dec-dialog.component';

describe('DecDialogComponent', () => {
  let component: DecDialogComponent;
  let fixture: ComponentFixture<DecDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
