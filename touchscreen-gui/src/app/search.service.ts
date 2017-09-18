import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LG_SERVER_IP, SEARCH_SERVER_IP, SEARCH_SERVER_PORT} from './constants';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  public search(isRent: boolean, maxPrice: number, minArea: number) {
    const params = new HttpParams()
      .set('realEstateType', isRent ? 'ApartmentRent' : 'ApartmentBuy')
      .set('maxPrice', maxPrice.toString())
      .set('minArea', minArea.toString());

    this.http.get(`http://${SEARCH_SERVER_IP}:${SEARCH_SERVER_PORT}/search-enable`, {params: params})
      .subscribe(res => {
        this.http.post(`http://${LG_SERVER_IP}:82/kmls`, {uri: 'http://lg1:81/is24-lg-slave.kml'})
          .subscribe();
      });
  }

}
