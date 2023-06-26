import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinChungComponent } from './thong-tin-chung.component';

describe('ThongTinChungComponent', () => {
  let component: ThongTinChungComponent;
  let fixture: ComponentFixture<ThongTinChungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinChungComponent]
    });
    fixture = TestBed.createComponent(ThongTinChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
