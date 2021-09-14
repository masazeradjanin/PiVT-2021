"use strict";
exports.__esModule = true;
exports.IAddLocationValidator = exports.IAddCompanyValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IAddCompanyValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 8,
            maxLength: 64
        }
    },
    required: [
        "name",
    ],
    additionalProperties: false
});
exports.IAddCompanyValidator = IAddCompanyValidator;
var IAddLocationValidator = ajv.compile({
    type: "object",
    properties: {
        adress: {
            type: "string",
            minLength: 8,
            maxLength: 128
        },
        latitude: {
            type: "number",
            minimum: 0.00000001,
            multipleOf: 0.00000001
        },
        longitude: {
            type: "number",
            minimum: 0.00000001,
            multipleOf: 0.00000001
        }
    },
    required: [
        "adress",
        "latitude",
        "longitude",
    ],
    additionalProperties: false
});
exports.IAddLocationValidator = IAddLocationValidator;
