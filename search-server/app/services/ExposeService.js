'use strict';

const
  promisedRequest = require('request-promise'),
  OAuth = require('oauth-1.0a'),
  crypto = require('crypto'),
  config = require('../configs/app.config'),
  logger = require('../utils/logger'),
  LRU = require("lru-cache");


function ExposeService() {
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

ExposeService.prototype.getExpose = function (isMaster, exposeId) {


  if (!this.oauth) {
    return Promise.reject('oauth not configured');
  }

  if (!isMaster) {
    logger.log('only searching on master!');
    return Promise.resolve([]);
  }

  logger.log(`get expose ${exposeId}`);

  let request_data = {
    url: `https://rest.immobilienscout24.de/restapi/api/search/v1.0/expose/${exposeId}`,
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

  logger.log('start expose request...');
  request_data.headers = Object.assign(request_data.headers, this.oauth.toHeader(this.oauth.authorize(request_data, {})));
  request_data.json = true;

  const self = this;
  return promisedRequest(request_data)
    .then(responseBody => {
      self.requestCache.set(request_data.url, responseBody);
      return responseBody;
    });
};

module.exports = ExposeService;