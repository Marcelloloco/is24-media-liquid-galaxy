'use strict';

const
	promisedRequest = require('request-promise'),
	OAuth = require('oauth-1.0a'),
	crypto = require('crypto'),
	config = require('../configs/app.config');


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

}

// SearchService.prototype.search = function (north, east, south, west, type) {
SearchService.prototype.search = function (long, lat, type) {
	// let long = ((east - west) / 2) + west;
	// let lat = ((north - south) / 2) + south;
	// let radius = distanceInKm(east, north, west, south) / 2;
	// radius = Math.min(radius, 2.0);
	// radius = Math.max(radius, 0.2);

	let radius = 3;

	// console.log(`lat:${lat} lng:${long} radius:${radius}`);

	let request_data = {
		url: `https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/radius?realestatetype=${type}&geocoordinates=${lat};${long};${radius}&pageSize=200`,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	request_data.headers = Object.assign(request_data.headers, this.oauth.toHeader(this.oauth.authorize(request_data, {})));
	request_data.json = true;

	return promisedRequest(request_data)
		.then(response => {
			// console.log('search successful! response:\n' + JSON.stringify(response, null, 2));
			let results = [];
			if (response && response['resultlist.resultlist'] && response['resultlist.resultlist']['resultlistEntries']) {
				const wrapper = response['resultlist.resultlist']['resultlistEntries'][0];
				if (wrapper && wrapper.resultlistEntry) {
					wrapper.resultlistEntry.forEach(entry => {
						entry = entry['resultlist.realEstate'];
						if (entry.address && entry.address.wgs84Coordinate) {
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
								address: entry.address
							});
						}
					});
				}
			}
			return results;
		});
};

module.exports = SearchService;
