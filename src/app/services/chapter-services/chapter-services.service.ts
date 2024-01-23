import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { ChapterResponse, BaseResponse, ChapterSearchRequest, BasePagingResponse, Chapter, PagesRequest } from 'src/app/model/model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterServicesService {

  private baseUrl = environment.urlServer + '/chapter';
  constructor(private http: HttpClient,
    private fireStorage: AngularFireStorage) { }

  create(chapter: ChapterResponse): Observable<BaseResponse<ChapterResponse>> {
    return this.http.post<BaseResponse<ChapterResponse>>(this.baseUrl + '/add', chapter);
  }

  getDetail(id: any): Observable<BaseResponse<ChapterResponse>> {
    return this.http.get<BaseResponse<ChapterResponse>>(this.baseUrl + '/' + id);
  }

  getImageUrl(path: string): Observable<string> {
    // console.log(path);
    const ref = this.fireStorage.ref(path);
    return ref.getDownloadURL();
  }

  getDetailChap(chapter : ChapterSearchRequest): Observable<BaseResponse<ChapterResponse>> {
    return this.http.post<BaseResponse<ChapterResponse>>(this.baseUrl + '/search', chapter);
  }  
  
  searchSlect2(chapter : ChapterSearchRequest): Observable<BaseResponse<ChapterResponse[]>> {
    return this.http.post<BaseResponse<ChapterResponse[]>>(this.baseUrl + '/search', chapter);
  }

  searchPaging(page: PagesRequest,chapter: Chapter): Observable<BasePagingResponse<ChapterResponse>> {
    let params = new HttpParams();
    params = params.set('sort', 'desc');
    if (page.curentPage) params = params.set('page', page.curentPage - 1);
    if (page.size) params = params.set('size', page.size);

    // if (chapter.comic.id) params = params.set('comic', chapter.comic.id);
    // if (chapter.status) params = params.set('status', chapter.status);
    console.log(params)
    return this.http.get<BasePagingResponse<ChapterResponse>>(this.baseUrl, {
      params,
    });
  }
}
