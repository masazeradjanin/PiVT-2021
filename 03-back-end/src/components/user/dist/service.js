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
var model_1 = require("./model");
var BaseService_1 = require("../../common/BaseService");
var bcrypt = require("bcrypt");
var UserModelAdapterOptions = /** @class */ (function () {
    function UserModelAdapterOptions() {
        this.loadOrders = false;
    }
    return UserModelAdapterOptions;
}());
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserService.prototype.adaptModel = function (data, options) {
        return __awaiter(this, void 0, Promise, function () {
            var item;
            return __generator(this, function (_a) {
                item = new model_1["default"]();
                item.userId = +(data === null || data === void 0 ? void 0 : data.user_id);
                item.email = data === null || data === void 0 ? void 0 : data.email;
                item.createdAt = new Date(data === null || data === void 0 ? void 0 : data.created_at);
                item.passwordHash = data === null || data === void 0 ? void 0 : data.password_hash;
                item.passwordResetCode = data === null || data === void 0 ? void 0 : data.password_reset_code;
                item.forename = data === null || data === void 0 ? void 0 : data.forename;
                item.surname = data === null || data === void 0 ? void 0 : data.surname;
                item.phoneNumber = data === null || data === void 0 ? void 0 : data.phone_number;
                item.postalAddress = data === null || data === void 0 ? void 0 : data.postal_address;
                item.isActive = +(data === null || data === void 0 ? void 0 : data.is_active) === 1;
                if (options.loadOrders) {
                }
                return [2 /*return*/, item];
            });
        });
    };
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllFromTable("user", {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getById = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByIdFromTable("user", userId, {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllByFieldNameFromTable("user", "email", email, {})];
                    case 1:
                        users = _a.sent();
                        if (!Array.isArray(users) || users.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, users[0]];
                }
            });
        });
    };
    UserService.prototype.add = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var passwordHash;
                        var _this = this;
                        return __generator(this, function (_a) {
                            passwordHash = bcrypt.hashSync(data.password, 11);
                            this.db.execute("INSERT\n                    user\n                SET\n                    email = ?,\n                    password_hash = ?,\n                    forename = ?,\n                    surname = ?,\n                    phone_number = ?,\n                    postal_address = ?,\n                    is_active = 1;", [
                                data.email,
                                passwordHash,
                                data.forename,
                                data.surname,
                                data.phoneNumber,
                                data.postalAddress,
                            ])
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var newUserId, _a;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            newUserId = +((_b = res[0]) === null || _b === void 0 ? void 0 : _b.insertId);
                                            _a = resolve;
                                            return [4 /*yield*/, this.getById(newUserId)];
                                        case 1:
                                            _a.apply(void 0, [_c.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (error) {
                                resolve({
                                    errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                    errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                });
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    UserService.prototype.edit = function (userId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var currentUser, passwordHash;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getById(userId)];
                                case 1:
                                    currentUser = _a.sent();
                                    if (currentUser === null) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    passwordHash = bcrypt.hashSync(data.password, 11);
                                    this.db.execute("UPDATE\n                    user\n                 SET\n                    email = ?,\n                    password_hash = ?,\n                    forename = ?,\n                    surname = ?,\n                    phone_number = ?,\n                    postal_address = ?,\n                    is_active = ?\n                 WHERE\n                    user_id = ?;", [
                                        data.email,
                                        passwordHash,
                                        data.forename,
                                        data.surname,
                                        data.phoneNumber,
                                        data.postalAddress,
                                        data.isActive,
                                        userId,
                                    ])
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.getById(userId)];
                                                case 1:
                                                    _a.apply(void 0, [_b.sent()]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })["catch"](function (error) {
                                        resolve({
                                            errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                            errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                        });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    UserService.prototype["delete"] = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.db.execute("DELETE FROM user WHERE user_id = ?;", [userId,])
                                .then(function (res) {
                                var _a;
                                resolve({
                                    errorCode: 0,
                                    errorMessage: "Deleted " + ((_a = res[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) + " records."
                                });
                            })["catch"](function (error) {
                                resolve({
                                    errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                    errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                });
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    return UserService;
}(BaseService_1["default"]));
exports["default"] = UserService;
