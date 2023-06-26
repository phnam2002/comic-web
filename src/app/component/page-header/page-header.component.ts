import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ControlValueAccessor, FormBuilder } from '@angular/forms';
import { concat, noop, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { Comic, NgParam, PagesRequest } from 'src/app/model/model';
import { ChapterServicesService } from 'src/app/services/chapter-services/chapter-services.service';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
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
