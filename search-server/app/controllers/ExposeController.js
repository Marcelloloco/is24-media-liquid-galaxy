'use strict';

const
  blueprint = require('@onehilltech/blueprint'),
  ExposeService = require('../services/ExposeService'),
  logger = require("../utils/logger"),
  MASTER = '10.42.42.1';

function ExposeController() {
  blueprint.BaseController.call(this);
  this.exposeService = new ExposeService();
}

ExposeController.prototype.getById = function () {
  let self = this;
  return (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || MASTER;
    const isMaster = (clientIp === MASTER);
    logger.log(`request from ${clientIp} isMaster=${isMaster}`);
    let exposeId = req.params.exposeId;
    return this.exposeService
      .getExpose(isMaster, exposeId)
      .then(exposeData => {
          res.status(200);
          return res.json(exposeData["expose.expose"]);
        }
      )
      .catch(reason => {
          logger.log(`loading expose with id: ${exposeId} failed or error while processing! error: ${reason.message}`);
          res.status (500);
          return res.json({error: {message: reason.message}});
        }
      )
  };
};

blueprint.controller(ExposeController);

module.exports = ExposeController;