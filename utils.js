const errors = require("./errors");
const logger = require("./logger");
const crypto = require("crypto");
const axios = require("axios");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

module.exports = {
  checkParams: (args, param_list) => {
    for (let x in param_list) {
      if (args[param_list[x]] == null) {
        throw new Error(
          JSON.stringify({ msg: "Missing params.", type: errors.BAD_REQUEST })
        );
      }
    }
  },
  fetchErrorResponse: (error) => {
    console.log("ERROR ==>");
    console.error(error);
    var status,
      message = error.message;

    try {
      message = JSON.parse(message);
    } catch (e) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: "FAILED", message: message, data: {} }),
      };
    }

    switch (message.type) {
      case errors.LOGIN_ERROR:
        status = 401;
        // message = message.msg;
        break;
      case errors.INTERNAL_ERROR:
        status = 500;
        // message = message.msg;
        break;
      case errors.BAD_REQUEST:
        status = 400;
        // message = message.msg;
        break;
      case errors.NOT_FOUND:
        status = 404;
        break;
      default:
        status = 500;
        // message = message.msg;
        break;
    }

    var res = {
      statusCode: status,
      headers,
      body: JSON.stringify({
        success: "FAILED",
        message: message.msg,
        data: {},
      }),
    };

    logger.error(res.body);

    return res;
  },
  fetchSuccessResponse: (message, data) => {
    var res = {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: "OK", message: message, data: data }),
    };

    logger.info(res.body);

    return res;
  },
  onlyDataResponse: (data) => {
    var res = {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

    logger.info(res.body);

    return res;
  },
  getPagination: (page, size) => {
    const limit = size ? size : 3;
    console.log(`limit`, limit);
    const from = page ? page * limit : 0;
    console.log(`from`, from);
    let to = page ? from + size - 1 : size - 1;
    console.log(`to`, to);
    return { from, to };
  }
};
