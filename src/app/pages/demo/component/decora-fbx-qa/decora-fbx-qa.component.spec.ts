import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraFbxQaComponent } from './decora-fbx-qa.component';

describe('DecoraFbxQaComponent', () => {
  let component: DecoraFbxQaComponent;
  let fixture: ComponentFixture<DecoraFbxQaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoraFbxQaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoraFbxQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
