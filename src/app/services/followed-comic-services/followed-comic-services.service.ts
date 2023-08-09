import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map, catchError, of } from 'rxjs';
import { FwError } from 'src/app/common/constants';
import { Comic, BaseResponse, PagesRequest, BasePagingResponse, BaseResponse1, NgParam, FollowedComic } from 'src/app/model/model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowedComicServicesService {

  private baseUrl = environment.urlServer + '/follow-comic';
  constructor(private http: HttpClient) { }

  create(followedComic: FollowedComic): Observable<BaseResponse<FollowedComic>> {
    return this.http.post<BaseResponse<FollowedComic>>(this.baseUrl + '/add', followedComic);
  }

  getDetailByUserId(userId: any): Observable<BaseResponse<FollowedComic>> {
    return this.http.get<BaseResponse<FollowedComic>>(this.baseUrl + '/' + userId);
  }

  searchDetail(userId: any, comicId: any): Observable<BaseResponse<FollowedComic>> {
    let params = new HttpParams();
    params = params.set('userId', userId);
    params = params.set('comicId', comicId);
    return this.http.get<BaseResponse<FollowedComic>>(this.baseUrl + '/search', {
      params,
    });
  }

  delete(id: any): Observable<BaseResponse<FollowedComic>> {
    return this.http.delete<BaseResponse<FollowedComic>>(this.baseUrl + '/' + id);
  }

}
