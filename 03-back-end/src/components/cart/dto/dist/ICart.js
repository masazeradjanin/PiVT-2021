"use strict";
exports.__esModule = true;
exports.IAddToCartValidator = void 0;
var ajv_1 = require("ajv");
var ajv = new ajv_1["default"]();
var IAddToCartValidator = ajv.compile({
    type: "object",
    properties: {
        furnitureId: {
            type: "integer",
            minimum: 1
        },
        quantity: {
            type: "integer",
            minimum: 0
        }
    },
    required: [
        "furnitureId",
        "quantity",
    ],
    additionalProperties: false
});
exports.IAddToCartValidator = IAddToCartValidator;
