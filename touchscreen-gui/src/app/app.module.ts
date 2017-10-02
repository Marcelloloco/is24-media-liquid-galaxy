import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,

} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';


import {NavigationService} from './navigation.service';
import {PropertiesListService} from './search/properties-list.service';
import {SearchService} from './search/search.service';
import {StreetviewService} from './streetview/streetview.service';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ExposeComponent } from './expose/expose.component';
import { StreetviewComponent } from './streetview/streetview.component';
import {ExposeService} from "./expose/expose.service";
import {SearchPersistenceService} from "./search/searchPersistence.service";
import {Carousel} from "angular-carousel/";
import "hammerjs";
import { ExposeDetailValuePipe } from "./expose/exposeDetailValue.pipe";
import {MaxLengthPipe} from "./expose/maxLength.pipe";
import {NgxCarouselModule} from "ngx-carousel";

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'expose/:id', component: ExposeComponent },
  { path: 'streetview/:panoId', component: StreetviewComponent },
  { path: 'tour/:tourId', component: StreetviewComponent },
  { path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    SearchComponent,
    StreetviewComponent,
    ExposeComponent,
    AppComponent,
    ExposeDetailValuePipe,
    MaxLengthPipe
  ],
  imports: [
	  BrowserAnimationsModule,
	  BrowserModule,

    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    HttpClientModule,
    NgxCarouselModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
	  { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
	  NavigationService, PropertiesListService, SearchService, ExposeService, StreetviewService, SearchPersistenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
