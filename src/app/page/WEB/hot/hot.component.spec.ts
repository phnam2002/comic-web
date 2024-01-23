import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOTComponent } from './hot.component';

describe('HOTComponent', () => {
  let component: HOTComponent;
  let fixture: ComponentFixture<HOTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HOTComponent]
    });
    fixture = TestBed.createComponent(HOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
