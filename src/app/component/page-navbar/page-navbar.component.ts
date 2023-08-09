import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { list } from 'src/app/common/constants';


@Component({
  selector: 'app-page-navbar',
  templateUrl: './page-navbar.component.html',
  styleUrls: ['./page-navbar.component.css']
})
export class PageNavbarComponent implements OnInit {
  currentUser: any;
  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

  description: string;
  nameSelected: string = '';

  list = list;
  displayDescription(description: any) {
    this.description = description; // Update the description property
  }

  hideDescription() {
    this.description = ""; // Update the description property
  }
}
