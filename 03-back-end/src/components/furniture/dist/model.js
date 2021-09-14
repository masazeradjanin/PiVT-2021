"use strict";
exports.__esModule = true;
exports.FurniturePhoto = exports.FurniturePrice = void 0;
var Price = /** @class */ (function () {
    function Price() {
    }
    return Price;
}());
exports.FurniturePrice = Price;
var Photo = /** @class */ (function () {
    function Photo() {
    }
    return Photo;
}());
exports.FurniturePhoto = Photo;
var FurnitureModel = /** @class */ (function () {
    function FurnitureModel() {
        this.category = [];
        this.prices = [];
        this.photos = [];
    }
    return FurnitureModel;
}());
exports["default"] = FurnitureModel;
