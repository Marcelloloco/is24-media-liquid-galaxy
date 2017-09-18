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

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.exposeService.get(id)
            .subscribe(expose => {
                this.expose = expose;
                let realEstate = this.expose['realEstate'];
                this.detailsGroups = [
                    [
                        [
                            this.detailFor(realEstate.apartmentType, "Typ"),
                            this.detailFor(realEstate.floor, "Etage"),
                            this.detailFor(realEstate.livingSpace, "Wohnfläche"),
                            this.detailFor("???", "Bezugsfrei"),
                            this.detailFor(realEstate.numberOfRooms, "Zimmer"),
                            this.detailFor(realEstate.numberOfBedRooms, "Schlafzimmer"),
                        ],
                        [
                            this.detailFor(realEstate.numberOfBathRooms, "Badezimmer"),
                            this.detailFor(realEstate.cellar, "Keller"),
                            this.detailFor(realEstate.balcony, "Balkon / Terasse"),
                            this.detailFor(realEstate.guestToilet, "Gäste-WC"),
                            this.detailFor("???", "Internet"),
                        ],
                    ],
                    [
                        [
                            this.detailFor("???", "Kaltmiete"),
                            this.detailFor("???", "Nebenkosten")
                        ],
                        [
                            this.detailFor("???", "Heizkosten"),
                            this.detailFor("???", "Gesamtmiete"),
                            this.detailFor("???", "Kaution o. Genossenschaftsanteile"),
                        ]
                    ],
                    [
                        [
                            this.detailFor("???", "Baujahr"),
                            this.detailFor("???", "Objektzustand"),
                            this.detailFor("???", "Denkmalschutz"),
                            this.detailFor("???", "Ausstattung"),
                            this.detailFor("???", "Zentralheizung"),
                        ],
                        [
                            this.detailFor("???", "Energieträger"),
                            this.detailFor("???", "Energieausweiß"),
                            this.detailFor("???", "Energieverbrauchswert"),
                        ]

                    ]
                ];
            });
    }

}
