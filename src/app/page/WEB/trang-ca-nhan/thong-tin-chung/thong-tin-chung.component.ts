import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/model';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-thong-tin-chung',
  templateUrl: './thong-tin-chung.component.html',
  styleUrls: ['./thong-tin-chung.component.css']
})
export class ThongTinChungComponent implements OnInit{
  currentUser: any;
  userDetail: User = new User();

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private userService : UserServicesService
  ){}

  detailForm = this.formBuilder.group({
    userName: new FormControl(),
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
      this.userDetail = item;
      console.log(this.userDetail);
    })
  }
}
