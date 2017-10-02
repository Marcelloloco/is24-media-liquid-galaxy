import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../navigation.service';
import {StreetviewService} from "./streetview.service";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector:    'street-view',
  templateUrl: './streetview.component.html',
  styleUrls:   ['./streetview.component.less']
})
export class StreetviewComponent implements OnInit {

	@Input() expose: any;

	tourId: string;
	panoId: string;
	streetViewUrl: SafeResourceUrl;
	svLoaded: boolean;

  constructor(private streetViewService: StreetviewService,
              private route: ActivatedRoute,
              private location: Location,
              public sanitizer:DomSanitizer) {
  }

	ngOnInit() {
		if (this.expose) {
			this.panoId = this.expose.panoId;
			this.streetViewUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8086/display/?master=true&pano='+ this.panoId + '&zoom=3');
		} else if (this.route.snapshot.paramMap.has('panoId')) {
			this.panoId = this.route.snapshot.paramMap.get('panoId');
			this.streetViewUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8086/display/?master=true&pano='+ this.panoId + '&zoom=3');
		} else if (this.route.snapshot.paramMap.has('tourId')){
			this.tourId = this.route.snapshot.paramMap.get('tourId');
			this.streetViewUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8086/display/?master=true&tour='+ this.tourId + '&zoom=3');
		}
	}

	public closeStreetView() {
		this.panoId = null;
		this.streetViewService.closeStreetView();
		this.location.back();
	}

	public loaded() {
		this.svLoaded = true;
		this.streetViewService.openStreetView(this.panoId).then(
			response => {
				// this.streetView = true;
			});
	}


}
