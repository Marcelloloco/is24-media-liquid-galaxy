import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_IP, SERVER_PORT} from './constants';
import {Observable} from 'rxjs/Observable';
import {Property} from './property';

@Injectable()
export class PropertiesListService {

  constructor(private http: HttpClient) {}

  public getCurrentProperties(): Observable<Property[]> {
    return this.http.get(`http://${SERVER_IP}:${SERVER_PORT}/last-search`)
      .map((res: Response) => res['results'])
      .catch(err => []);
  }

}
