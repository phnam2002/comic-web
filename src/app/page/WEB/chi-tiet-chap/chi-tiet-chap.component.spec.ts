import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietChapComponent } from './chi-tiet-chap.component';

describe('ChiTietChapComponent', () => {
  let component: ChiTietChapComponent;
  let fixture: ComponentFixture<ChiTietChapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietChapComponent]
    });
    fixture = TestBed.createComponent(ChiTietChapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
