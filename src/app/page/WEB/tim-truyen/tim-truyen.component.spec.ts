import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimTruyenComponent } from './tim-truyen.component';

describe('TimTruyenComponent', () => {
  let component: TimTruyenComponent;
  let fixture: ComponentFixture<TimTruyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimTruyenComponent]
    });
    fixture = TestBed.createComponent(TimTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
