import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyChuongComponent } from './quan-ly-chuong.component';

describe('QuanLyChuongComponent', () => {
  let component: QuanLyChuongComponent;
  let fixture: ComponentFixture<QuanLyChuongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyChuongComponent]
    });
    fixture = TestBed.createComponent(QuanLyChuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
