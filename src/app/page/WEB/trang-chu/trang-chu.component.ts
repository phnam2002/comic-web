import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DefaultImage, FwError } from 'src/app/common/constants';
import { Comic, PagesRequest } from 'src/app/model/model';
import { ChapterServicesService } from 'src/app/services/chapter-services/chapter-services.service';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
export class TrangChuComponent implements OnInit{
  selectedFiles: File[] = [];
  comicDetail: Comic = new Comic();
  page: PagesRequest = new PagesRequest();
  comicSearchRequest: Comic = new Comic();
  total: number = 0;
  asyncData: Comic[] = [];
  image1: any = DefaultImage;
  imageFile = this.image1;

  labels: any = {
    previousLabel: 'Trước',
    nextLabel: 'Sau',
  };
  tempSlide: number = 0;
  followedComic: boolean = false;
  currentUser: any;

  constructor(
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
    private chapterService: ChapterServicesService,
    private fireStorage: AngularFireStorage,

  ) {
  }
  customOptionsBanner: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    navText: ["<div class='nav-button owl-prev'>‹</div>", "<div class='nav-button owl-next'>›</div>"],
    dots: false ,
    dotsEach: false,
    autoHeight: true,
    autoWidth: true,
    autoplayHoverPause: true,
    autoplayMouseleaveTimeout: 500,
    autoplaySpeed: 500,
    responsive: {
      0: {
        items: 1,
        nav:true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5,
        nav:true
      },
    },
  };
  searchForm = this.formBuilder.group({
    code: new FormControl(''),
    name: new FormControl(''),
    type: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    publishAt: new FormControl(''),
    status: new FormControl(''),
    image: new FormControl(''),
    chapter: new FormControl(''),
  });


  detailForm = this.formBuilder.group({
    productType: new FormControl('', Validators.required),
    productGroup: new FormControl('', Validators.required),
    status: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    custDescription: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    promotions: new FormControl('', [Validators.required]),
    file: ['', [],],
  });


  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    // console.log(this.currentUser.username);
    this.search(1);
  }


  getDetail(id: any) {
    // getDetail() {
    this.selectedFiles = []
    this.comicService
      .getDetail(id)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data) {
            this.comicDetail = res.data;
            // this.comicDetail.status == '1' &&
            //   (this.comicDetail.status = '1');
            // this.comicDetail.status == '0' && (res.data.status = '0');
          }
        } else {
          // this.toastrs.error(res.errorMessage);
        }
      });
  }

  search(page: any) {
    this.page.curentPage = page;
    this.comicService
      .searchPaging(this.page, this.comicSearchRequest)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data?.totalElements) this.total = res.data.totalElements;
          if (res.data?.content) {

            this.asyncData = res.data.content.map((comic) => {
              if (comic.image) {
                try {
                  this.image1 = this.byteToImage(comic.image, 'image/jpg');
                  this.detailForm.controls["file"].updateValueAndValidity();
                } catch (error) {
                  console.log(error);
                }
              }
              const comic1: Comic = {
                name: comic.name,
                type: comic.type,
                code: comic.code,
                author: comic.author,
                description: comic.description,
                publishedAt: comic.publishedAt,
                updatedAt: comic.updatedAt,
                status: comic.status,
                viewCount: comic.viewCount,
                followed:comic.followed,
                commented:comic.commented,
                id: comic.id,
                image: this.image1,
                chapter: comic.chapter
              };
              // console.log(comic1);
              return comic1;
            });
          }
        }
      });
  }

  getCurrentPageNumber(index: number) {
    if (this.page.size) {
      return (this.page.curentPage - 1) * this.page.size + index;
    }
    return 0;
  }

  tooltipTop: number;
  tooltipLeft: number;
  isTooltipVisible: boolean = false;

  showTooltip(event: MouseEvent) {
    this.isTooltipVisible = true;
  }

  hideTooltip() {
    this.isTooltipVisible = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const targetElement = event.target as HTMLElement; // type assertion
    const x = event.clientX - targetElement.getBoundingClientRect().left;
    const x1 = targetElement.getBoundingClientRect().left;
    const y = event.clientY - targetElement.getBoundingClientRect().top;
    const y1 = targetElement.getBoundingClientRect().top;

    this.tooltipTop = x;
    this.tooltipLeft = y;
    // this.showTooltip(event);
  }

  fileToImage(file: any) {
    //  const byteArray = new Int8Array(new ArrayBuffer(this.productDetail.image));
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.readAsDataURL(file);
      reader.onerror = error => reject(error);
    });
  }

  byteToImage(bytes: any, type: string) {
    const byteCharacters = window.atob(bytes);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    //  const byteArray = new Int8Array(new ArrayBuffer(this.productDetail.image));
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.readAsDataURL(new Blob([byteArray], { type: type }));
      reader.onerror = error => reject(error);
    });
  }
}
