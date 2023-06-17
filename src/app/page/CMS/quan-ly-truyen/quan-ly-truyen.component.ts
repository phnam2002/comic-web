import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { Comic } from 'src/app/model/model';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-quan-ly-truyen',
  templateUrl: './quan-ly-truyen.component.html',
  styleUrls: ['./quan-ly-truyen.component.css']
})
export class QuanLyTruyenComponent {
  public selectedFiles: File[] = [];
  comicDetail: Comic = new Comic();
  imagePath: any = ``;
  file: any;
  image: any = ``;
  imageUrl$: Observable<string> | undefined;

  constructor(
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
    private fireStorage: AngularFireStorage
  ) { }

  detailForm = this.formBuilder.group({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    status: new FormControl('', [Validators.required]),
    publishedAt: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    // this.imageUrl$ = this.comicService.getImageUrl(this.imagePath);
    // this.getDetail(3);
  }

  create() {
    try {
      this.comicDetail.image = this.imagePath;
      console.log(this.comicDetail)
      // if (this.detailForm.status == 'INVALID') {
      //   this.focusInValidForm()
      //   return;
      // } else if (this.detailForm.status == 'PENDING') {
      //   this.toastrs.warning('Hệ thống đang xử lý! Vui lòng đợi');
      //   return;
      // } else {
      this.comicService
        .create(this.comicDetail, this.selectedFiles)
        .subscribe((res) => {
          if (FwError.THANHCONG == res.errorCode) {
            if (res.data) {
              this.comicDetail = res.data;
              // this.toastrs.success("Thành công");
            }
            // this._location.back();
          } else {
            // this.toastrs.error(res.errorMessage);
          }
        });

    } catch (error) {
      console.log("Error uploading file: ", error);
      // Các xử lý khác khi xảy ra lỗi
    }
  }

  // getDetail(id: any) {
  //   // getDetail() {
  //   this.selectedFiles = []
  //   this.comicService
  //     .getDetail(id)
  //     .subscribe((res) => {
  //       if (FwError.THANHCONG == res.errorCode) {
  //         if (res.data) {
  //           this.comicDetail = res.data;
  //           console.log(this.comicDetail)
  //           // this.comicDetail.status == '1' &&
  //           //   (this.comicDetail.status = '1');
  //           // this.comicDetail.status == '0' && (res.data.status = '0');
  //         }
  //       } else {
  //         // this.toastrs.error(res.errorMessage);
  //       }
  //     });
  // }


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
