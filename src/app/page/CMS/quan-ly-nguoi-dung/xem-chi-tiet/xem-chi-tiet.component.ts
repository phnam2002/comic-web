import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PagesRequest, User } from 'src/app/model/model';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-xem-chi-tiet',
  templateUrl: './xem-chi-tiet.component.html',
  styleUrls: ['./xem-chi-tiet.component.css']
})
export class XemChiTietComponent implements OnInit{
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
  id: any;
  constructor(
    public formBuilder: FormBuilder,
    public userServices: UserServicesService,
    
    private route: ActivatedRoute,
  ) {
  }

  searchForm = this.formBuilder.group({
    userName: new FormControl('')
  });

  detailForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    fullName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
      console.log(this.id)
    });
    this.getDetail(this.id);
    console.log(this.userDetail.username);

  }

  getDetail(id: any) {
    this.userServices
      .getDetail(id)
      .subscribe((res) => {
        if (res.data){
          console.log(res.data.username);

          this.userDetail = res.data;
        }

      });
      console.log(this.userDetail.username);
  }
}
