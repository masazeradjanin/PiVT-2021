"use strict";
exports.__esModule = true;
exports.IAddAdministratorValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IAddAdministratorValidator = ajv.compile({
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 3,
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
        "password",
    ],
    additionalProperties: false
});
exports.IAddAdministratorValidator = IAddAdministratorValidator;
