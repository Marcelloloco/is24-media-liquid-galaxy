import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from './config'
import {LG_SERVER_IP} from "./constants";

@Injectable()
export class StreetViewService {

  constructor(private http: HttpClient) {
  }

  public getPanoId(longitude: number, latitude: number) {
    return new Promise((resolve, reject) => {
      // resolve();
      this.http.get(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${latitude},${longitude}&key=${config.streetViewImageApiKey}`)
      .subscribe(res => {
        console.log(`received response! ${JSON.stringify(res)}`);
        const panoId = res['pano_id'];
        if (panoId) {
          console.log(`resolve with pano id. ${panoId}`);
          resolve(panoId);
        } else {
          resolve();
        }
      });
    })
  }

  public openStreetView(panoId: string) {
    return new Promise((resolve, reject) => {
      const requestUrl = `http://${LG_SERVER_IP}:81/change.php?query=peruse-${panoId}`;
      this.http.get(requestUrl).subscribe(() => {
        resolve();
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
