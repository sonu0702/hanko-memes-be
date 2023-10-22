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
    let user_id = await utils.authenticatedUserId(event);
    console.log("user_id", user_id);
    var body = JSON.parse(event.body || "{}");
    let response = await db.listMyMemes(user_id)
    return utils.fetchSuccessResponse("success", response);
  } catch (error) {
    return utils.fetchErrorResponse(error);
  }
};
