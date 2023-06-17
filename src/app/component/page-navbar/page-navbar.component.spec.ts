import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavbarComponent } from './page-navbar.component';

describe('PageNavbarComponent', () => {
  let component: PageNavbarComponent;
  let fixture: ComponentFixture<PageNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNavbarComponent]
    });
    fixture = TestBed.createComponent(PageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
