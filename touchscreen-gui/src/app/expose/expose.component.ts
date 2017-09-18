import {Component, OnInit} from '@angular/core';
import {ExposeService} from "./expose.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-expose',
    templateUrl: './expose.component.html',
    styleUrls: ['./expose.component.less']
})

export class ExposeComponent implements OnInit {
    expose: Object;
    detailsGroups: Array<Array<Array<Object>>>;

    constructor(
        private exposeService: ExposeService,
        private route: ActivatedRoute
    ) {
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

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.exposeService.get(id)
            .subscribe(expose => {
                this.expose = expose;
                console.log(expose);
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
