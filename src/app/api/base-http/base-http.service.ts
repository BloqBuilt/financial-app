import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseHttpService {
  constructor(private http: Http) {}

  getData() {
    return this.http.get('');
  }

  postData(body) {
    return this.http.post('', body);
  }

  deleteData(deleteKeys: string) {
    return this.http.delete('');
  }
}
