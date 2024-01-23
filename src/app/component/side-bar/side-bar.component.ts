import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  action = 'user';

  comicPage(){
    this.action ='comic'
  };
  userPage(){
    this.action='user';
  }
  chapPage(){
    this.action='chap';
  }
}
