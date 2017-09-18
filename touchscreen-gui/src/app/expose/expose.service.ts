import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_IP} from "../constants";

@Injectable()
export class ExposeService {

    constructor(private http: HttpClient) {
    }

    public get(exposeId: string) {
        return this.http.get(`http://${SERVER_IP}:88/expose/${exposeId}`);
    }
}
