'use strict';

const
	_ = require('lodash'),
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
	this.maxPrice = 1000000;
	this.minArea = 1;
	this.searchResultCache = LRU(maxCacheSize);
	// default is IS24 Berlin Office
	this.lastMasterViewPoint = {
		lng: 13.43173929843387,
		lat: 52.51231193328837,
		alt: 29.37,
		heading: 40.92,
		range: 453,
		tilt: 78.75
	};
	this.lastSearch = LRU(7);
	this.lastSearchResults = [];
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

SearchController.prototype.enableSearch = function () {
	let self = this;
	return (req, res) => {
		req.query = req.query || {};
		if (req.query.realEstateType && self.realEstateType !== req.query.realEstateType) {
			self.realEstateType = req.query.realEstateType;
			self.searchResultCache.reset();
		}
		self.maxPrice = req.query.maxPrice || self.maxPrice;
		self.minArea = req.query.minArea || self.minArea;

		let tmpList = _.cloneDeep(self.searchResultCache.values());
		tmpList.forEach(item => {
			if (item.price.value > self.maxPrice) {
				self.searchResultCache.del(item.id);
				return;
			}
			if (!item.livingSpace || item.livingSpace < self.minArea) {
				self.searchResultCache.del(item.id);
			}
		});
		self.lastSearchResults = self.lastSearchResults.filter(item => {
			if (item.price.value > self.maxPrice) {
				return false;
			}
			if (!item.livingSpace || item.livingSpace < self.minArea) {
				return false;
			}
			return true;
		});
		self.lastSearch.reset();

		self.enabled = true;
		let msg = `search enabled for ${self.realEstateType} - maxPrice=${self.maxPrice} - minArea=${self.minArea}`;
		logger.log(msg);
		return res.json({message: msg});
	};
};

SearchController.prototype.disableSearch = function () {
	let self = this;
	return (req, res) => {
		self.enabled = false;
		this.searchResultCache.reset();
		this.lastSearchResults = [];
		this.lastSearch.reset();
		this.maxPrice = null;
		this.minArea = null;

		let msg = 'search disabled';
		logger.log(msg);
		return res.json({message: msg});
	};
};

SearchController.prototype.getLastSearch = function () {
	let self = this;
	return (req, res) => {
		return res.json({results: self.lastSearchResults.slice(0, 10)});
	};
};

SearchController.prototype.status = function () {
	let self = this;
	return (req, res) => {
		return res.json({
			realEstateType: self.realEstateType,
			maxPrice: self.maxPrice,
			minArea: self.minArea,
			lastMasterViewPoint: self.lastMasterViewPoint
		});
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
		this.lastMasterViewPoint.lng,
		"</longitude><latitude>",
		this.lastMasterViewPoint.lat,
		"</latitude><altitude>",
		this.lastMasterViewPoint.alt,
		"</altitude><heading>",
		this.lastMasterViewPoint.heading,
		"</heading><tilt>",
		this.lastMasterViewPoint.tilt,
		"</tilt><range>",
		this.lastMasterViewPoint.range,
		"</range><altitudeMode>relativeToGround</altitudeMode><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>"].join('');

	// "flytoview=<LookAt><longitude>13.43173929843387</longitude><latitude>52.51231193328837</latitude><altitude>29.37</altitude><heading>40.929</heading><tilt>78.75</tilt><range>453</range><altitudeMode>relativeToGround</altitudeMode><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>"

	fs.writeFile("/tmp/query.txt", query);
};

function sortByDistance(list, centerLat, centerLng) {
	list.forEach(item => {
		item.distance = distanceInKm(centerLat, centerLng, item.address.wgs84Coordinate.latitude, item.address.wgs84Coordinate.longitude);
	});
	return list.sort((a,b) => {
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
	const self = this;
	const clientIp = req.headers['x-forwarded-for'] || MASTER;
	const isMaster = (clientIp === MASTER);
    logger.log(`request from ${clientIp} isMaster=${isMaster}`);

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

	const currentView = {
		lng: parseFloat(view[0]),
		lat: parseFloat(view[1]),
		alt: parseFloat(cam[2]),
		heading: parseFloat(view[4]),
		range: parseFloat(view[2]),
		tilt: parseFloat(view[3])
	};
	if (isMaster) {
		this.lastMasterViewPoint = _.clone(currentView);
	}

	let iconScale = 1.0;
	if (currentView.alt < 1500) {
		iconScale = 1.5;
	}
	if (currentView.alt < 400) {
		iconScale = 2.0;
	}
	if (currentView.alt < 300) {
		iconScale = 3.0;
	}
	if (currentView.alt < 200) {
		iconScale = 6.0;
	}
	if (currentView.alt < 100) {
		iconScale = 8.0;
	}

	const searchKey = [currentView.lng, currentView.lat, type, this.maxPrice, this.minArea].join('|');
	if (self.lastSearch.get(clientIp) === searchKey) {
		return res.sendStatus(304);
	}
	self.lastSearch.set(clientIp, searchKey, 60000);

	return this.searchService
		.search(currentView.lng, currentView.lat, type, this.maxPrice, this.minArea)
		.then(results => {
			logger.log(`search returned ${results.length} results`);
			results.forEach(item => {
				self.searchResultCache.set(item.id, item);
			});
			let allItemsFromCache = self.searchResultCache.values();
			let center = null;
			if (isMaster) {
				self.lastSearchResults = [];
				let tmpList = _.cloneDeep(self.searchResultCache.values());
				tmpList = sortByDistance(tmpList, currentView.lat, currentView.lng);
				for (let i=0; i<tmpList.length && i<10; i++) {
					self.lastSearchResults.push(tmpList[i]);
					tmpList[i].isLastSearch = true;
				}
				allItemsFromCache = tmpList;

				center = {
					latitude: currentView.lat,
					longitude: currentView.lng
				};
			}
			logger.log(`Items in cache: ${allItemsFromCache.length}`);
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
			if (isMaster) {
				self.lastSearchResults = [];
			}
			logger.log('search failed or error while processing! error:');
			logger.log(error);
			if (error.stack) {
				logger.log(error.stack);
			}
			return res.render('search-error-kml.mustache', {message: 'search failed! msg: '+error});
		});

};

module.exports = SearchController;
