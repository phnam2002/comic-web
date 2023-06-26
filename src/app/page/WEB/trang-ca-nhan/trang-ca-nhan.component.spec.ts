import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangCaNhanComponent } from './trang-ca-nhan.component';

describe('TrangCaNhanComponent', () => {
  let component: TrangCaNhanComponent;
  let fixture: ComponentFixture<TrangCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrangCaNhanComponent]
    });
    fixture = TestBed.createComponent(TrangCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
