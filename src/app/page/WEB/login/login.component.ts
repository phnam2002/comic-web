import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginRequest, User, UserRequest } from 'src/app/model/model';
import { AuthServicesService } from 'src/app/services/auth-services/auth-services.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmit = false;
  loginRequest: LoginRequest = new LoginRequest();
  userDetail: UserRequest = new UserRequest();
  homeUrl = '/';

  loginForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  registerForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    gmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });

  action: any;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private authService: AuthServicesService,
    private userService: UserServicesService,
  ) {
    this.route.queryParams.subscribe(param => {
      this.action = param['action'];
      console.log(param['action']);
    });
    this.isSubmit = false;
  }

  ngOnInit() {
  }

  focusInValidForm() {
    let invalidElements = this.el.nativeElement.querySelectorAll(
      'textarea.form-control.ng-invalid, input.form-control.ng-invalid, datepicker.form-control.ng-invalid input'
    );
    if (invalidElements.length > 0) {
      invalidElements[0].focus();
    }
  }

  onSubmit(): void {
    console.log(this.loginForm);
    // Process checkout data here
    this.isSubmit = true
    if (this.loginForm.status == 'INVALID') {
      this.focusInValidForm()
      return;
    }
    else {
      this.authService.login(this.loginRequest).subscribe(
        loginResponse => {

          if (loginResponse.status == true) {
            // this.router.navigate([this.homeUrl]);
            window.location.replace(this.homeUrl);

          } else {
            // this.toastrs.error(loginResponse.errorMessage);
          }
        });
    }
  }

  submit(): void {
    console.log(this.registerForm);
    // Process checkout data here
    this.isSubmit = true
    if (this.registerForm.status == 'INVALID') {
      this.focusInValidForm()
      return;
    }
    else {
      console.log("abc");
      this.userDetail.role = '0';
      this.userService.create(this.userDetail).subscribe((res)=>{
        if(res.errorCode == 'THANHCONG'){
          alert("Đăng ký tài khoản thành công !");
        }
      })
    }
  }
}
