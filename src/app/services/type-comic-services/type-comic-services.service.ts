import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { BaseResponse, Comic, BaseResponse1, TypeComic } from 'src/app/model/model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeComicServicesService {

  
  private baseUrl = environment.urlServer + '/typeComic';
  constructor(private http: HttpClient,
    private fireStorage: AngularFireStorage) { }


  getDetail(id: any): Observable<TypeComic> {
    return this.http.get<TypeComic>(this.baseUrl + '/' +  id);
  }

  searchAll(): Observable<TypeComic> {
    return this.http.get<TypeComic>(this.baseUrl + '/searchMost' )
  }
}
