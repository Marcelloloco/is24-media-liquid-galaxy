import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SEARCH_SERVER_IP, SEARCH_SERVER_PORT} from "../constants";

@Injectable()
export class ExposeService {

    constructor(private http: HttpClient) {
    }

    public get(exposeId: string) {
        return this.http.get(`http://${SEARCH_SERVER_IP}:${SEARCH_SERVER_PORT}/expose/${exposeId}`);
    }
}
