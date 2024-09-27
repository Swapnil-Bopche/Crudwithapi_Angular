import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User_ } from '../user_interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_url: string = 'http://localhost:4200/api/user';

  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<User_[]> {
    return this._http.get<User_[]>(`${this.BASE_url}`);
  }

  addUser(Payload: User_) {
    return this._http.post(`${this.BASE_url}`, Payload)
  };

  getUser(userid: number): Observable<User_> {
    return this._http.get<User_>(`${this.BASE_url}/${userid}`)
  }

  updateUser(Payload: User_) {
    return this._http.put(`${this.BASE_url}/${Payload.id}`, Payload);
  }

  deleteUser(userid: number): Observable<User_> {
    return this._http.delete<User_>(`${this.BASE_url}/${userid}`)
  }
}
