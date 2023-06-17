import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTruyenComponent } from './quan-ly-truyen.component';

describe('QuanLyTruyenComponent', () => {
  let component: QuanLyTruyenComponent;
  let fixture: ComponentFixture<QuanLyTruyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyTruyenComponent]
    });
    fixture = TestBed.createComponent(QuanLyTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
