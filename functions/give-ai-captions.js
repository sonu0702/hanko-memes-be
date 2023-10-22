const utils = require("../utils");
const errors = require("../errors");
const db = require("../db_helper");

const dotenv = require('dotenv');
dotenv.config();
/**
 * event.body  : {
 *      discord_id  : string,
 *      wallet_address : string,
 *      tribe : string
 * }
 * Response : {"success":"OK","message":"user whitelisted","data":<req.body>}
 */
exports.handler = async function (event, context) {
  if (event.httpMethod == "OPTIONS") {
    return utils.fetchSuccessResponse("Authorised", {});
  }
  console.log(`event`, event);
  try {
    var body = JSON.parse(event.body || "{}");
    if(process.env.USE_AI){

    }
    let randomId = crypto.randomInt(captions.length);
    let response = captions[randomId];
    return utils.fetchSuccessResponse("success", response);
  } catch (error) {
    return utils.fetchErrorResponse(error);
  }
};
