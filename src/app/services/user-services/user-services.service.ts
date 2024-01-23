import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { TypeComic, User } from 'src/app/model/model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private baseUrl = environment.urlServer + '/user';
  constructor(private http: HttpClient,
    private fireStorage: AngularFireStorage) { }


  getDetail(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/detail/' +  id);
  }
}
