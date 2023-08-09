import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DefaultImage } from 'src/app/common/constants';
import { User } from 'src/app/model/model';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-trang-ca-nhan',
  templateUrl: './trang-ca-nhan.component.html',
  styleUrls: ['./trang-ca-nhan.component.css']
})
export class TrangCaNhanComponent implements OnInit{
  currentUser: any;
  userDetail: User = new User();
  image = DefaultImage;
  action:any;

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private userService : UserServicesService
  ){
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    this.getDetail(this.currentUser.id);
  }

  getDetail(id : any){
    this.userService.getDetail(id).subscribe((item) => {
      if(item.data)
      this.userDetail = item.data;
      console.log(this.userDetail);
    })
  }

}
