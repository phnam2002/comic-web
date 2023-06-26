import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruyenTheoDoiComponent } from './truyen-theo-doi.component';

describe('TruyenTheoDoiComponent', () => {
  let component: TruyenTheoDoiComponent;
  let fixture: ComponentFixture<TruyenTheoDoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruyenTheoDoiComponent]
    });
    fixture = TestBed.createComponent(TruyenTheoDoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
