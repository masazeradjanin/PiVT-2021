"use strict";
exports.__esModule = true;
exports.IEditLocationValidator = exports.IEditCompanyValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IEditCompanyValidator = ajv.compile({
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
exports.IEditCompanyValidator = IEditCompanyValidator;
var IEditLocationValidator = ajv.compile({
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
exports.IEditLocationValidator = IEditLocationValidator;
