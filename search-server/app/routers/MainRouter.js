'use strict';

module.exports = {
	'/search-enable': {
		get: {
			action: 'SearchController@enableSearch'
		}
	},
	'/search-disable': {
		get: {
			action: 'SearchController@disableSearch'
		}
	},
	'/last-search': {
		get: {
			action: 'SearchController@getLastSearch'
		}
	},
	'/search': {
		get: {
			action: 'SearchController@search'
		}
	},

	'/search-house-buy': {
		get: {
			action: 'SearchController@searchHouseBuy'
		}
	},
	'/search-house-rent': {
		get: {
			action: 'SearchController@searchHouseRent'
		}
	},
	'/search-apartment-buy': {
		get: {
			action: 'SearchController@searchApartmentBuy'
		}
	},
	'/search-apartment-rent': {
		get: {
			action: 'SearchController@searchApartmentRent'
		}
	}
};
