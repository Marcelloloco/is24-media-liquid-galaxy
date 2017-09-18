import {Component, OnDestroy} from '@angular/core';
import {MdSliderChange} from '@angular/material';
import {City} from '../city';
import {NavigationService} from '../navigation.service';
import {Observable} from 'rxjs/Rx';
import {PropertiesListService} from '../properties-list.service';
import {Property} from '../property';
import {SearchService} from '../search.service';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnDestroy {

    cities = City;
    city = City.Berlin;
    isRent = true;
    price = 800;
    space = 70;

    properties: Property[] = [];
    pollingInterval:Subscription;

    constructor(private navigationService: NavigationService,
                private propertiesListService: PropertiesListService,
                private searchService: SearchService) {
        this.startPollingProperties(propertiesListService);
    }
    ngOnDestroy(): void {
        this.stopPolling();
    }
    private stopPolling(){
        this.pollingInterval.unsubscribe();
    }
    private startPollingProperties(propertiesListService: PropertiesListService) {
        this.pollingInterval = Observable.interval(100)
        .switchMap(() => propertiesListService.getCurrentProperties())
        .subscribe((data) => {
            if (JSON.stringify(data) !== JSON.stringify(this.properties)) {
                this.properties = data;
            }
        });
    }

    public cityChanged(city: City) {
        this.city = city;
        this.navigationService.navigateToCity(this.city);
    }

    public spaceChanged(event: MdSliderChange) {
        this.space = event.value;
    }

    public priceChanged(event: MdSliderChange) {
        this.price = event.value;
    }

    public typeChanged(isRent: boolean) {
        this.isRent = isRent;
        if (isRent) {
            this.price = 2000;
        } else {
            this.price = 100000;
        }
    }

    public search() {
        this.searchService.search(this.isRent, this.price, this.space);
    }

    public propertyExpanded(property: Property) {
        const coordinates = property.address.wgs84Coordinate;

        this.navigationService.navigate(coordinates.longitude, coordinates.latitude);
    }

    public easterEgg() {
        this.city = City.Berlin;
        this.navigationService.navigateToImmoScout();
    }

}
