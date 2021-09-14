"use strict";
exports.__esModule = true;
var controller_1 = require("./controller");
var CompanyRouter = /** @class */ (function () {
    function CompanyRouter() {
    }
    CompanyRouter.prototype.setupRoutes = function (application, resources) {
        var companyController = new controller_1["default"](resources);
        application.get("/company", companyController.getAll.bind(companyController));
        application.get("/company/:id", companyController.getById.bind(companyController));
        application.post("/company", companyController.add.bind(companyController));
        application.put("/company/:id", companyController.edit.bind(companyController));
        application["delete"]("/company/:id", companyController.deleteById.bind(companyController));
    };
    return CompanyRouter;
}());
exports["default"] = CompanyRouter;
