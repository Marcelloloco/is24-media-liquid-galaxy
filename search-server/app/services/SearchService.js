'use strict';

const
	promisedRequest = require('request-promise'),
	OAuth = require('oauth-1.0a'),
	crypto = require('crypto'),
	config = require('../configs/app.config'),
	logger = require('../utils/logger'),
	LRU = require("lru-cache");


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

function SearchService() {
	if (config.oauthConsumerSecret === 'xxxxxxxxxx') {
		throw new Error('oauthConsumerSecret not configured!');
	}
	this.oauth = OAuth({
		consumer: {
			key: config.oauthConsumerKey,
			secret: config.oauthConsumerSecret
		},
		signature_method: 'HMAC-SHA1',
		hash_function: function (base_string, key) {
			return crypto.createHmac('sha1', key).update(base_string).digest('base64');
		}
	});

	this.requestCache = LRU(50);
}

SearchService.prototype.search = function (isMaster, long, lat, type, maxPrice, minArea, onlyWith360Tours) {
	if (!this.oauth) {
		return Promise.reject('oauth not configured');
	}

	if (!isMaster) {
		logger.log('only searching on master!');
		return Promise.resolve([]);
	}

	let radius = 3;

	logger.log(`search for ${type} at lat:${lat} lng:${long} with radius:${radius}`);

	let searchParams = [
		`realestatetype=${type}`,
		`geocoordinates=${lat};${long};${radius}`,
		`price=-${maxPrice}`,
		`livingspace=${minArea}-`,
		`pageSize=200`
	].join('&');

	if(onlyWith360Tours) {
		searchParams += `&virtualTourType=ALL`;
	}
	let request_data = {
		url: 'https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/radius?'+searchParams,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	const cachedResults = this.requestCache.get(request_data.url);
	if (cachedResults) {
		logger.log('found results in cache!');
		return Promise.resolve(cachedResults);
	}

	logger.log('start search request...');
	request_data.headers = Object.assign(request_data.headers, this.oauth.toHeader(this.oauth.authorize(request_data, {})));
	request_data.json = true;

	const self = this;
	const latlngCache = {};
	return promisedRequest(request_data)
		.then(response => {
			// console.log('search successful! response:\n' + JSON.stringify(response, null, 2));
			let results = [];
			if (response && response['resultlist.resultlist'] && response['resultlist.resultlist']['resultlistEntries']) {
				const wrapper = response['resultlist.resultlist']['resultlistEntries'][0];
				if (wrapper && wrapper.resultlistEntry) {
					if (!Array.isArray(wrapper.resultlistEntry)) {
						let tmp = wrapper.resultlistEntry;
						wrapper.resultlistEntry = [];
						wrapper.resultlistEntry.push(tmp);
					}
					wrapper.resultlistEntry.forEach(entry => {
						entry = entry['resultlist.realEstate'];
						if (entry.address && entry.address.wgs84Coordinate && entry.price && entry.price.value) {
							//logger.log('search result entry: '+JSON.stringify(entry));
							let latLng = `${entry.address.wgs84Coordinate.latitude}|${entry.address.wgs84Coordinate.longitude}`;
							if (latlngCache[latLng]) {
								return;
							}
							latlngCache[latLng] = true;
							let pictureUrl = '';
							if (entry.titlePicture) {
								pictureUrl = entry.titlePicture['@xlink.href'];
								if (entry.titlePicture.titlePicture === "true" && entry.titlePicture.urls) {
									let urls = entry.titlePicture.urls[0].url;
									urls.forEach(url => {
										if (url['@scale'] === "SCALE_210x210") {
											pictureUrl = url['@href'];
										}
									});
								}
							}
							results.push({
								counter: results.length+1,
								id: entry['@id'],
								title: entry.title,
								titlePicture: pictureUrl,
								realtorLogo: entry.realtorLogo,
								address: entry.address,
								price: entry.price,
								numberOfRooms: entry.numberOfRooms,
								livingSpace: entry.livingSpace,
								builtInKitchen: entry.builtInKitchen,
								balcony: entry.balcony,
								garden: entry.garden
							});
						}
					});
				}
			}
			self.requestCache.set(request_data.url, results);
			return results;
		});
};

module.exports = SearchService;
