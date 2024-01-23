import { Component, ElementRef, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FwError } from 'src/app/common/constants';
import { Comic, PagesRequest, User } from 'src/app/model/model';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.css']
})
export class QuanLyNguoiDungComponent implements OnInit {

  page: PagesRequest = new PagesRequest();
  userDetail: User = new User();
  userSearch: User = new User();
  pageSizes: number[] = [];
  asyncData: User[] = [];
  size: number = 10;
  total: number = 0;
  labels: any = {
    previousLabel: 'Trước',
    nextLabel: 'Sau',
  };
  constructor(
    public formBuilder: FormBuilder,
    public userServices: UserServicesService,
    private el: ElementRef,
  ) {
  }

  searchForm = this.formBuilder.group({
    username: new FormControl(''),
    fullName: new FormControl(''),
    role: new FormControl(''),
  });

  detailForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    value: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.search(1);
    this.pageSizes = [1, 5, 10, 20, 50, 100];
  }

  search(page: any) {
    this.page.curentPage = page;
    if (this.userSearch.role == '-1') {
      this.userSearch.role = '';
    }
    this.userServices
      .searchPaging(this.page, this.userSearch)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data?.totalElements) this.total = res.data.totalElements;
          if (res.data?.content) {
            this.asyncData = res.data.content.map((item) => {
              item.role == '1' && (item.role = 'Quản trị');
              item.role == '0' && (item.role = 'Bạn đọc');
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
