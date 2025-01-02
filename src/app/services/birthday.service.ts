import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BirthdayService {
  constructor(private http: HttpClient) {}

  getBirthdays() {
    return this.http.get(`${environment.apiUrl}/birthdays`);
  }

  getBirthdayById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/birthdays/${id}`);
  }

  addBirthday(birthday: any) {
    return this.http.post(`${environment.apiUrl}/birthdays`, birthday);
  }

  updateBirthday(id: string, birthday: any) {
    return this.http.put(`${environment.apiUrl}/birthdays/${id}`, birthday);
  }

  deleteBirthday(id: string) {
    return this.http.delete(`${environment.apiUrl}/birthdays/${id}`);
  }
}
