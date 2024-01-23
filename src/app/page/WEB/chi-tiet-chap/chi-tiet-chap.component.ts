import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { ChapterResponse, ChapterSearchRequest, Comic } from 'src/app/model/model';
import { ChapterServicesService } from 'src/app/services/chapter-services/chapter-services.service';
import { ComicServicesService } from 'src/app/services/comic-services/comic-services.service';

@Component({
  selector: 'app-chi-tiet-chap',
  templateUrl: './chi-tiet-chap.component.html',
  styleUrls: ['./chi-tiet-chap.component.css']
})
export class ChiTietChapComponent implements OnInit{
  chapterDetail: ChapterResponse = new ChapterResponse();
  chapterDetailSearch: ChapterSearchRequest = new ChapterSearchRequest();
  comicDetail: Comic = new Comic();
  image: any = ``;
  filelist: any[];
  urls: Observable<String>[] = [];
  chapterSearchResponse: ChapterResponse[];
  items$: Observable<any> = of([]);

  items = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'Option 5' }
  ];

  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];

  selectedItem: any;
  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private comicService: ComicServicesService,
    private chapterService: ChapterServicesService,
    private fireStorage: AngularFireStorage,

  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getDetail(id);
  }

  searchForm = this.formBuilder.group({
    chap: new FormControl(''),
    comic: new FormControl(''),
  });


  loadData() {
    console.log("request");
    console.log(this.chapterDetailSearch);
    this.chapterService
      .searchSlect2(this.chapterDetailSearch).subscribe(item => {
        this.chapterSearchResponse = item;
      })
    console.log(this.chapterSearchResponse);
  }

  getDetail(id: any) {
    this.chapterService
      .getDetail(id)
      .subscribe((res) => {
        if (FwError.THANHCONG == res.errorCode) {
          if (res.data) {
            this.chapterDetail = res.data;
            console.log("detail");
            console.log(this.chapterDetail);
            this.getFolderSize();
            this.chapterDetailSearch.comic = this.chapterDetail.comic;
            this.chapterDetailSearch.id = this.chapterDetail.id;
          }
        } else {
          // this.toastrs.error(res.errorMessage);
        }
      });
  }

  async getFolderSize() {
    if (this.chapterDetail.contentPath) {
      const ref = this.fireStorage.ref(this.chapterDetail.contentPath);
      ref.listAll().subscribe(res => {
        this.filelist = res.items;
        res.items.forEach(item => {
          const imageF = this.chapterService.getImageUrl(item.fullPath);
          this.urls.push(imageF);
        })
      });
    }
  }
}
