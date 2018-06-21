import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseHttpService {
  serverPort = 4000;

  constructor(private http: Http) {}

  getData(url: string) {
    return this.http.get(`:${this.serverPort}/api/${url}`);
  }

  postData(url: string, body) {
    return this.http.post(`:${this.serverPort}/api/${url}`, body);
  }

  deleteData(deleteKeys: string) {
    return this.http.delete('');
  }
}
