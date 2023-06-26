import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgselectComponent } from './ngselect.component';

describe('NgselectComponent', () => {
  let component: NgselectComponent;
  let fixture: ComponentFixture<NgselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgselectComponent]
    });
    fixture = TestBed.createComponent(NgselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
