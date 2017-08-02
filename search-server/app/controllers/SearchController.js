'use strict';

const
	blueprint = require('@onehilltech/blueprint'),
	SearchService = require('../services/SearchService'),
	fs = require("fs");

function SearchController() {
	blueprint.BaseController.call(this);
	this.searchService = new SearchService();
	this.enabled = true;
	this.realEstateType = 'ApartmentRent';
	// default is IS24 Berlin Office
	this.currentView = {
		lng: 13.43173929843387,
		lat: 52.51231193328837,
		alt: 29.37,
		heading: 40.92,
		range: 453,
		tilt: 78.75
	};
}

blueprint.controller(SearchController);


SearchController.prototype.enableSearch = function () {
	let self = this;
	return (req, res) => {
		if (req.query && req.query.realEstateType) {
			self.realEstateType = req.query.realEstateType;
		}
		self.enabled = true;
		self.flyTo();
		let msg = 'search enabled for '+self.realEstateType;
		console.log(msg);
		return res.render('controller-result.mustache', {message: msg});
	};
};

SearchController.prototype.disableSearch = function () {
	let self = this;
	return (req, res) => {
		self.enabled = false;
		let msg = 'search disabled';
		console.log(msg);
		return res.render('controller-result.mustache', {message: msg});
	};
};

SearchController.prototype.searchHouseBuy = function () {
	let self = this;
	return (req, res) => {
		self.realEstateType = 'HouseBuy';
		return self.doSearch(req, res);
	};
};

SearchController.prototype.searchHouseRent = function () {
	let self = this;
	return (req, res) => {
		self.realEstateType = 'HouseRent';
		return self.doSearch(req, res);
	};
};

SearchController.prototype.searchApartmentBuy = function () {
	let self = this;
	return (req, res) => {
		self.realEstateType = 'ApartmentBuy';
		return self.doSearch(req, res);
	};
};

SearchController.prototype.searchApartmentRent = function () {
	let self = this;
	return (req, res) => {
		self.realEstateType = 'ApartmentRent';
		return self.doSearch(req, res);
	};
};

SearchController.prototype.search = function () {
	let self = this;
	return (req, res) => {
		return self.doSearch(req, res);
	};
};

SearchController.prototype.flyTo = function (req, res) {
	let query = [
		"flytoview=<LookAt><longitude>",
		this.currentView.lng,
		"</longitude><latitude>",
		this.currentView.lat,
		"</latitude><altitude>",
		this.currentView.alt,
		"</altitude><heading>",
		this.currentView.heading,
		"</heading><tilt>",
		this.currentView.tilt,
		"</tilt><range>",
		this.currentView.range+0.1,
		"</range><altitudeMode>relativeToGround</altitudeMode><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>"].join('');

	// "flytoview=<LookAt><longitude>13.43173929843387</longitude><latitude>52.51231193328837</latitude><altitude>29.37</altitude><heading>40.929</heading><tilt>78.75</tilt><range>453</range><altitudeMode>relativeToGround</altitudeMode><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>"

	fs.writeFile("/tmp/query.txt", query);
};

SearchController.prototype.doSearch = function (req, res) {

	if (!this.enabled) {
		console.log('search is disabled!!!');
		return;
	}

	let type = this.realEstateType;
	let typeColor = 'wht';
	switch (type) {
		case 'HouseBuy':
			typeColor = 'red';
			break;
		case 'HouseRent':
			typeColor = 'blu';
			break;
		case 'ApartmentBuy':
			typeColor = 'ylw';
			break;
		case 'ApartmentRent':
			typeColor = 'orange';
			break;
	}

	let view = req.query.View.split(',');
	let cam = req.query.CamPos.split(',');

	this.currentView = {
		lng: parseFloat(view[0]),
		lat: parseFloat(view[1]),
		alt: parseFloat(cam[2]),
		heading: parseFloat(view[4]),
		range: parseFloat(view[2]),
		tilt: parseFloat(view[3])
	};

	let iconScale = 1.0;
	if (this.currentView.alt < 1500) {
		iconScale = 1.5;
	}
	if (this.currentView.alt < 400) {
		iconScale = 2.0;
	}
	if (this.currentView.alt < 300) {
		iconScale = 2.5;
	}
	if (this.currentView.alt < 200) {
		iconScale = 4.0;
	}
	if (this.currentView.alt < 100) {
		iconScale = 6.0;
	}

	return this.searchService
		.search(this.currentView.lng, this.currentView.lat, type)
		.then(results => {
			console.log(`search returned ${results.length} results`);
			return res.render('search-results-kml.mustache', {
				iconScale: iconScale,
				type: type,
				'type-color': typeColor,
				desc: 'This is the perfect home - go buy it now!!',
				results: results
			});
		})
		.catch(error => {
			console.log('search failed! response:\n' + JSON.stringify(error, null, 2));
			return res.render('search-error-kml.mustache', {message: 'search failed! msg: '+error});
		});

};

module.exports = SearchController;
