import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecAvatarComponent } from './dec-avatar.component';

describe('DecAvatarComponent', () => {
  let component: DecAvatarComponent;
  let fixture: ComponentFixture<DecAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
