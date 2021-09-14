"use strict";
exports.__esModule = true;
exports.IRefreshTokenValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IRefreshTokenValidator = ajv.compile({
    type: "object",
    properties: {
        refreshToken: {
            type: "string"
        }
    },
    required: ["refreshToken",],
    additionalProperties: false
});
exports.IRefreshTokenValidator = IRefreshTokenValidator;
