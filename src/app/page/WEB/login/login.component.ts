import { Component , ElementRef} from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginRequest } from 'src/app/model/model';
import { AuthServicesService } from 'src/app/services/auth-services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSubmit = false;
  loginRequest: LoginRequest = new LoginRequest();
  homeUrl = '/';
  loginForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private el: ElementRef,
    // private toastrs: ToastrService,
     private authService: AuthServicesService
  ) { }
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
    // else if (this.loginForm.status == 'PENDING') {
    //   this.toastrs.warning('Hệ thống đang xử lý! Vui lòng đợi');
    //   return;
    // } 
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
}
