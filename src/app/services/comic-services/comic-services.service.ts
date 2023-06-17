import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic, BaseResponse, PagesRequest, BasePagingResponse, BaseResponse1 } from 'src/app/model/model';
import { environment } from 'src/environment/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ComicServicesService {

  private baseUrl = environment.urlServer + '/comic';
  constructor(private http: HttpClient,
    private fireStorage: AngularFireStorage) { }

  create(comic: Comic,files : any): Observable<BaseResponse<Comic>> {

    var formData = new FormData();
    console.log(files)
    if (files.length > 0) {
     for (const row of files) {
       formData.append('file', row);
     }
    }
    formData.append('data', 
      new Blob(
        [JSON.stringify(comic)],
        {
          type: "application/json"
        })
    );
    return this.http.post<BaseResponse<Comic>>(this.baseUrl + '/add', formData);
  }

  getDetail(id: any): Observable<BaseResponse<Comic>> {
    return this.http.get<BaseResponse<Comic>>(this.baseUrl + '/' +  id);
  }

  searchPaging(page: PagesRequest,comic: Comic): Observable<BasePagingResponse<Comic>> {
    let params = new HttpParams();
    params = params.set('sort', 'desc');
    if (page.curentPage) params = params.set('page', page.curentPage - 1);
    if (page.size) params = params.set('size', page.size);

    if (comic.name) params = params.set('name', comic.name);
    if (comic.status) params = params.set('status', comic.status);
    console.log(params)
    return this.http.get<BasePagingResponse<Comic>>(this.baseUrl, {
      params,
    });
  }

  searchMostView(): Observable<BaseResponse1<Comic>> {
    return this.http.get<BaseResponse1<Comic>>(this.baseUrl + '/searchMost' )
  }
}
