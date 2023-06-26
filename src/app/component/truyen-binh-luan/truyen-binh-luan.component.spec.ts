import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruyenBinhLuanComponent } from './truyen-binh-luan.component';

describe('TruyenBinhLuanComponent', () => {
  let component: TruyenBinhLuanComponent;
  let fixture: ComponentFixture<TruyenBinhLuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruyenBinhLuanComponent]
    });
    fixture = TestBed.createComponent(TruyenBinhLuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
