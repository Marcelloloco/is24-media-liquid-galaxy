'use strict';

const
	blueprint = require('@onehilltech/blueprint'),
	path = require ('path');

module.exports = {
	protocols: {
		http: {
			port: 5000
		}
	},

	statics: [
		path.resolve(__dirname, '../static')
	],

	middleware: {
		bodyParser: {
			json: {},
			urlencoded: {extended: false}
		},
		cookies: {}
	}
};
