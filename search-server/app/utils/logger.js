'use strict';

module.exports = {
	log : function (args) {
		console.log(new Date().toISOString() + ' ' + args);
	}
};