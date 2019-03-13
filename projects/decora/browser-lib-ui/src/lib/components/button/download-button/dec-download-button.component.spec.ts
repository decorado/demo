import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecDownloadButtonComponent } from './dec-download-button.component';

describe('DecDownloadButtonComponent', () => {
  let component: DecDownloadButtonComponent;
  let fixture: ComponentFixture<DecDownloadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecDownloadButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecDownloadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
