"use strict";
exports.__esModule = true;
var controller_1 = require("./controller");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var CategoryRouter = /** @class */ (function () {
    function CategoryRouter() {
    }
    CategoryRouter.prototype.setupRoutes = function (application, resources) {
        var categoryController = new controller_1["default"](resources);
        application.get("/category", auth_middleware_1["default"].getVerifier("administrator", "user"), categoryController.getAll.bind(categoryController));
        application.get("/category/:id", auth_middleware_1["default"].getVerifier("administrator", "user"), categoryController.getById.bind(categoryController));
        application.post("/category", auth_middleware_1["default"].getVerifier("administrator", "user"), categoryController.add.bind(categoryController));
        application.put("/category/:id", auth_middleware_1["default"].getVerifier("administrator", "user"), categoryController.edit.bind(categoryController));
        application["delete"]("/category/:id", auth_middleware_1["default"].getVerifier("administrator", "user"), categoryController.deleteById.bind(categoryController));
    };
    return CategoryRouter;
}());
exports["default"] = CategoryRouter;
