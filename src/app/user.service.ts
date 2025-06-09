import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5287/api/Values';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
   return this.http.post(`${this.apiUrl}/submit`, user);

  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  loginUser(id: number | string, name: string): Observable<any> {
    // Build URL: apiUrl/login?id=xxx&name=yyy
    const url = `${this.apiUrl}/login?id=${id}&name=${encodeURIComponent(name)}`;
    return this.http.get<any>(url);

}


}