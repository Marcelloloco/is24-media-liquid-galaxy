'use strict';

const
	blueprint = require('@onehilltech/blueprint'),
	SearchService = require('../services/SearchService'),
	fs = require("fs"),
	LRU = require("lru-cache"),
	logger = require("../utils/logger"),
	maxCacheSize = 	500,
	MASTER = '10.42.42.1';

function SearchController() {
	blueprint.BaseController.call(this);
	this.searchService = new SearchService();
	this.enabled = true;
	this.realEstateType = 'ApartmentRent';
	this.searchResultCache = LRU(maxCacheSize);
	// default is IS24 Berlin Office
	this.currentView = {
		lng: 13.43173929843387,
		lat: 52.51231193328837,
		alt: 29.37,
		heading: 40.92,
		range: 453,
		tilt: 78.75
	};
	this.lastSearch = {};
}

blueprint.controller(SearchController);


function distanceInKm(lat1, lon1, lat2, lon2) {
	let R = 6371; // Radius of the earth in km
	let dLat = deg2rad(lat2 - lat1);  // deg2rad below
	let dLon = deg2rad(lon2 - lon1);
	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
	;
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in km
}

function deg2rad(deg) {
	return deg * (Math.PI / 180)
}


SearchController.prototype.switchRealEstateType = function (newRealEstateType) {
	if (this.realEstateType !== newRealEstateType) {
		this.realEstateType = newRealEstateType;
		this.searchResultCache.reset();
	}
};

SearchController.prototype.enableSearch = function () {
	let self = this;
	return (req, res) => {
		if (req.query && req.query.realEstateType) {
			self.switchRealEstateType(req.query.realEstateType);
		}
		self.enabled = true;
		self.flyTo();
		let msg = 'search enabled for '+self.realEstateType;
		logger.log(msg);
		return res.render('controller-result.mustache', {message: msg});
	};
};

SearchController.prototype.disableSearch = function () {
	let self = this;
	return (req, res) => {
		self.enabled = false;
		this.searchResultCache.reset();
		this.lastSearch = {};
		let msg = 'search disabled';
		logger.log(msg);
		return res.render('controller-result.mustache', {message: msg});
	};
};

SearchController.prototype.getLastSearch = function () {
	let self = this;
	return (req, res) => {
		const list = [];
		if (self.enabled) {
			if (MASTER in this.lastSearch) {
				list.push(this.lastSearch[MASTER].slice(0, 10));
			}
		}
		return res.json({results: list});
	};
};

SearchController.prototype.searchHouseBuy = function () {
	let self = this;
	return (req, res) => {
		self.switchRealEstateType('HouseBuy');
		return self.doSearch(req, res);
	};
};

SearchController.prototype.searchHouseRent = function () {
	let self = this;
	return (req, res) => {
		self.switchRealEstateType('HouseRent');
		return self.doSearch(req, res);
	};
};

SearchController.prototype.searchApartmentBuy = function () {
	let self = this;
	return (req, res) => {
		self.switchRealEstateType('ApartmentBuy');
		return self.doSearch(req, res);
	};
};

SearchController.prototype.searchApartmentRent = function () {
	let self = this;
	return (req, res) => {
		self.switchRealEstateType('ApartmentRent');
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

function sortByDistance(list, centerLat, centerLng) {
	return list.forEach(item => {
		item.distance = distanceInKm(centerLat, centerLng, item.address.wgs84Coordinate.latitude, item.address.wgs84Coordinate.longitude);
	}).sort((a,b) => {
		if (a.distance < b.distance) {
			return -1;
		}
		if (a.distance > b.distance) {
			return 1;
		}
		return 0;
	});
}

SearchController.prototype.doSearch = function (req, res) {
	const clientIp = req.headers['x-forwarded-for'];
    logger.log('clientIP: '+clientIp);

	if (!this.enabled) {
		logger.log('search is disabled!!!');
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
		iconScale = 3.0;
	}
	if (this.currentView.alt < 200) {
		iconScale = 6.0;
	}
	if (this.currentView.alt < 100) {
		iconScale = 8.0;
	}

	const self = this;
	return this.searchService
		.search(this.currentView.lng, this.currentView.lat, type)
		.then(results => {
			//results = sortByDistance(results, self.currentView.lat, self.currentView.lng);
			self.lastSearch[clientIp] = results;
			logger.log(`search returned ${results.length} results`);
			results.forEach(item => {
				self.searchResultCache.set(item.id, item);
			});
			let allItemsFromCache = self.searchResultCache.values();
			//allItemsFromCache = sortByDistance(allItemsFromCache, self.currentView.lat, self.currentView.lng);
			for (let i=0; i<allItemsFromCache.length && i<10; i++) {
				allItemsFromCache[i].isMaster = (clientIp === MASTER);
			}
			logger.log(`Items in cache: ${allItemsFromCache.length}`);
			let center = null;
			if (clientIp === MASTER) {
				center = {
					latitude: this.currentView.lat,
					longitude: this.currentView.lng
				};
			}
			return res.render('search-results-kml.mustache', {
				iconScale: iconScale,
				type: type,
				'type-color': typeColor,
				desc: 'This is the perfect home - go buy it now!!',
				center: center,
				results: allItemsFromCache
			});
		})
		.catch(error => {
			self.lastSearch[clientIp] = [];
			logger.log('search failed! response:\n' + JSON.stringify(error, null, 2));
			return res.render('search-error-kml.mustache', {message: 'search failed! msg: '+error});
		});

};

module.exports = SearchController;
