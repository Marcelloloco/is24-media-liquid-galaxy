import {Component, OnDestroy} from '@angular/core';
import {MdSliderChange} from '@angular/material';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
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
	streetViewEnabled: boolean;
	searching: boolean;
	adminMode= false;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

	properties: Property[] = [];
	oldProperties: string;
	observable: Subscription;

  constructor(private navigationService: NavigationService,
              private propertiesListService: PropertiesListService,
              private searchService: SearchService,
              private streetViewService: StreetViewService,
              private searchPersistenceService: SearchPersistenceService) {
    this.loadSearchParameters();
    this.streetViewEnabled = false;
    this.searching         = false;
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }
	getStyle() {
		if(this.adminMode) {
			return "admin_mode";
		} else {
			return "";
		}
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
    this.observable.unsubscribe();
  }

  private startPollingProperties(propertiesListService: PropertiesListService) {
	  const timer = Observable.timer(5000);
	  this.observable = Observable.interval(500)
    .switchMap(() => propertiesListService.getCurrentProperties())
	.takeUntil(timer)
    .subscribe((data) => {
	    let oldProps = JSON.stringify(data);
	    if (oldProps !== this.oldProperties) {
          this.oldProperties = oldProps;
          this.properties = data;
          this.properties.forEach( (property)=> {
            this.preparePanoId(property);
          });
          this.searching = false;
          this.stopPolling();
	    }
    });
  }

  public cityChanged(city: City) {
    this.city = city;
    this.navigationService.navigateToCity(this.city);
    this.storeSearchParameters();
  }

  public preparePanoId(property) {
    this.streetViewService.getPanoId(property)
    .then(
        panoId => {
	        property['panoId'] = panoId;
        });
  }

    public openStreetView(panoId: string) {
        this.streetViewService.openStreetView(panoId).then(
            response => {
                // this.streetView = true;
            });
    }

    public closeStreetView() {
        this.streetViewEnabled = false;
        this.streetViewService.closeStreetView()
            .then(() => {
                // this.streetView = false;
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
    this.properties = [];
    //this.oldProperties = null;
	  this.searching = true;
	  this.searchService.search(this.isRent, this.price, this.space);
    this.startPollingProperties(this.propertiesListService);
  }

  public propertyExpanded(property: Property) {
    const coordinates = property.address.wgs84Coordinate;

    this.navigationService.navigate(coordinates.longitude, coordinates.latitude);
  }

  public relaunchLG() {
    this.navigationService.relaunchLG();
  }
  public restartLG() {
    this.navigationService.rebootLG();
  }
  public easterEgg() {
    this.city = City.Berlin;
    this.navigationService.navigateToImmoScout();
  }
  public easterEggAS24() {
    this.city = City.Munich;
    this.navigationService.navigateToAutoScout();
  }
	private swipeCoord?: [number, number];
	private swipeTime?: number;

	swipe(e: TouchEvent, when: string): void {
		const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
		const time                    = new Date().getTime();

		if (when === 'start') {
			this.swipeCoord = coord;
			this.swipeTime  = time;
		}

		else if (when === 'end') {
			const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
			const duration  = time - this.swipeTime;

			if (duration < 1000 //Short enough
				&& Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
				&& Math.abs(direction[0]) > 400) {  //Long enough
				this.adminMode = !this.adminMode;
			}
		}
	}

}