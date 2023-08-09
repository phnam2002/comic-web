import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { BasePagingResponse, BaseResponse, Comic, PagesRequest, User, UserRequest } from 'src/app/model/model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private baseUrl = environment.urlServer + '/user';
  constructor(private http: HttpClient,
    private fireStorage: AngularFireStorage) { }


  searchPaging(page: PagesRequest, user: User): Observable<BasePagingResponse<User>> {
    let params = new HttpParams();

    if (page.sort) params = params.set('sort', page.sort);
    if (page.curentPage) params = params.set('page', page.curentPage - 1);
    if (page.size) params = params.set('size', page.size);

    if (user.username) params = params.set('username', user.username);
    if (user.role) params = params.set('role', user.role);
    if (user.fullName) params = params.set('fullName', user.fullName);
    console.log(params)
    return this.http.get<BasePagingResponse<User>>(this.baseUrl, {
      params,
    });
  }

  create(user : UserRequest): Observable<BaseResponse<UserRequest>> {
    return this.http.post<BaseResponse<UserRequest>>(this.baseUrl+'/add', user);
  }

  delete(id : any): Observable<BaseResponse<User>> {
    return this.http.delete<BaseResponse<User>>(this.baseUrl+ '/' + id);
  }

  update(user : User): Observable<BaseResponse<User>> {
    return this.http.put<BaseResponse<User>>(this.baseUrl+ '/', user);
  }

  getDetail(id: any): Observable<BaseResponse<User>> {
    return this.http.get<BaseResponse<User>>(this.baseUrl + '/' + id);
  }

  getDetail1(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/detail/' + id);
  }
}
