import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecDialogTitleComponent } from './dec-dialog-title.component';

describe('DecDialogTitleComponent', () => {
  let component: DecDialogTitleComponent;
  let fixture: ComponentFixture<DecDialogTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecDialogTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecDialogTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
