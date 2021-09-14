"use strict";
exports.__esModule = true;
exports.IAddUserValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IAddUserValidator = ajv.compile({
    type: "object",
    properties: {
        email: {
            type: "string",
            minLength: 8,
            maxLength: 128
        },
        password: {
            type: "string",
            minLength: 6,
            maxLength: 255
        },
        forename: {
            type: "string",
            minLength: 2,
            maxLength: 64
        },
        surname: {
            type: "string",
            minLength: 2,
            maxLength: 64
        },
        phoneNumber: {
            type: "string",
            minLength: 5,
            maxLength: 24
        },
        postalAddress: {
            type: "string",
            minLength: 10,
            maxLength: 64 * 1024
        }
    },
    required: [
        "email",
        "password",
        "forename",
        "surname",
        "phoneNumber",
        "postalAddress",
    ],
    additionalProperties: false
});
exports.IAddUserValidator = IAddUserValidator;
