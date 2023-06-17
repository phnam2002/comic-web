import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { FwError } from 'src/app/common/constants';
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
  image1: any = "data:image/jpg;base64,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"
  imageFile = this.image1;

  currentSlide: number = 0;
  maxSize: number = 10;
  autoHide: boolean = false;
  responsive: boolean = true;
  labels: any = {
    previousLabel: 'Trước',
    nextLabel: 'Sau',
  };
  tempSlide: number = 0;
  followedComic: boolean = false;

  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  currentUser: any;
  next() {
    if (this.tempSlide + 1 > 5) {
      this.slickModal.slickGoTo(0);
      this.tempSlide = 0;
    } else {
      this.slickModal.slickNext();
      this.tempSlide = this.tempSlide + 1;
    }
  }
  prev() {
    if (this.tempSlide - 1 < 0) {
      this.slickModal.slickGoTo(5);
      this.tempSlide = 5;
    } else {
      this.slickModal.slickPrev();
    }
  }

  slideConfig = {
    centerPadding: '100px',
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    waitForAnimate: false,
  };

  constructor(
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
    private chapterService: ChapterServicesService,
    private fireStorage: AngularFireStorage,

  ) {
    setInterval(() => {
      this.next();
    }, 3000);
  }

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
    // const currentUser = localStorage.getItem('currentUser');
    // if (currentUser) {
    //   this.currentUser = JSON.parse(currentUser);
    // }
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
            console.log(this.comicDetail)
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
    console.log(this.page.size);
    this.comicService
      .searchPaging(this.page, this.comicSearchRequest)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data) {
            console.log("bcd" + res.data);
          }

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
                id: comic.id,
                image: this.image1,
                chapter: comic.chapter
              };
              // console.log(comic1);
              return comic1;
            });
            console.log(this.asyncData);
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

    // console.log(x);
    // console.log(x1);
    // console.log(y);
    // console.log(y1);
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
