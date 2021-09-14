"use strict";
exports.__esModule = true;
exports.OrderModel = exports.CartFurnitureModel = void 0;
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    return OrderModel;
}());
exports.OrderModel = OrderModel;
var CartFurnitureModel = /** @class */ (function () {
    function CartFurnitureModel() {
    }
    return CartFurnitureModel;
}());
exports.CartFurnitureModel = CartFurnitureModel;
var CartModel = /** @class */ (function () {
    function CartModel() {
        this.furniture = [];
        this.order = null;
    }
    return CartModel;
}());
exports["default"] = CartModel;
