import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopComicRcmComponent } from './top-comic-rcm.component';

describe('TopComicRcmComponent', () => {
  let component: TopComicRcmComponent;
  let fixture: ComponentFixture<TopComicRcmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopComicRcmComponent]
    });
    fixture = TestBed.createComponent(TopComicRcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
