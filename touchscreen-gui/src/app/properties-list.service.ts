import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SERVER_IP} from './constants';
import {Observable} from 'rxjs/Observable';
import {Property} from './property';

@Injectable()
export class PropertiesListService {

  constructor(private http: HttpClient) {}

  public getCurrentProperties(): Observable<Property[]> {
    return this.http.get(`http://${SERVER_IP}:88/last-search`)
      .map((res: Response) => res['results'])
      .catch(err => []);
  }

}
