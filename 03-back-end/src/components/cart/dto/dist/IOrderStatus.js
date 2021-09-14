"use strict";
exports.__esModule = true;
exports.IOrderStatusValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IOrderStatusValidator = ajv.compile({
    type: "object",
    properties: {
        status: {
            type: "string",
            pattern: "^(pending|rejected|accepted|completed)$"
        }
    },
    required: [
        "status",
    ],
    additionalProperties: false
});
exports.IOrderStatusValidator = IOrderStatusValidator;
