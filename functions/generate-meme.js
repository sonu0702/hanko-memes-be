const utils = require("../utils");
const errors = require("../errors");
const db = require("../db_helper");
const controller = require("../contoller");
const dotenv = require('dotenv');
dotenv.config();
exports.handler = async function (event, context) {
    if (event.httpMethod == "OPTIONS") {
        return utils.fetchSuccessResponse("Authorised", {});
    }
    console.log(`event`, event);
    try {
        let user_id = await utils.authenticatedUserId(event);
        var body = JSON.parse(event.body || "{}");
        let imageurl = await controller.generateMeme(body, user_id)
        return utils.fetchSuccessResponse("success", { imageurl });
    } catch (error) {
        return utils.fetchErrorResponse(error);
    }
};
