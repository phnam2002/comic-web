import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PagesRequest, User, UserRequest } from "src/app/model/model";
import { UserServicesService } from "src/app/services/user-services/user-services.service";

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.css']
})
export class ThemMoiComponent implements OnInit{
  userDetail: UserRequest = new UserRequest();
  constructor(
    public formBuilder: FormBuilder,
    public userServices: UserServicesService,
    private el: ElementRef,
    private route: ActivatedRoute,
  ) {
  }

  isSubmit = false;

  detailForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    gmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fullName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

  }


  focusInValidForm() {
    let invalidElements = this.el.nativeElement.querySelectorAll(
      'textarea.form-control.ng-invalid, input.form-control.ng-invalid, datepicker.form-control.ng-invalid input'
    );
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    }
  }

  submit(): void {
    console.log(this.detailForm);
    // Process checkout data here
    this.isSubmit = true
    if (this.detailForm.status == 'INVALID') {
      this.focusInValidForm()
      return;
    }
    else {
      this.userServices.create(this.userDetail).subscribe((res)=>{
        if(res.errorCode == 'THANHCONG'){
          alert("Đăng ký tài khoản thành công !");
        }
      })
    }
  }
}
