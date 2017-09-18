import {Component, OnDestroy} from '@angular/core';
import {MdSliderChange} from '@angular/material';
import {City} from '../city';
import {NavigationService} from '../navigation.service';
import {Observable} from 'rxjs/Rx';
import {PropertiesListService} from '../properties-list.service';
import {Property} from '../property';
import {SearchService} from '../search.service';
import {Subscription} from "rxjs/Subscription";
import {StreetViewService} from "../street-view.service";
import {SearchPersistenceService} from "./searchPersistence.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnDestroy {

  cities = City;
  city: City;
  isRent: boolean;
  price: number;
  space: number;
  isInStreetView: boolean;

  properties: Property[] = [];
  pollingInterval: Subscription;

  constructor(private navigationService: NavigationService,
              private propertiesListService: PropertiesListService,
              private searchService: SearchService,
              private streetViewService: StreetViewService,
              private searchPersistenceService: SearchPersistenceService) {
    this.loadSearchParameters();
    this.isInStreetView = false;
    this.startPollingProperties(propertiesListService);
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private loadSearchParameters() {
    let persistedSearchParameters = this.searchPersistenceService.getSearchParameters();
    this.city = persistedSearchParameters.city;
    this.isRent = persistedSearchParameters.isRent;
    this.price = persistedSearchParameters.price;
    this.space = persistedSearchParameters.space;
  }

  private storeSearchParameters() {
    this.searchPersistenceService.setSearchParameters(this.city, this.isRent, this.price, this.space);
  }

  private stopPolling() {
    this.pollingInterval.unsubscribe();
  }

  private startPollingProperties(propertiesListService: PropertiesListService) {
    this.pollingInterval = Observable.interval(100)
    .switchMap(() => propertiesListService.getCurrentProperties())
    .subscribe((data) => {
      if (JSON.stringify(data) !== JSON.stringify(this.properties)) {
        this.properties = data;
        for (let property of this.properties) {
              this.preparePanoId(property);
        }
      }
    });
  }

  public cityChanged(city: City) {
    this.city = city;
    this.navigationService.navigateToCity(this.city);
    this.storeSearchParameters();
  }

  public preparePanoId(property) {
    this.streetViewService.getPanoId(property.address.wgs84Coordinate.latitude, property.address.wgs84Coordinate.longitude)
    .then(
        panoId => {
	        property['panoId'] = panoId;
        });
  }

  public openStreetView(panoId: string) {
    this.streetViewService.openStreetView(panoId).then(
        response => {
          this.isInStreetView = true;
        });
  }

  public closeStreetView() {
    this.streetViewService.closeStreetView()
    .then(() => {
      this.isInStreetView = false;
    });
  }

  public spaceChanged(event: MdSliderChange) {
    this.space = event.value;
    this.storeSearchParameters();
  }

  public priceChanged(event: MdSliderChange) {
    this.price = event.value;
    this.storeSearchParameters();
  }

  public typeChanged(isRent: boolean) {
    this.isRent = isRent;
    if (isRent) {
      this.price = 2000;
    } else {
            this.price = 500000;
    }
    this.storeSearchParameters();
  }

  public search() {
    this.storeSearchParameters();
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
