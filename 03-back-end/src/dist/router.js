"use strict";
exports.__esModule = true;
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.setupRoutes = function (application, resources, routers) {
        for (var _i = 0, routers_1 = routers; _i < routers_1.length; _i++) {
            var router = routers_1[_i];
            router.setupRoutes(application, resources);
        }
    };
    return Router;
}());
exports["default"] = Router;
