"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var dev_1 = require("./config/dev");
var router_1 = require("./components/category/router");
var mysql2 = require("mysql2/promise");
var router_2 = require("./router");
var service_1 = require("./components/category/service");
var fileUpload = require("express-fileupload");
var service_2 = require("./components/administrator/service");
var router_3 = require("./components/administrator/router");
var service_3 = require("./components/user/service");
var router_4 = require("./components/user/router");
var router_5 = require("./components/auth/router");
var service_4 = require("./components/cart/service");
var router_6 = require("./components/cart/router");
var router_7 = require("./components/furniture/router");
var service_5 = require("./components/furniture/service");
var service_6 = require("./components/company/service");
var router_8 = require("./components/company/router");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var application, resources, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    application = express();
                    application.use(cors({
                        origin: "http://localhost:3000",
                        credential: true
                    }));
                    application.use(express.json());
                    application.use(fileUpload({
                        limits: {
                            fileSize: dev_1["default"].fileUpload.maxSize,
                            files: dev_1["default"].fileUpload.maxFiles
                        },
                        useTempFiles: true,
                        tempFileDir: dev_1["default"].fileUpload.temporaryDirectory,
                        uploadTimeout: dev_1["default"].fileUpload.timeout,
                        safeFileNames: true,
                        preserveExtension: true,
                        createParentPath: true,
                        abortOnLimit: true
                    }));
                    _a = {};
                    return [4 /*yield*/, mysql2.createConnection({
                            host: dev_1["default"].database.host,
                            port: dev_1["default"].database.port,
                            user: dev_1["default"].database.user,
                            password: dev_1["default"].database.password,
                            database: dev_1["default"].database.database,
                            charset: dev_1["default"].database.charset,
                            timezone: dev_1["default"].database.timezone,
                            supportBigNumbers: true
                        })];
                case 1:
                    resources = (_a.databaseConnection = _b.sent(),
                        _a);
                    resources.databaseConnection.connect();
                    resources.services = {
                        categoryService: new service_1["default"](resources),
                        furnitureService: new service_5["default"](resources),
                        administratorService: new service_2["default"](resources),
                        userService: new service_3["default"](resources),
                        cartService: new service_4["default"](resources),
                        companyService: new service_6["default"](resources)
                    };
                    application.use(dev_1["default"].server.static.route, express.static(dev_1["default"].server.static.path, {
                        index: dev_1["default"].server.static.index,
                        cacheControl: dev_1["default"].server.static.cacheControl,
                        maxAge: dev_1["default"].server.static.maxAge,
                        etag: dev_1["default"].server.static.etag,
                        dotfiles: dev_1["default"].server.static.dotfiles
                    }));
                    router_2["default"].setupRoutes(application, resources, [
                        new router_1["default"](),
                        new router_7["default"](),
                        new router_3["default"](),
                        new router_4["default"](),
                        new router_5["default"](),
                        new router_6["default"](),
                        new router_8["default"](),
                    ]);
                    application.use(function (req, res) {
                        res.sendStatus(404);
                    });
                    application.use(function (err, req, res, next) {
                        res.status(err.status).send(err.type);
                    });
                    application.listen(dev_1["default"].server.port);
                    return [2 /*return*/];
            }
        });
    });
}
main();
