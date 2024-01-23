import { DOCUMENT } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private element: ElementRef,
    @Inject(DOCUMENT) private document: Document) { }

  header: any ;
  sticky: number | undefined;

  ngAfterViewInit() {
    this.header = document.getElementById('fixed');
    this.sticky = this.header.offsetTop;
  }

  scrollToTop(): void {
    // scroll to the top of the body
    return this.document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   console.log("top" + window.pageYOffset);
  //   console.log("sticky" + this.sticky);
  //   if (window.pageYOffset >= this.sticky ) {
  //     this.header.classList.add('sticky');
  //   } 
  //   else {
  //     this.header.classList.remove('sticky');
  //   }
  // }
}

