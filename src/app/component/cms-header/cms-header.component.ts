import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Comic } from 'src/app/model/model';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.css']
})
export class CmsHeaderComponent {
  currentUser: any;
  comicSearchRequest: Comic = new Comic();
  comicNameSearchRequest: any;

  constructor(
    public formBuilder: FormBuilder,
    public comicService: ComicServicesService,
  ) {
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    console.log(this.currentUser);
  }

  logout() {
    // console.log("abc")
    localStorage.removeItem('currentUser');
  }

}
