import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { Comic, PagesRequest, User } from 'src/app/model/model';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-quan-ly-truyen',
  templateUrl: './quan-ly-truyen.component.html',
  styleUrls: ['./quan-ly-truyen.component.css']
})
export class QuanLyTruyenComponent implements OnInit{
  page: PagesRequest = new PagesRequest();
  userDetail: User = new User();
  userSearch: User = new User();
  comicSearch: Comic = new Comic();
  pageSizes: number[] = [];
  asyncData: Comic[] = [];
  size: number = 10;
  total: number = 0;
  labels: any = {
    previousLabel: 'Trước',
    nextLabel: 'Sau',
  };
  constructor(
    public formBuilder: FormBuilder,
    public userServices: UserServicesService,
    public comicServices: ComicServicesService,
  ) {
  }

  searchForm = this.formBuilder.group({
    name: new FormControl(''),
    type: new FormControl(''),
    status: new FormControl(''),
  });

  detailForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.search(1);
  }

  search(page: any) {
    this.page.curentPage = page;
    this.comicServices
      .searchPaging(this.page, this.comicSearch)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data?.totalElements) this.total = res.data.totalElements;
          if (res.data?.content) {
            this.asyncData = res.data.content.map((item) => {
              item.status == '1' && (item.status = 'Đã hoàn thành');
              item.status == '0' && (item.status = 'Chưa hoàn thành');
              return item;
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

  idItemDelete: any;
  getIdItem(id: any) {
    this.idItemDelete = id;
    console.log(this.idItemDelete);
  }

  delete(id: any) {
    console.log("abc");
    this.userServices
      .delete(id)
      .subscribe((res) => {
        // if (res.errorCode == 'THANHCONG') {
        //   alert('Xoá người dùng thành công')
        //   window.location.reload();
        // } else {
        //   alert('Xoá người dùng không thành công')
        // }
      });
  }
}
