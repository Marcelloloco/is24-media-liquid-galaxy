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
	}
};
