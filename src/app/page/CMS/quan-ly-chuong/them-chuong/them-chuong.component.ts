import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { ChapterResponse, Comic } from 'src/app/model/model';
import { ChapterServicesService } from 'src/app/services/chapter-services/chapter-services.service';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-them-chuong',
  templateUrl: './them-chuong.component.html',
  styleUrls: ['./them-chuong.component.css']
})
export class ThemChuongComponent {
  public selectedFiles: File[] = [];
  urls: Observable<String>[] = [];
  chapNumber = 1;
  chapterDetail: ChapterResponse = new ChapterResponse();
  comicDetail: Comic = new Comic();
  image: any = ``;

  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
    private chapterService: ChapterServicesService,
    private fireStorage: AngularFireStorage) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDetail(parseInt(id));
    }
    // this.imageUrl$ = this.comicService.getImageUrl(this.imagePath);
  }

  detailForm = this.formBuilder.group({
    chapNumber: new FormControl({disabled : true}, Validators.required),
    title: new FormControl(),
  });

  uploadFiles(): void {
    for (const file of this.selectedFiles) {
      const folderName = this.comicDetail.name + "/" + this.chapterDetail.chap;
      const filePath = `${folderName}/${file.name}`;
      const fileRef = this.fireStorage.ref(filePath);
      const task = this.fireStorage.upload(filePath, file);
      task.snapshotChanges().subscribe(
        (snapshot) => {
          // do something while the file is uploading
          if (snapshot) {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`File is ${percentage}% uploaded`);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // upload completed successfully
          console.log('Upload completed successfully');
        }
      );
    }
  }

  getDetail(id: any) {
    this.comicService
      .getDetail(id)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data) {
            this.comicDetail = res.data;
            if (this.comicDetail.chapter?.length) {
              if (this.comicDetail.chapter?.length > 0) {
                this.chapterDetail.chap = this.comicDetail.chapter?.length + 1;
              } 
            }else{
              console.log("abc");
              this.chapterDetail.chap = 1;
            }
          }
        } else {
          // this.toastrs.error(res.errorMessage);
        }
      });
  }

  create() {
    try {
      this.chapterDetail.contentPath = this.comicDetail.name + "/" + this.chapterDetail.chap;
      // this.chapterDetail.image = this.imagePath;
      console.log(this.comicDetail)
      this.chapterDetail.comic = this.comicDetail;
      // if (this.detailForm.status == 'INVALID') {
      //   this.focusInValidForm()
      //   return;
      // } else if (this.detailForm.status == 'PENDING') {
      //   this.toastrs.warning('Hệ thống đang xử lý! Vui lòng đợi');
      //   return;
      // } else {
      this.chapterService
        .create(this.chapterDetail)
        .subscribe((res) => {
          if (FwError.THANHCONG == res.errorCode) {
            this.uploadFiles();
            if (res.data) {
              this.chapterDetail = res.data;
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

  async onFileSelected(event: any) {

    if (event.target.files.length !== 0) {
      this.selectedFiles = event.target.files;
    }
    console.log(this.selectedFiles);

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (const file of this.selectedFiles) {
        this.image =  this.fileToImage(file);
        this.urls.push(this.image);
      }
    }
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
