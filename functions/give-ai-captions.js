const utils = require("../utils");
const errors = require("../errors");
const db = require("../db_helper");
const controller = require("../contoller");

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
    let response = await controller.generateAICaptions(body);
    return utils.fetchSuccessResponse("success", response);
  } catch (error) {
    return utils.fetchErrorResponse(error);
  }
};
