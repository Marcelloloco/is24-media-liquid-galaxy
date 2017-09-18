import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from './config'

@Injectable()
export class StreetViewService {

  constructor(private http: HttpClient) {}

  public openStreetView(longitude: number, latitude: number) {

    this.http.get(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${latitude},${longitude}&key=${config.streetViewImageApiKey}`)
    .subscribe(res => {
      console.log(`received ${JSON.stringify(res)} when accessing pano view.`);
      const panoId = res["pano_id"];
    });
  }

}
