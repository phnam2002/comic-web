import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhSuaComponent } from './chinh-sua.component';

describe('ChinhSuaComponent', () => {
  let component: ChinhSuaComponent;
  let fixture: ComponentFixture<ChinhSuaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChinhSuaComponent]
    });
    fixture = TestBed.createComponent(ChinhSuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
