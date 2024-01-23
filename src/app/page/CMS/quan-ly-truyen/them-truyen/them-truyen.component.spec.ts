import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemTruyenComponent } from './them-truyen.component';

describe('ThemTruyenComponent', () => {
  let component: ThemTruyenComponent;
  let fixture: ComponentFixture<ThemTruyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemTruyenComponent]
    });
    fixture = TestBed.createComponent(ThemTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
