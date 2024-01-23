import { Component, HostListener, OnChanges, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DefaultImage, FwError, list } from 'src/app/common/constants';
import { Comic, PagesRequest } from 'src/app/model/model';
import { ChapterServicesService } from 'src/app/services/chapter-services/chapter-services.service';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-tim-truyen',
  templateUrl: './tim-truyen.component.html',
  styleUrls: ['./tim-truyen.component.css']
})
export class TimTruyenComponent implements OnInit {
  list = list;
  labels: any = {
    previousLabel: 'Trước',
    nextLabel: 'Sau',
  };
  comicDetail: Comic = new Comic();
  page: PagesRequest = new PagesRequest();
  comicSearchRequest: Comic = new Comic();
  total: number = 0;
  asyncData: Comic[] = [];
  image1: any = DefaultImage;
  imageFile = this.image1;
  isActive = false;
  sort: string = '0';
  status: string = '-1';
  type: string;
  description : string;

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.sort = params['sort'];
      this.type = params['type'];
      this.status = params['status'];
      console.log(params['type']);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getDescription(this.type);
    this.search(1);
  }

  getDescription(type:any){
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if(item.name == this.type){
        this.description = item.description;
        break;
      }
    }
  }

  search(page: any) {
    this.page.curentPage = page;
    if(this.type != '' && this.type != null){
      if(this.type == 'Tất cả'){
        this.comicSearchRequest.type = '';
      }else
      this.comicSearchRequest.type = this.type;
    }

    if(this.status != '' && this.status != null){
      if(this.status == '-1'){
        this.comicSearchRequest.status = '';
      }else{
        this.comicSearchRequest.status = this.status;
      }
    }

    if(this.sort != '' && this.sort != null){
      if(this.sort == '0'){
        this.page.sort = 'updatedAt,desc';
      }
      if(this.sort == '1'){
        this.page.sort = 'createdAt,desc';
      }
      if(this.sort == '2'){
        this.page.sort = 'viewCount,desc';
      }
      if(this.sort == '3'){
        this.page.sort = 'viewCount,desc';
      }
      if(this.sort == '4'){
        this.page.sort = 'viewCount,desc';
      }
      if(this.sort == '5'){
        this.page.sort = 'viewCount,desc';
      }
      if(this.sort == '6'){
        this.page.sort = 'followed,desc';
      }
      if(this.sort == '7'){
        this.page.sort = 'commented,desc';
      }
    }
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
                  // this.detailForm.controls["file"].updateValueAndValidity();
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
