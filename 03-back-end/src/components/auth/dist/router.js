"use strict";
exports.__esModule = true;
var controller_1 = require("./controller");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
    }
    AuthRouter.prototype.setupRoutes = function (application, resources) {
        var authController = new controller_1["default"](resources);
        application.post("/auth/user/login", authController.userLogin.bind(authController));
        application.post("/auth/administrator/login", authController.administratorLogin.bind(authController));
        application.post("/auth/user/refresh", authController.userRefresh.bind(authController));
        application.post("/auth/administrator/refresh", authController.administratorRefresh.bind(authController));
        application.get("/auth/user/ok", auth_middleware_1["default"].getVerifier("user"), authController.sendOk.bind(authController));
        application.get("/auth/administrator/ok", auth_middleware_1["default"].getVerifier("administrator"), authController.sendOk.bind(authController));
    };
    return AuthRouter;
}());
exports["default"] = AuthRouter;
