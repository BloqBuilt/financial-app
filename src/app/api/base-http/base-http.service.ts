import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BaseHttpService {
  constructor(private http: Http) {}

}
