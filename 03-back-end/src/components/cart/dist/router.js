"use strict";
exports.__esModule = true;
var controller_1 = require("./controller");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var CartRouter = /** @class */ (function () {
    function CartRouter() {
    }
    CartRouter.prototype.setupRoutes = function (application, resources) {
        var cartController = new controller_1["default"](resources);
        application.get("/cart", auth_middleware_1["default"].getVerifier("user"), cartController.getCurrentUserCart.bind(cartController));
        application.post("/cart", auth_middleware_1["default"].getVerifier("user"), cartController.addToCart.bind(cartController));
        application.put("/cart", auth_middleware_1["default"].getVerifier("user"), cartController.setInCart.bind(cartController));
        application.post("/cart/order", auth_middleware_1["default"].getVerifier("user"), cartController.makeOrder.bind(cartController));
        application.get("/cart/order/my", auth_middleware_1["default"].getVerifier("user"), cartController.getAllOrdersForCurrentUser.bind(cartController));
        application.get("/order", auth_middleware_1["default"].getVerifier("administrator"), cartController.getAllOrders.bind(cartController));
        application.get("/user/:uid/order", auth_middleware_1["default"].getVerifier("administrator"), cartController.getAllOrdersByUserId.bind(cartController));
        application.put("/cart/:cid", auth_middleware_1["default"].getVerifier("administrator"), cartController.setStatus.bind(cartController));
    };
    return CartRouter;
}());
exports["default"] = CartRouter;
