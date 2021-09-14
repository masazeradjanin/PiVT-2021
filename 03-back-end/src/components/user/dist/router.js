"use strict";
exports.__esModule = true;
var controller_1 = require("./controller");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
    }
    UserRouter.prototype.setupRoutes = function (application, resources) {
        var userController = new controller_1["default"](resources);
        application.get("/user", userController.getAll.bind(userController));
        application.get("/user/:id", userController.getById.bind(userController));
        application.post("/user", userController.add.bind(userController));
        application.put("/user/:id", userController.edit.bind(userController));
        application["delete"]("/user/:id", userController["delete"].bind(userController));
        application.post("/auth/user/register", userController.register.bind(userController));
    };
    return UserRouter;
}());
exports["default"] = UserRouter;
