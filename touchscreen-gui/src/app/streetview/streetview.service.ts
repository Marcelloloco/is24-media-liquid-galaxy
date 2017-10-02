import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config'
import {LG_SERVER_IP} from "../constants";
import {Property} from "../search/property";

@Injectable()
export class StreetviewService {
	private static panoIdCache: Object = {};

  constructor(private http: HttpClient) {
  }

  public getPanoId(prop: any) {
    return new Promise<string>((resolve, reject) => {
      // resolve();
	    if (!StreetviewService.panoIdCache[prop.id]) {
		    this.http.get(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${prop.address.street} ${prop.address.houseNumber} ${prop.address.postcode} ${prop.address.city}&key=${config.streetViewImageApiKey}`)
			    .subscribe(res => {
				    const panoId = res['pano_id'];
				    if (panoId) {
					    console.log(`resolve with pano id. ${panoId}`);
					    StreetviewService.panoIdCache[prop.id] = panoId;
					    resolve(panoId);
				    } else {
					    resolve();
				    }
			    });
	    } else {
	    	resolve(StreetviewService.panoIdCache[prop.id]);
	    }
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
