import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung.component';

describe('QuanLyNguoiDungComponent', () => {
  let component: QuanLyNguoiDungComponent;
  let fixture: ComponentFixture<QuanLyNguoiDungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyNguoiDungComponent]
    });
    fixture = TestBed.createComponent(QuanLyNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
