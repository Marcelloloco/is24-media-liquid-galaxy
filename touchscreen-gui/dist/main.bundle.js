webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__navigation_service__ = __webpack_require__("../../../../../src/app/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__properties_list_service__ = __webpack_require__("../../../../../src/app/properties-list.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__search_service__ = __webpack_require__("../../../../../src/app/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__search_search_component__ = __webpack_require__("../../../../../src/app/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__expose_expose_component__ = __webpack_require__("../../../../../src/app/expose/expose.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__expose_expose_service__ = __webpack_require__("../../../../../src/app/expose/expose.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













const appRoutes = [
    { path: 'search', component: __WEBPACK_IMPORTED_MODULE_10__search_search_component__["a" /* SearchComponent */] },
    { path: 'expose/:id', component: __WEBPACK_IMPORTED_MODULE_11__expose_expose_component__["a" /* ExposeComponent */] },
    { path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__search_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_11__expose_expose_component__["a" /* ExposeComponent */],
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MdAutocompleteModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MdButtonToggleModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MdCardModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MdCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["f" /* MdChipsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["g" /* MdCoreModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["h" /* MdDatepickerModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["j" /* MdExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdGridListModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["l" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["m" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["n" /* MdListModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["o" /* MdMenuModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["p" /* MdNativeDateModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["q" /* MdPaginatorModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["r" /* MdProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["s" /* MdProgressSpinnerModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["t" /* MdRadioModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["u" /* MdRippleModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["v" /* MdSelectModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["w" /* MdSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["y" /* MdSliderModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["x" /* MdSlideToggleModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["z" /* MdSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["A" /* MdSortModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["B" /* MdTableModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["C" /* MdTabsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["D" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["E" /* MdTooltipModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(appRoutes, { enableTracing: true } // <-- debugging purposes only
            )
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__navigation_service__["a" /* NavigationService */], __WEBPACK_IMPORTED_MODULE_7__properties_list_service__["a" /* PropertiesListService */], __WEBPACK_IMPORTED_MODULE_8__search_service__["a" /* SearchService */], __WEBPACK_IMPORTED_MODULE_12__expose_expose_service__["a" /* ExposeService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/city.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return City; });
var City;
(function (City) {
    City[City["Berlin"] = 0] = "Berlin";
    City[City["Cologne"] = 1] = "Cologne";
    City[City["Frankfurt"] = 2] = "Frankfurt";
    City[City["Hamburg"] = 3] = "Hamburg";
    City[City["Munich"] = 4] = "Munich";
})(City || (City = {}));
//# sourceMappingURL=city.js.map

/***/ }),

/***/ "../../../../../src/app/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SERVER_IP = '10.200.144.22';
/* harmony export (immutable) */ __webpack_exports__["a"] = SERVER_IP;

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../../../../src/app/expose/expose.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"expose-container grid\">\n    <div class=\"left-column grid-item two-fifths\">\n        <div class=\"gallery\">... there be pictures</div>\n        <div class=\"key-facts\">\n            <div class=\"title\">{{expose?.realEstate.title}}</div>\n            <div class=\"subtitle\">{{expose?.realEstate.address.street}}, {{expose?.realEstate.address.postcode}} {{expose?.realEstate.address.city}}, {{expose?.realEstate.address.quarter}}</div>\n            <div class=\"facts grid\">\n                <div class=\"fact grid-item two-sixths\">\n                    <div class=\"value\">{{expose?.realEstate.baseRent}} &euro;</div>\n                    <div class=\"key\">Kaltmiete</div>\n                </div>\n                <div class=\"fact grid-item one-sixth\">\n                    <div class=\"value\">{{expose?.realEstate.numberOfRooms}}</div>\n                    <div class=\"key\">Zi.</div>\n                </div>\n                <div class=\"fact grid-item three-sixths\">\n                    <div class=\"value\">{{expose?.realEstate.livingSpace}} &#13217;</div>\n                    <div class=\"key\">Wohnfläche</div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"right-column grid-item three-fifths\">\n        <div class=\"close\">\n            <button class=\"close-button\">Schließen</button>\n        </div>\n        <div class=\"details grid\">\n            <div *ngFor=\"let detailsGroup of detailsGroups\" class=\"details-group grid-item one-whole\">\n                <div *ngFor=\"let detailsColumn of detailsGroup\" class=\"grid-item one-half\">\n                    <div *ngFor=\"let detail of detailsColumn\" class=\"detail grid\">\n                        <div class=\"key grid-item one-half\">{{detail.key}}</div>\n                        <div class=\"value grid-item one-half\">{{detail.value}}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/expose/expose.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".expose-container {\n  color: #333;\n  background: #f4f4f4;\n  height: 100%;\n}\n.expose-container .left-column {\n  height: 100%;\n}\n.expose-container .left-column .gallery {\n  background: #fdd;\n}\n.expose-container .left-column .key-facts {\n  height: 100%;\n  padding: 1em;\n  background: #fff;\n}\n.expose-container .left-column .key-facts .title {\n  font-size: 180%;\n  margin-bottom: 1em;\n}\n.expose-container .left-column .key-facts .subtitle {\n  color: #888;\n  margin-bottom: 1em;\n}\n.expose-container .left-column .key-facts .facts {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  border-top: 1px solid #ddd;\n  border-bottom: 1px solid #ddd;\n}\n.expose-container .left-column .key-facts .facts .fact .key {\n  color: #888;\n}\n.expose-container .left-column .key-facts .facts .fact .value {\n  font-size: 180%;\n}\n.expose-container .right-column {\n  height: 100%;\n  padding: 0 5em;\n}\n.expose-container .right-column .close {\n  padding: 1em;\n  text-align: right;\n}\n.expose-container .right-column .close .close-button {\n  border: 2px solid #fc6b21;\n  border-radius: 3px;\n  color: #fc6b21;\n  background: none;\n  padding: 0.5em 2em;\n}\n.expose-container .right-column .details .details-group {\n  border-bottom: 1px solid #ddd;\n}\n.expose-container .right-column .details .details-group .detail .key {\n  color: #888;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/expose/expose.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExposeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__expose_service__ = __webpack_require__("../../../../../src/app/expose/expose.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ExposeComponent = class ExposeComponent {
    constructor(exposeService, route) {
        this.exposeService = exposeService;
        this.route = route;
    }
    detailFor(value, caption) {
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
};
ExposeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-expose',
        template: __webpack_require__("../../../../../src/app/expose/expose.component.html"),
        styles: [__webpack_require__("../../../../../src/app/expose/expose.component.less")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__expose_service__["a" /* ExposeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__expose_service__["a" /* ExposeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object])
], ExposeComponent);

var _a, _b;
//# sourceMappingURL=expose.component.js.map

/***/ }),

/***/ "../../../../../src/app/expose/expose.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExposeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__("../../../../../src/app/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ExposeService = class ExposeService {
    constructor(http) {
        this.http = http;
    }
    get(exposeId) {
        return this.http.get(`http://${__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* SERVER_IP */]}:88/expose/${exposeId}`);
    }
};
ExposeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], ExposeService);

var _a;
//# sourceMappingURL=expose.service.js.map

/***/ }),

/***/ "../../../../../src/app/navigation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__city__ = __webpack_require__("../../../../../src/app/city.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__("../../../../../src/app/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let NavigationService = class NavigationService {
    constructor(http) {
        this.http = http;
    }
    navigateToCity(city) {
        const [longitude, latitude, altitude, heading, tilt, range] = this.getCityCoordinates(city);
        this.navigate(longitude, latitude, altitude, heading, tilt, range);
    }
    navigateToImmoScout() {
        this.navigate(13.43158897438021, 52.5121619221996, 19.03508785186355, 41.19475331649205, 80, 162.5619296413542);
    }
    navigate(longitude, latitude, altitude = 0, heading = 49, tilt = 73, range = 800) {
        const params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpParams */]()
            .set('query', this.generateFlytoString(longitude, latitude, altitude, heading, tilt, range))
            .set('name', 'whatever');
        this.http.get(`http://${__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* SERVER_IP */]}:81/change.php`, { params: params }).subscribe(response => {
            console.log(response);
        });
    }
    getCityCoordinates(city) {
        let longitude, latitude, altitude, heading, tilt, range;
        switch (city) {
            case __WEBPACK_IMPORTED_MODULE_2__city__["a" /* City */].Cologne: {
                longitude = 6.95713836605103;
                latitude = 50.94096035129125;
                altitude = 4.325263592940122;
                heading = 45.75025455034856;
                tilt = 62.44090422096348;
                range = 431.8580189351539;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__city__["a" /* City */].Berlin: {
                longitude = 13.41054764032167;
                latitude = 52.52096378877162;
                altitude = 11.06393855146612;
                heading = 64.50924269857357;
                tilt = 69.22247346283616;
                range = 991.6556221498255;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__city__["a" /* City */].Munich: {
                longitude = 11.5754486004505;
                latitude = 48.13623913638575;
                altitude = 14.78513656920451;
                heading = -0.004868094893058572;
                tilt = 62.62738016652561;
                range = 746.2288443428296;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__city__["a" /* City */].Frankfurt: {
                longitude = 8.672226637532439;
                latitude = 50.10989318426203;
                altitude = 23.78395936329224;
                heading = 10.773222571673702;
                tilt = 65.70241887356603;
                range = 1180.363524908955;
                break;
            }
            case __WEBPACK_IMPORTED_MODULE_2__city__["a" /* City */].Hamburg: {
                longitude = 9.99400960055184;
                latitude = 53.55201361216928;
                altitude = 100;
                heading = -169.5822581855827;
                tilt = 75.22678891972156;
                range = 600.93209165143;
            }
        }
        return [longitude, latitude, altitude, heading, tilt, range];
    }
    generateFlytoString(longitude, latitude, altitude, heading, tilt, range) {
        return `flytoview=<LookAt><longitude>${longitude}</longitude><latitude>${latitude}</latitude><altitude>${altitude}</altitude><heading>${heading}</heading><tilt>${tilt}</tilt><range>${range}</range><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>`;
    }
};
NavigationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], NavigationService);

var _a;
//# sourceMappingURL=navigation.service.js.map

/***/ }),

/***/ "../../../../../src/app/properties-list.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertiesListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__("../../../../../src/app/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let PropertiesListService = class PropertiesListService {
    constructor(http) {
        this.http = http;
    }
    getCurrentProperties() {
        return this.http.get(`http://${__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* SERVER_IP */]}:88/last-search`)
            .map((res) => res['results'])
            .catch(err => []);
    }
};
PropertiesListService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], PropertiesListService);

var _a;
//# sourceMappingURL=properties-list.service.js.map

/***/ }),

/***/ "../../../../../src/app/search.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__("../../../../../src/app/constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let SearchService = class SearchService {
    constructor(http) {
        this.http = http;
    }
    search(isRent, maxPrice, minArea) {
        const params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpParams */]()
            .set('realEstateType', isRent ? 'ApartmentRent' : 'ApartmentBuy')
            .set('maxPrice', maxPrice.toString())
            .set('minArea', minArea.toString());
        this.http.get(`http://${__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* SERVER_IP */]}:88/search-enable`, { params: params })
            .subscribe(res => {
            this.http.post(`http://${__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* SERVER_IP */]}:82/kmls`, { uri: 'http://lg1:81/is24-lg-slave.kml' })
                .subscribe();
        });
    }
};
SearchService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], SearchService);

var _a;
//# sourceMappingURL=search.service.js.map

/***/ }),

/***/ "../../../../../src/app/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <header class=\"page-header page-header--white\">\n    <a title=\"Zur Startseite\" class=\"page-header__logo\">\n      <img (click)=\"easterEgg()\" alt=\"ImmobilienScout24\" src=\"/img/logo/immobilienscout24.svg\">\n    </a><span class=\"page-header__brand\">\n        Der Marktführer:<br />\n        Die Nr. 1 rund um Immobilien\n    </span>\n  </header>\n\n  <div class=\"dashboard grid \">\n    <div class=\"grid-item three-tenths\">\n      <div class=\"cities\">\n        <button [class.disabled]=\"city != cities.Berlin\" (click)=\"cityChanged(cities.Berlin)\" class=\"button-primary berlin\">Berlin</button>\n        <button [class.disabled]=\"city != cities.Frankfurt\" (click)=\"cityChanged(cities.Frankfurt)\" class=\"button-primary frankfurt\">Frankfurt</button>\n        <button [class.disabled]=\"city != cities.Cologne\" (click)=\"cityChanged(cities.Cologne)\" class=\"button-primary cologne\">Köln</button>\n        <button [class.disabled]=\"city != cities.Munich\" (click)=\"cityChanged(cities.Munich)\" class=\"button-primary munich\">München</button>\n        <button [class.disabled]=\"city != cities.Hamburg\" (click)=\"cityChanged(cities.Hamburg)\" class=\"button-primary hamburg\">Hamburg</button>\n      </div>\n      <img class=\"germany-map\" src=\"/img/Karte_Deutschland.svg\">\n    </div>\n    <div class=\"grid-item four-tenths settings\">\n      <h1 class=\"font-brandorange font-center\">ImmoSearch</h1>\n      <div class=\"type-buttons\">\n        <button [class.disabled]=\"!isRent\" class=\"button-secondary margin-right-l\" (click)=\"typeChanged(true);\">Mieten</button>\n        <button [class.disabled]=\"isRent\" class=\"button-secondary disabled margin-left-l\" (click)=\"typeChanged(false);\">Kaufen</button>\n      </div>\n\n      <div class=\"setting-slider\" style=\"margin-top: 50px;\">\n        <h2>Preis (max)</h2>\n        <md-slider md-discrete [value]=\"price\" min=\"1\" [max]=\"isRent ? 4000 : 1000000\" step=\"1\" class=\"one-whole\" (input)=\"priceChanged($event)\"></md-slider>\n        <h3 [innerText]=\"price | currency:'EUR':true:'1.0-0'\"></h3>\n      </div>\n\n      <div class=\"setting-slider margin-top\">\n        <h2>Fläche (min)</h2>\n        <md-slider md-discrete [(value)]=\"space\" min=\"1\" max=\"200\" step=\"1\" class=\"one-whole\" (input)=\"spaceChanged($event)\"></md-slider>\n        <h3>{{space}}<span>&nbsp;m<sup>2</sup></span></h3>\n      </div>\n\n      <button class=\"button-primary search-button\" (click)=\"search()\"><span class=\"fa fa-search\" aria-hidden=\"true\"></span></button>\n\n    </div>\n    <div class=\"grid-item three-tenths\">\n      <md-accordion class=\"example-headers-align\" hide-toggle=\"false\">\n\n        <md-expansion-panel (opened)=\"propertyExpanded(property)\" *ngFor=\"let property of properties\">\n\n          <md-expansion-panel-header>\n            <md-panel-title>\n              <span class=\"fa fa-map-marker padding-right-s font-info\" aria-hidden=\"true\"></span>\n\n              {{property.title}}\n\n            </md-panel-title>\n            <md-panel-description>\n              <span class=\"align-right\" *ngIf=\"property.address.preciseHouseNumber\" [innerText]=\"property.address.street + ' ' + property.address.houseNumber\"></span>\n            </md-panel-description>\n          </md-expansion-panel-header>\n          <div class=\"font-info font-bold font-ll align-center\">\n                  <span *ngIf=\"property.address.preciseHouseNumber\">\n                    <span [innerText]=\"property.address.quarter\"></span><span>,</span>\n                  </span>\n            <span [innerText]=\"property.address.postcode\"></span>\n            <span [innerText]=\"property.address.city\"></span>\n          </div>\n          <div class=\"expansionPanelContent margin-top\">\n\n            <div class=\"imageContainer inline-block\">\n              <img [src]=\"property.titlePicture\">\n            </div>\n            <div style=\"vertical-align: top; margin-left: 20px\" class=\"inline-block margin-top-l\">\n\n              <div class=\"grid\" style=\"width: 280px\">\n                <div class=\"grid-item data-entity right-border one-third\" *ngIf=\"property.price.value\">\n                  <div class=\"grid\">\n                    <div class=\"grid-item data-value\">\n                      <span [innerText]=\"property.price.value | currency:'EUR':true:'1.0-0'\"></span>\n                    </div>\n                    <div class=\"data-title\">Preis</div>\n                  </div>\n                </div>\n                <div class=\"grid-item data-entity right-border one-third\">\n                  <div class=\"grid\">\n                    <div class=\"grid-item data-value\">\n                      <span [innerText]=\"property.numberOfRooms\"></span>\n                    </div>\n                    <div class=\"data-title\">Zimmer</div>\n                  </div>\n                </div>\n                <div class=\"grid-item data-entity one-third\">\n                  <div class=\"grid\">\n                    <div class=\"grid-item data-value\">\n                      <span [innerText]=\"property.livingSpace | number:'1.0-0'\"></span><span>&nbsp;m<sup>2</sup></span>\n                    </div>\n                    <div class=\"data-title\">Fläche</div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n          <div class=\"grid expansionPanelNavigationButtons\">\n            <div class=\"grid-item one-third padding-right-s\">\n              <button class=\"button\">Streetview</button>\n            </div>\n            <div class=\"grid-item one-third\">\n              <button class=\"button disabled\">360 tour</button>\n            </div>\n            <div class=\"grid-item one-third padding-left-s\">\n              <button routerLink=\"/expose/{{property.id}}\" class=\"button\">Exposé</button>\n            </div>\n          </div>\n        </md-expansion-panel>\n\n\n\n\n      </md-accordion>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/search/search.component.less":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__city__ = __webpack_require__("../../../../../src/app/city.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navigation_service__ = __webpack_require__("../../../../../src/app/navigation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__properties_list_service__ = __webpack_require__("../../../../../src/app/properties-list.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_service__ = __webpack_require__("../../../../../src/app/search.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let SearchComponent = class SearchComponent {
    constructor(navigationService, propertiesListService, searchService) {
        this.navigationService = navigationService;
        this.propertiesListService = propertiesListService;
        this.searchService = searchService;
        this.cities = __WEBPACK_IMPORTED_MODULE_1__city__["a" /* City */];
        this.city = __WEBPACK_IMPORTED_MODULE_1__city__["a" /* City */].Berlin;
        this.isRent = true;
        this.price = 800;
        this.space = 70;
        this.properties = [];
        this.startPollingProperties(propertiesListService);
    }
    ngOnDestroy() {
        this.stopPolling();
    }
    stopPolling() {
        this.pollingInterval.unsubscribe();
    }
    startPollingProperties(propertiesListService) {
        this.pollingInterval = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].interval(100)
            .switchMap(() => propertiesListService.getCurrentProperties())
            .subscribe((data) => {
            if (JSON.stringify(data) !== JSON.stringify(this.properties)) {
                this.properties = data;
            }
        });
    }
    cityChanged(city) {
        this.city = city;
        this.navigationService.navigateToCity(this.city);
    }
    spaceChanged(event) {
        this.space = event.value;
    }
    priceChanged(event) {
        this.price = event.value;
    }
    typeChanged(isRent) {
        this.isRent = isRent;
        if (isRent) {
            this.price = 2000;
        }
        else {
            this.price = 100000;
        }
    }
    search() {
        this.searchService.search(this.isRent, this.price, this.space);
    }
    propertyExpanded(property) {
        const coordinates = property.address.wgs84Coordinate;
        this.navigationService.navigate(coordinates.longitude, coordinates.latitude);
    }
    easterEgg() {
        this.city = null;
        this.navigationService.navigateToImmoScout();
    }
};
SearchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-search',
        template: __webpack_require__("../../../../../src/app/search/search.component.html"),
        styles: [__webpack_require__("../../../../../src/app/search/search.component.less")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__navigation_service__["a" /* NavigationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__navigation_service__["a" /* NavigationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__properties_list_service__["a" /* PropertiesListService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__properties_list_service__["a" /* PropertiesListService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__search_service__["a" /* SearchService */]) === "function" && _c || Object])
], SearchComponent);

var _a, _b, _c;
//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
const environment = {
    production: false
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(err => console.log(err));
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map