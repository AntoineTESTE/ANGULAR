import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  baseUrl = 'http://localhost:8000';

  constructor(private http: Http) { }

  findAnimals() {
    return this.http.get(`${this.baseUrl}/animals`)
      .map(this.extractData);
  }

  removeAnimal(id: string) {
    return this.http.delete(`${this.baseUrl}/animals/${id}`);
  }

  private extractData(res: Response) {
    return res.json();
  }
}
