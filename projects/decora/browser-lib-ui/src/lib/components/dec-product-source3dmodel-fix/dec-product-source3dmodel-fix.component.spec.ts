import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecProductSource3dmodelFixComponent } from './dec-product-source3dmodel-fix.component';

describe('DecProductSource3dmodelFixComponent', () => {
  let component: DecProductSource3dmodelFixComponent;
  let fixture: ComponentFixture<DecProductSource3dmodelFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecProductSource3dmodelFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecProductSource3dmodelFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
