import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemChuongComponent } from './them-chuong.component';

describe('ThemChuongComponent', () => {
  let component: ThemChuongComponent;
  let fixture: ComponentFixture<ThemChuongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemChuongComponent]
    });
    fixture = TestBed.createComponent(ThemChuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
