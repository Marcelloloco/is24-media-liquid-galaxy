import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from './config'
import {LG_SERVER_IP} from "./constants";

@Injectable()
export class StreetViewService {

  constructor(private http: HttpClient) {
  }

  public openStreetView(longitude: number, latitude: number) {
    return new Promise((resolve, reject) => {

      this.http.get(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${latitude},${longitude}&key=${config.streetViewImageApiKey}`)
      .subscribe(res => {
        const panoId = res['pano_id'];
        if (panoId) {
          const requestUrl = `http://${LG_SERVER_IP}:81/change.php?query=peruse-${panoId}`;
          this.http.get(requestUrl);
          resolve();
        } else {
          console.log(`Street view is not available`);
          reject();
        }
      });
    })

  }

  public closeStreetView() {
    return new Promise((resolve) => {
      return this.http.get(`http://${LG_SERVER_IP}:81/change.php?query=peruse-off`)
      .subscribe(() => {
        resolve();
      });
    });
  }

}
