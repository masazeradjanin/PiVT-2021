"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var BaseController_1 = require("../../common/BaseController");
var IAddUser_1 = require("./dto/IAddUser");
var IEditUser_1 = require("./dto/IEditUser");
var model_1 = require("./model");
var nodemailer = require("nodemailer");
var dev_1 = require("../../config/dev");
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).send;
                        return [4 /*yield*/, this.services.userService.getAll()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = +(req.params.id);
                        if (id <= 0)
                            return [2 /*return*/, res.status(400).send("The ID value cannot be smaller than 1.")];
                        return [4 /*yield*/, this.services.userService.getById(id)];
                    case 1:
                        item = _a.sent();
                        if (item === null)
                            return [2 /*return*/, res.sendStatus(404)];
                        res.send(item);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.add = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!IAddUser_1.IAddUserValidator(req.body)) {
                            return [2 /*return*/, res.status(400).send(IAddUser_1.IAddUserValidator.errors)];
                        }
                        return [4 /*yield*/, this.services.userService.add(req.body)];
                    case 1:
                        result = _a.sent();
                        res.send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = +(req.params.id);
                        if (id <= 0)
                            return [2 /*return*/, res.status(400).send("The ID value cannot be smaller than 1.")];
                        if (!IEditUser_1.IEditUserValidator(req.body)) {
                            return [2 /*return*/, res.status(400).send(IEditUser_1.IEditUserValidator.errors)];
                        }
                        return [4 /*yield*/, this.services.userService.edit(id, req.body)];
                    case 1:
                        result = _a.sent();
                        if (result === null)
                            return [2 /*return*/, res.sendStatus(404)];
                        res.send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = +(req.params.id);
                        if (id <= 0)
                            return [2 /*return*/, res.status(400).send("The ID value cannot be smaller than 1.")];
                        _b = (_a = res).send;
                        return [4 /*yield*/, this.services.userService["delete"](id)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.sendRegistrationEmail = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var transport = nodemailer.createTransport({
                            host: dev_1["default"].mail.hostname,
                            port: dev_1["default"].mail.port,
                            secure: dev_1["default"].mail.secure,
                            auth: {
                                user: dev_1["default"].mail.username,
                                pass: dev_1["default"].mail.password
                            },
                            debug: dev_1["default"].mail.debug
                        }, {
                            from: dev_1["default"].mail.fromEmail
                        });
                        transport.sendMail({
                            to: data.email,
                            subject: "Account registration notification",
                            html: "<!doctype html>\n                        <html>\n                            <head>\n                                <meta charset=\"utf-8\">\n                            </head>\n                            <body>\n                                <p>\n                                Dear " + data.forename + " " + data.surname + ",<br>\n                                Your account was successfully created.\n                                </p>\n                                <p>\n                                    You can log in to the portal with your email and password.\n                                </p>\n                            </body>\n                        </html>"
                        })
                            .then(function () {
                            transport.close();
                            resolve({
                                errorCode: 0,
                                errorMessage: ""
                            });
                        })["catch"](function (error) {
                            transport.close();
                            resolve({
                                errorCode: -1,
                                errorMessage: error === null || error === void 0 ? void 0 : error.message
                            });
                        });
                    })];
            });
        });
    };
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, mailResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!IAddUser_1.IAddUserValidator(req.body)) {
                            return [2 /*return*/, res.status(400).send(IAddUser_1.IAddUserValidator.errors)];
                        }
                        return [4 /*yield*/, this.services.userService.add(req.body)];
                    case 1:
                        result = _a.sent();
                        if (!(result instanceof model_1["default"])) {
                            if (result.errorMessage.includes("uq_user_email")) {
                                return [2 /*return*/, res.status(400).send("An account with this email already exists.")];
                            }
                            return [2 /*return*/, res.status(400).send(result)];
                        }
                        return [4 /*yield*/, this.sendRegistrationEmail(result)];
                    case 2:
                        mailResult = _a.sent();
                        if (mailResult.errorCode !== 0) {
                            return [2 /*return*/, res.status(400).send("E-mail sending failed.")];
                        }
                        res.send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}(BaseController_1["default"]));
exports["default"] = UserController;
