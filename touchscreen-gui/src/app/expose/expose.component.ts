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

    constructor(
        private exposeService: ExposeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.exposeService.get(id)
            .subscribe(expose => {
                this.expose = expose['expose.expose']
            });
    }

}
