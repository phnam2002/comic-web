import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from 'src/app/model/model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private url = environment.urlServer + '/user';
  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + '/login', loginRequest).pipe(
      tap((loginResponse) => {
        if (loginResponse.status == true) {
          localStorage.setItem('currentUser', JSON.stringify(loginResponse));
        }else{
          alert(loginResponse.message);
        }
      })
    );
  }

  getAuthorization() {
    let user = localStorage.getItem('currentUser');
    if (user) return JSON.parse(user);
  }
}
