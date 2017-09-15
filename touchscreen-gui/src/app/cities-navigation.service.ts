import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {City} from './city';
import {SERVER_IP} from './constants';

@Injectable()
export class CitiesNavigationService {

  constructor(private http: HttpClient) { }

  public navigate(city: City) {
    const params = new HttpParams()
      .set('query', this.generateFlytoString(city))
      .set('name', 'whatever');

    this.http.get(`http://${SERVER_IP}:81/change.php`, {params: params}).subscribe(response => {
      console.log(response);
    });
  }

  private generateFlytoString(city: City) {
    let longitude: Number, latitude: Number;

    switch (city) {
      case City.Cologne: {
        longitude = 6.957133;
        latitude = 50.941395;
        break;
      }
      case City.Berlin: {
        longitude = 13.4032056;
        latitude = 52.5108012;
        break;
      }
      case City.Munich: {
        longitude = 11.572137;
        latitude = 48.1301315;
        break;
      }
      case City.Frankfurt: {
        longitude = 8.6830061;
        latitude = 50.0987462;
        break;
      }
      case City.Hamburg: {
        longitude = 9.9928286;
        latitude = 53.5510542;
      }
    }

    return `flytoview=<LookAt><longitude>${longitude}</longitude><latitude>${latitude}</latitude><altitude>0</altitude><heading>49.000000</heading><tilt>62.000000</tilt><range>374</range><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>`;

  }

}
