import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Comic, BaseResponse, PagesRequest, BasePagingResponse, BaseResponse1, NgParam } from 'src/app/model/model';
import { environment } from 'src/environment/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FwError } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class ComicServicesService {

  private baseUrl = environment.urlServer + '/comic';
  constructor(private http: HttpClient,
    private fireStorage: AngularFireStorage) { }

  create(comic: Comic,files : any): Observable<BaseResponse<Comic>> {

    var formData = new FormData();
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
    
    if(page.sort) params = params.set('sort', page.sort);
    if (page.curentPage) params = params.set('page', page.curentPage - 1);
    if (page.size) params = params.set('size', page.size);

    if (comic.name) params = params.set('name', comic.name);
    if (comic.status) params = params.set('status', comic.status);
    if (comic.type) params = params.set('type', comic.type);
    console.log(params)
    return this.http.get<BasePagingResponse<Comic>>(this.baseUrl, {
      params,
    });
  }

  searchMostView(): Observable<BaseResponse1<Comic>> {
    return this.http.get<BaseResponse1<Comic>>(this.baseUrl + '/searchMost' )
  }

  searchSlect2(turn: string | null, customparam: NgParam[]){
    let params = new HttpParams();
    params = params.set('sort', 'desc');
    params = params.set('page', 0);
    params = params.set('size', 20);

    if (turn) {
      params = params.set('name', turn);
    }
    if (customparam) {
      customparam.forEach((item) => {
        if (item && item.key && item.value) {
          params = params.set(item.key, item.value);
        }
      });
    }

    return this.http
    .get<Comic[]>(this.baseUrl + '/search-select2', {
      params,
    })
    .pipe(
      map((res: any) => {
        if (FwError.THANHCONG == res.errorCode) {
          return res.data.content.map((item: any) => {
            item.label = item.name;
            item.track = item.name;
            return item;
          });
        } else {
          console.log(res.errorMessage);
        }
      }),
      catchError(() => of([]))
    );
  }
}
