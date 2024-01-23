import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { DefaultImage, FwError } from 'src/app/common/constants';
import { Comic, FollowedComic, PagesRequest, User } from 'src/app/model/model';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';
import { FollowedComicServicesService } from 'src/app/services/followed-comic-services/followed-comic-services.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-chi-tiet-truyen',
  templateUrl: './chi-tiet-truyen.component.html',
  styleUrls: ['./chi-tiet-truyen.component.css']
})
export class ChiTietTruyenComponent implements OnInit{
  currentUser: any;
  selectedFiles: File[] = [];
  comicDetail: Comic = new Comic();
  comicSearchRequest: Comic = new Comic();
  total: number = 0;
  chapterLength: number;
  image = DefaultImage;
  followedComic: FollowedComic = new FollowedComic();
  userDetail: User = new User();

  showAdditionalRows = false;
  show = false;
  maxSize: number = 10;
  autoHide: boolean = false;
  responsive: boolean = true;
  labels: any = {
    previousLabel: 'Trước',
    nextLabel: 'Sau',
  };
  id: any;
  followed = false;

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private userService: UserServicesService,
    private followedComicService: FollowedComicServicesService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
      this.getDetail(this.id);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
      this.getUserDetail(this.currentUser.id);
    }

  }

  async getUserDetail(id: any) {
    await this.userService.getDetail1(id).subscribe((item) => {
      this.userDetail = item;
      this.getDetailFollowedComic();
    })
  }

  getDetailFollowedComic() {
    console.log(this.followedComic.id);
    if(this.userDetail && this.comicDetail){
      this.followedComicService.searchDetail(this.userDetail.id,this.comicDetail.id).subscribe((item)=>{
        if(item.data){
          this.followed =true;
          this.followedComic=item.data;
          console.log(this.followedComic.id);
        }
      })
    }
  }

  async getDetail(id: any) {
    this.selectedFiles = []
    await this.comicService
      .getDetail(id)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data) {
            this.comicDetail = res.data;
            if(this.comicDetail.chapter){
              this.total = this.comicDetail.chapter?.length;
            }
            // console.log(this.followedComic.comic);
            if (this.comicDetail.status == '0') {
              this.comicDetail.status = 'Đang tiến hành'
            } else {
              this.comicDetail.status = 'Đã hoàn thành'
            }
            if (this.comicDetail.chapter) {
              this.chapterLength = this.comicDetail.chapter.length;
            }
            if (this.comicDetail.author == '' || this.comicDetail.author == null) {
              this.comicDetail.author = 'Đang cập nhật'
            }

            if (this.comicDetail.image) {
              this.byteToImage(this.comicDetail.image, 'image/jpg').then(item => {
                this.image = item
                // this.detailForm.controls["file"].updateValueAndValidity();
              })
            }
          }
          const breadcrumb = { name: this.comicDetail.name };
          // console.log(breadcrumb);
          this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
        } else {
        }

      });

  }

  follow(){
      this.followedComic.comic = this.comicDetail;
      this.followedComic.user = this.userDetail;
      this.followedComicService.create(this.followedComic).subscribe((item)=>{
          this.followed = true;
      })
  }

  unfollow(){
    this.followedComicService.delete(this.followedComic.id).subscribe((item)=>{

        this.followed = false;

        console.log(this.followedComic.id);

    })
  }

  onShowMoreClicked() {
    this.showAdditionalRows = true;
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
