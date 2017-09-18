import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ExposeService} from "./expose.service";
import {ActivatedRoute} from "@angular/router";
import {Carousel} from "ngx-carousel";

@Component({
    selector: 'app-expose',
    templateUrl: './expose.component.html',
    styleUrls: ['./expose.component.less']
})

export class ExposeComponent implements OnInit {
    expose: any;
    images: Array<Object>;
    carouselOne: Carousel;
    detailsGroups: Array<Array<Array<Object>>>;
    constructor(private exposeService: ExposeService,
                private route: ActivatedRoute,
                private location: Location) {

    }

    private detailFor(value, caption) {
        return { key: caption, value: value };
    }

    private booleanFor(value) {
        return value === "YES" || value === true;
    }

    private typeFor(value) {
        switch(value)  {
            case "APARTMENT": return "Etagenwohnung";
            case "GROUND_FLOOR": return "Erdgeschosswohnung";
            default: return value;
        }
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
                            this.detailFor(this.typeFor(realEstate.apartmentType), "Typ"),
                            this.detailFor(realEstate.floor, "Etage"),
                            this.detailFor(realEstate.livingSpace,"Wohnfläche &#13217;"),
                            this.detailFor(realEstate.freeFrom, "Bezugsfrei"),
                            this.detailFor(realEstate.numberOfRooms, "Zimmer"),
                            this.detailFor(realEstate.numberOfBedRooms, "Schlafzimmer"),
                        ],
                        [
                            this.detailFor(realEstate.numberOfBathRooms, "Badezimmer"),
                            this.detailFor(this.booleanFor(realEstate.cellar), "Keller"),
                            this.detailFor(this.booleanFor(realEstate.balcony), "Balkon / Terasse"),
                            this.detailFor(this.booleanFor(realEstate.guestToilet), "Gäste-WC"),
                        ],
                    ],
                    [
                        [
                            this.detailFor(realEstate.baseRent + " &euro;", "Kaltmiete"),
                            this.detailFor((realEstate.calculatedTotalRent - realEstate.baseRent) + " &euro;", "Nebenkosten")
                        ],
                        [
                            this.detailFor(realEstate.heatingCosts + " &euro;", "Heizkosten"),
                            this.detailFor(realEstate.calculatedTotalRent + " &euro;", "Gesamtmiete"),
                            this.detailFor(realEstate.deposit + " &euro;", "Kaution o. Genossenschaftsanteile"),
                        ]
                    ],
                    [
                        [
                            this.detailFor(realEstate.constructionYear, "Baujahr"),
                            this.detailFor(realEstate.condition, "Objektzustand"),
                            this.detailFor("???", "Denkmalschutz"),
                            this.detailFor("???", "Ausstattung"),
                            this.detailFor("???", "Zentralheizung"),
                        ],
                        [
                            this.detailFor("???", "Energieträger"),
                            this.detailFor(realEstate.energyPerformanceCertificate, "Energieausweiß"),
                            this.detailFor(realEstate.thermalCharacteristic + " kWh/(&#13217;*a)", "Energieverbrauchswert"),
                        ]

                    ]
                ];
            });
    }

}
