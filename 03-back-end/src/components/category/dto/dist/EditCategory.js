"use strict";
exports.__esModule = true;
exports.IEditCategoryValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IEditCategoryValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 128
        },
        imagePath: {
            type: "string",
            maxLength: 128,
            pattern: "\.(png|jpg)$"
        }
    },
    required: ["name", "imagePath",],
    additionalProperties: false
});
exports.IEditCategoryValidator = IEditCategoryValidator;
