import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_IP, SERVER_PORT} from "../constants";
import {City} from "../city";

@Injectable()
export class SearchPersistenceService {
    city = City.Berlin;
    isRent = true;
    price = 800;
    space = 70;

    constructor() {
    }

    public setSearchParameters(city, isRent, price, space) {
        this.city = city;
        this.isRent = isRent;
        this.price = price;
        this.space = space;
    }

    public getSearchParameters() {
        return { city: this.city, isRent: this.isRent, price: this.price, space: this.space };
    }

}
