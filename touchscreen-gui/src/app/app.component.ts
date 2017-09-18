import { Component } from '@angular/core';
import {MdSliderChange} from '@angular/material';
import {City} from './city';
import {CitiesNavigationService} from './cities-navigation.service';
import {Observable} from 'rxjs/Rx';
import {PropertiesListService} from './properties-list.service';
import {Property} from './property';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}
