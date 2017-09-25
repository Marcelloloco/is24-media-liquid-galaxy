import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ExposeService} from "./expose.service";
import {ActivatedRoute} from "@angular/router";
import {NgxCarousel} from "ngx-carousel";
import {REAL_ESTATE_CONDITIONS, REAL_ESTATE_TYPES} from "./realEstateTranslations";
import {FIRING_TYPE_CONDITIONS} from "./firingTypeCondition";

@Component({
    selector: 'app-expose',
    templateUrl: './expose.component.html',
    styleUrls: ['./expose.component.less']
})

export class ExposeComponent implements OnInit {
    expose: any;
    images: Array<Object>;
    carouselOne: NgxCarousel;
    detailsGroups: Array<Array<Array<Object>>>;
    constructor(private exposeService: ExposeService,
                private route: ActivatedRoute,
                private location: Location) {

    }
    private orMinus(value, suffix=''){
        if(typeof value === 'undefined' || value === null|| Number.isNaN(value)){
            return '-'
        } else {
            return value + suffix;
        }
    }
    private detailFor(value, caption) {
        return { key: caption, value: value };
    }

    private booleanFor(value) {
        return value === "YES" || value === true;
    }

    closeButtonClicked() {
        this.location.back();
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.carouselOne = {
            grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
            slide: 1,
            speed: 400,
            // interval: 4000,
            point: true,
            load: 2,
            touch: true,
            custom: 'banner',
            dynamicLength: true
        };
        this.exposeService.get(id)
            .subscribe(expose => {
                this.expose = expose;
                console.log(expose);
                this.images = this.expose.realEstate.attachments[0].attachment
                    .filter((attachment) => attachment['@xsi.type'] === 'common:Picture')
                    .map((attachment) => {
                        return {
                            url: attachment.urls[0].url.find((image)=>image['@scale'] ==='SCALE_540x540')['@href'],
                            text: attachment.title
                        }
                    });
                let realEstate = this.expose['realEstate'];
                this.detailsGroups = [
                    [
                        [
                            this.detailFor(REAL_ESTATE_TYPES[realEstate['@xsi.type'].split(':')[1]], "Typ"),
                            this.detailFor(this.orMinus(realEstate.floor), "Etage"),
                            this.detailFor(this.orMinus(realEstate.livingSpace),"Wohnfläche &#13217;"),
                            this.detailFor(this.orMinus(realEstate.freeFrom), "Bezugsfrei"),
                            this.detailFor(this.orMinus(realEstate.numberOfRooms), "Zimmer"),
                            this.detailFor(this.orMinus(realEstate.numberOfBedRooms), "Schlafzimmer"),
                        ],
                        [
                            this.detailFor(this.orMinus(realEstate.numberOfBathRooms), "Badezimmer"),
                            this.detailFor(this.booleanFor(realEstate.cellar), "Keller"),
                            this.detailFor(this.booleanFor(realEstate.balcony), "Balkon / Terasse"),
                            this.detailFor(this.booleanFor(realEstate.guestToilet), "Gäste-WC"),
                        ],
                    ],
                    [
                        [
                            this.detailFor(this.orMinus(realEstate.baseRent," &euro;"), "Kaltmiete"),
                            this.detailFor(this.orMinus(realEstate.calculatedTotalRent - realEstate.baseRent," &euro;"), "Nebenkosten")
                        ],
                        [
                            this.detailFor(this.orMinus(realEstate.heatingCosts," &euro;"), "Heizkosten"),
                            this.detailFor(this.orMinus(realEstate.calculatedTotalRent, " &euro;"), "Gesamtmiete"),
                            this.detailFor(this.orMinus(realEstate.deposit , " &euro;"), "Kaution"),
                        ]
                    ],
                    [
                        [
                            this.detailFor(this.orMinus(realEstate.constructionYear), "Baujahr"),
                            this.detailFor(REAL_ESTATE_CONDITIONS[realEstate.condition], "Objektzustand"),
                            this.detailFor(realEstate.heatingType === "CENTRAL_HEATING", "Zentralheizung"),
                        ],
                        [
                            this.detailFor(FIRING_TYPE_CONDITIONS[(realEstate.firingTypes[0].firingType && realEstate.firingTypes[0].firingType) || 'NO_INFORMATION'], "Energieträger"),
                            this.detailFor(this.orMinus(realEstate.energyPerformanceCertificate), "Energieausweiß"),
                            this.detailFor(this.orMinus(realEstate.thermalCharacteristic," kWh/(&#13217;*a)"), "Energieverbrauch"),
                        ]
                    ]
                ];
            });
    }

}
