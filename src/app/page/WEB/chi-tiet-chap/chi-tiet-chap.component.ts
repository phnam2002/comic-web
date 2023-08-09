import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Observable, of } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { ChapterResponse, ChapterSearchRequest, Comic, FollowedComic, User } from 'src/app/model/model';
import { ChapterServicesService } from 'src/app/services/chapter-services/chapter-services.service';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';
import { FollowedComicServicesService } from 'src/app/services/followed-comic-services/followed-comic-services.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-chi-tiet-chap',
  templateUrl: './chi-tiet-chap.component.html',
  styleUrls: ['./chi-tiet-chap.component.css']
})
export class ChiTietChapComponent implements OnInit {

  chapterDetail: ChapterResponse = new ChapterResponse();
  chapterDetailSearch: ChapterSearchRequest = new ChapterSearchRequest();
  image: any = ``;
  filelist: any[];
  urls: Observable<String>[] = [];
  chapterSearchResponse: ChapterResponse = new ChapterResponse();
  chapterSearch: ChapterResponse[];
  items$: Observable<any> = of([]);
  id: any;
  currentUser: any;
  userDetail: User = new User();
  selectedChapter: any;
  searchText:any;
  isFirstChapter: boolean = true;

  selectedItem: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public comicService: ComicServicesService,
    private chapterService: ChapterServicesService,
    private fireStorage: AngularFireStorage,
    private followedComicService: FollowedComicServicesService,
    private userService: UserServicesService,
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
      this.urls = [];
      this.getDetail(this.id);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    // this.getDetail(this.id);
  }

  searchForm = this.formBuilder.group({
    chap: new FormControl(''),
    comic: new FormControl(''),
  });

  // async getUserDetail(id: any) {
  //   await this.userService.getDetail1(id).subscribe((item) => {
  //     this.userDetail = item;
  //   })
  // }

  loadData() {
    if (this.chapterDetail.chap)
      this.selectedChapter = this.chapterDetail.chap;
    console.log(this.selectedChapter);
    this.chapterDetailSearch.comic = this.chapterDetail.comic;
    this.chapterDetailSearch.chap = undefined;
    this.chapterService
      .searchSlect2(this.chapterDetailSearch).subscribe(item => {
        if (item.data) {
          console.log(item);
          this.chapterSearch = item.data;
        }
      })
  }



  getDetail(id: any) {
    this.chapterService
      .getDetail(id)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data) {
            this.chapterDetail = res.data;
            this.getFolderSize();
            this.loadData();
            if(this.chapterDetail.chap == 1)
            this.isFirstChapter = false;
            // this.chapterDetailSearch.comic = this.chapterDetail.comic;
            // this.chapterDetailSearch.id = this.chapterDetail.id;
          }
        } else {
          // this.toastrs.error(res.errorMessage);
        }
      });
  }

  getFolderSize() {
    if (this.chapterDetail.contentPath) {
      const ref = this.fireStorage.ref(this.chapterDetail.contentPath);
      ref.listAll().subscribe(res => {
        this.filelist = res.items;
        res.items.forEach(item => {
          const imageF = this.chapterService.getImageUrl(item.fullPath);
          this.urls.push(imageF);
        })
      });
    }
  }

  onOptionSelected() {
    this.chapterDetailSearch.comic = this.chapterDetail.comic;
    if (this.selectedChapter) {
      this.chapterDetailSearch.chap = this.selectedChapter;
    }
    this.goToChapSelected();
  }

  next() {
    this.chapterDetailSearch.comic = this.chapterDetail.comic;
    if (this.chapterDetail.chap) {
      this.chapterDetailSearch.chap = this.chapterDetail.chap + 1;
    }
    this.goToChapSelected();

  }

  prev() {
    this.chapterDetailSearch.comic = this.chapterDetail.comic;
    if (this.chapterDetail.chap) {
      this.chapterDetailSearch.chap = this.chapterDetail.chap - 1;
    }
    this.goToChapSelected();
    // if(this.chapterSearchResponse.id)
  }

  goToChapSelected() {
    this.chapterService
      .getDetailChap(this.chapterDetailSearch).subscribe(item => {
        if (item.data) {
          this.chapterSearchResponse = item.data;
          this.router.navigate(['/chi-tiet-chap', this.chapterSearchResponse.id]);
        }
      })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Kiểm tra nếu phím mũi tên trái được nhấn
    if (event.key === 'ArrowLeft') {
      this.prev();
    }
    if (event.key === 'ArrowRight') {
      this.next();
    }
  }
}
