"use strict";
exports.__esModule = true;
exports.IEditAdministratorValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IEditAdministratorValidator = ajv.compile({
    type: "object",
    properties: {
        password: {
            type: "string",
            minLength: 6,
            maxLength: 255
        },
        isActive: {
            type: "boolean"
        }
    },
    required: [
        "password",
        "isActive",
    ],
    additionalProperties: false
});
exports.IEditAdministratorValidator = IEditAdministratorValidator;
