"use strict";
exports.__esModule = true;
var BaseController = /** @class */ (function () {
    function BaseController(resources) {
        this.resources = resources;
    }
    Object.defineProperty(BaseController.prototype, "services", {
        get: function () {
            return this.resources.services;
        },
        enumerable: false,
        configurable: true
    });
    return BaseController;
}());
exports["default"] = BaseController;
