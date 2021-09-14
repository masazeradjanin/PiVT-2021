"use strict";
exports.__esModule = true;
var controller_1 = require("./controller");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var FurnitureRouter = /** @class */ (function () {
    function FurnitureRouter() {
    }
    FurnitureRouter.prototype.setupRoutes = function (application, resources) {
        var furnitureController = new controller_1["default"](resources);
        application.get('/furniture/:id', auth_middleware_1["default"].getVerifier("user", "administrator"), furnitureController.getById.bind(furnitureController));
        application.post('/furniture', auth_middleware_1["default"].getVerifier("administrator"), furnitureController.add.bind(furnitureController));
        application.put('/furniture/:id', auth_middleware_1["default"].getVerifier("administrator"), furnitureController.edit.bind(furnitureController));
        application["delete"]('/furniture/:id', auth_middleware_1["default"].getVerifier("administrator"), furnitureController["delete"].bind(furnitureController));
        application["delete"]('/furniture/:aid/photo/:pid', auth_middleware_1["default"].getVerifier("administrator"), furnitureController.deleteFurniturePhoto.bind(furnitureController));
        application.post('/furniture/:id/photo', auth_middleware_1["default"].getVerifier("administrator"), furnitureController.addFurniturePhotos.bind(furnitureController));
        application.get("/category/:id/furniture", auth_middleware_1["default"].getVerifier("user", "administrator"), furnitureController.getAllByCategoryId.bind(furnitureController));
    };
    return FurnitureRouter;
}());
exports["default"] = FurnitureRouter;
