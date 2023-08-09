import { Component, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { Comic } from 'src/app/model/model';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-them-truyen',
  templateUrl: './them-truyen.component.html',
  styleUrls: ['./them-truyen.component.css']
})
export class ThemTruyenComponent {
  public selectedFiles: File[] = [];
  comicDetail: Comic = new Comic();
  imagePath: any = ``;
  file: any;
  image: any = ``;
  imageUrl$: Observable<string> | undefined;
  isSubmit = false;

  constructor(
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
    private el: ElementRef,
  ) { }

  detailForm = this.formBuilder.group({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    imagePath: new FormControl('', ),
    publishedAt: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    // this.imageUrl$ = this.comicService.getImageUrl(this.imagePath);
    // this.getDetail(3);
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
    this.isSubmit = true
    this.comicDetail.status = '0';
    if (this.detailForm.status == 'INVALID') {
      this.focusInValidForm()
      return;
    }
    else {
      console.log("abc");
      try {
        this.comicDetail.image = this.imagePath;
        console.log(this.comicDetail)
        this.comicService
          .create(this.comicDetail, this.selectedFiles)
          .subscribe((res) => {
            if (FwError.THANHCONG == res.errorCode) {
              if (res.data) {
                this.comicDetail = res.data;
              }
            } 
          });
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  }


  async onFileSelected(event: any) {

    if (event.target.files.length !== 0) {
      this.selectedFiles = event.target.files;
    }
    console.log(this.selectedFiles)
    if (this.selectedFiles && this.selectedFiles.length > 0)
      this.fileToImage(this.selectedFiles[0]).then(item => this.image = item)
  }



  fileToImage(file: any) {
    //  const byteArray = new Int8Array(new ArrayBuffer(this.productDetail.image));
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.readAsDataURL(file);
      reader.onerror = error => reject(error);
    });
  }
}
