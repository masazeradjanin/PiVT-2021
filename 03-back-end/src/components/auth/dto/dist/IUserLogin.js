"use strict";
exports.__esModule = true;
exports.IUserLoginValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IUserLoginValidator = ajv.compile({
    type: "object",
    properties: {
        email: {
            type: "string",
            minLength: 8,
            maxLength: 255
        },
        password: {
            type: "string",
            minLength: 6,
            maxLength: 255
        }
    },
    required: [
        "email",
        "password"
    ],
    additionalProperties: false
});
exports.IUserLoginValidator = IUserLoginValidator;
