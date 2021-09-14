"use strict";
exports.__esModule = true;
var controller_1 = require("./controller");
var AdministratorRouter = /** @class */ (function () {
    function AdministratorRouter() {
    }
    AdministratorRouter.prototype.setupRoutes = function (application, resources) {
        var administratorController = new controller_1["default"](resources);
        application.get("/administrator", administratorController.getAll.bind(administratorController));
        application.get("/administrator/:id", administratorController.getById.bind(administratorController));
        application.post("/administrator", administratorController.add.bind(administratorController));
        application.put("/administrator/:id", administratorController.edit.bind(administratorController));
        application["delete"]("/administrator/:id", administratorController["delete"].bind(administratorController));
    };
    return AdministratorRouter;
}());
exports["default"] = AdministratorRouter;
