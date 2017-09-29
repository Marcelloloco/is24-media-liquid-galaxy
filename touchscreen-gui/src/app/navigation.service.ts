import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {City} from './city';
import {LG_SERVER_IP} from './constants';

@Injectable()
export class NavigationService {

  constructor(private http: HttpClient) { }

  public navigateToCity(city: City) {
    const [longitude, latitude, altitude, heading, tilt, range] = NavigationService.getCityCoordinates(city);

    this.navigate(longitude, latitude, altitude, heading, tilt, range);
  }

  public navigateToImmoScout() {
    this.navigate(13.43158897438021, 52.5121619221996, 19.03508785186355, 41.19475331649205, 80, 162.5619296413542);
  }

  public navigateToAutoScout() {
    this.navigate(11.6117158, 48.1327258, 19.03508785186355, 41.19475331649205, 80, 162.5619296413542);
  }

  public navigate(longitude: number, latitude: number, altitude = 0, heading = 49, tilt = 73, range = 800) {
	  let query = NavigationService.generateFlytoString(longitude, latitude, altitude, heading, tilt, range);
	  this.executeQueryOnServer(query);
  }

	private executeQueryOnServer(query: string) {
		const params = new HttpParams()
			.set('query', query)
			.set('name', 'whatever');
		this.callChangeOnServer(params);
	}
	public changePlanet(planet: string) {
		const params = new HttpParams()
			.set('planet', planet);
		this.callChangeOnServer(params);
	}

	private callChangeOnServer(params: HttpParams) {
		this.http.get(`http://${LG_SERVER_IP}:81/change.php`, {params: params}).subscribe(response => {
			console.log(response);
		});
	}

	public relaunchLG() {
  	    this.executeQueryOnServer("relaunch")
	}

	public rebootLG() {
  	    this.executeQueryOnServer("reboot")
	}
	private static getCityCoordinates(city: City) {
    let longitude, latitude, altitude, heading, tilt, range;

    switch (city) {
      case City.Cologne: {
        longitude = 6.95713836605103;
        latitude = 50.94096035129125;
        altitude = 4.325263592940122;
        heading = 45.75025455034856;
        tilt = 62.44090422096348;
        range = 431.8580189351539;
        break;
      }
      case City.Berlin: {
        longitude = 13.41054764032167;
        latitude = 52.52096378877162;
        altitude = 11.06393855146612;
        heading = 64.50924269857357;
        tilt = 69.22247346283616;
        range = 991.6556221498255;
        break;
      }
      case City.Munich: {
        longitude = 11.5754486004505;
        latitude = 48.13623913638575;
        altitude = 14.78513656920451;
        heading = -0.004868094893058572;
        tilt = 62.62738016652561;
        range = 746.2288443428296;
        break;
      }
      case City.Frankfurt: {
        longitude = 8.672226637532439;
        latitude = 50.10989318426203;
        altitude = 23.78395936329224;
        heading = 10.773222571673702;
        tilt = 65.70241887356603;
        range = 1180.363524908955;
        break;
      }
      case City.Hamburg: {
        longitude = 9.99400960055184;
        latitude = 53.55201361216928;
        altitude = 100;
        heading = -169.5822581855827;
        tilt = 75.22678891972156;
        range = 600.93209165143;
      }
    }

    return [longitude, latitude, altitude, heading, tilt, range];
  }

  private static generateFlytoString(longitude: number, latitude: number, altitude: number, heading: number, tilt: number, range: number) {
    return `flytoview=<LookAt><longitude>${longitude}</longitude><latitude>${latitude}</latitude><altitude>${altitude}</altitude><heading>${heading}</heading><tilt>${tilt}</tilt><range>${range}</range><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>`;
  }

}
