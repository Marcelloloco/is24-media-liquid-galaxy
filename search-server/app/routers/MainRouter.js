'use strict';

var cors = require ('cors');

module.exports = {
	'/search-enable': {
		get: {
			before : [
				cors()
			],
			action: 'SearchController@enableSearch'
		}
	},
	'/status': {
		get: {
			before : [
				cors()
			],
			action: 'SearchController@status'
		}
	},
	'/search-disable': {
		get: {
			before : [
				cors()
			],
			action: 'SearchController@disableSearch'
		}
	},
	'/last-search': {
		get: {
			before : [
				cors()
			],
			action: 'SearchController@getLastSearch'
		}
	},
	'/search': {
		get: {
			before : [
				cors()
			],
			action: 'SearchController@search'
		}
	},
  '/expose/:exposeId': {
    get: {
      before : [
        cors()
      ],
      action: 'ExposeController@getById'
    }
  }
};
