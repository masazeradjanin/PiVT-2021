"use strict";
exports.__esModule = true;
exports.IAdministratorLoginValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IAdministratorLoginValidator = ajv.compile({
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 5,
            maxLength: 64
        },
        password: {
            type: "string",
            minLength: 6,
            maxLength: 255
        }
    },
    required: [
        "username",
        "password"
    ],
    additionalProperties: false
});
exports.IAdministratorLoginValidator = IAdministratorLoginValidator;
