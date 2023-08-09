import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: ['./thong-tin-ca-nhan.component.css']
})
export class ThongTinCaNhanComponent implements OnInit{
  currentUser: any;
  userDetail: User = new User();

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private userService : UserServicesService,
    private router: Router,
  ){}

  detailForm = this.formBuilder.group({
    username: new FormControl(),
    fullName: new FormControl(),
    birthday: new FormControl(),
    phoneNumber: new FormControl(),
    role: new FormControl(),
  });

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

  update(){
    this.userService.update(this.userDetail).subscribe((res) =>{
      if (res.data)
      this.userDetail = res.data;
    })
    this.goBack();
  }

  goBack(){
    this.router.navigate(['trang-ca-nhan/thong-tin-chung']);
  }
}
