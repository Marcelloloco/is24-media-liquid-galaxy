import {Injectable} from '@angular/core';
import {SAMPLE_EXPOSE} from './expose';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ExposeService {

    constructor(private http: HttpClient) {
    }

    public get(exposeId: string) {
        return Observable.of(SAMPLE_EXPOSE).delay(3000);
        // const params = new HttpParams()
        //   .set('exposeId', exposeId)

        // this.http.get(`http://${SERVER_IP}:88/search-enable`, {params: params})
        //   .subscribe(res => {
        //     this.http.post(`http://${SERVER_IP}:82/kmls`, {uri: 'http://lg1:81/is24-lg-slave.kml'})
        //       .subscribe();
        //   });

    }

}
