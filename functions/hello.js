const { stringify } = require("querystring");
const utils = require("../utils");
const errors = require("../errors");
const API_KEY = "5ece4686-aec7-4ade-a63c-821b64d4da5a";
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
    // let api_key = event.headers["x-api-key"] ?? event.headers["api_key"];

    // if (!api_key) {
    //   return utils.fetchErrorResponse({
    //     message: "NOT_FOUND",
    //     type: errors.NOT_FOUND,
    //   });
    // }
    // if (api_key != API_KEY) {
    //   return utils.fetchErrorResponse({
    //     message: "api_key is incorrect",
    //     type: errors.AUTHENTICATION_ERROR,
    //   });
    // }
    var body = JSON.parse(event.body || "{}");

    // let end = new Date();
    // let start = new Date();
    // start.setDate(start.getDate() - 7);
    // try {
    //   let startDateEvent = new Date(body.start_date);
    //   let endDateEvent = new Date(body.end_time);
    //   start = startDateEvent ?? start;
    //   end = endDateEvent ?? end;
    // } catch (error) {
    // }
    let data = {health : 'ok'}
    return utils.fetchSuccessResponse("success", data);
  } catch (error) {
    return utils.fetchErrorResponse(error);
  }
};

async function FetchDateWisePebbleDistribution() {
  const allUsersWalletBalances = await wallet.fetchAllUsersWalletBalance();
}
