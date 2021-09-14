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
var AdministratorModelAdapterOptions = /** @class */ (function () {
    function AdministratorModelAdapterOptions() {
    }
    return AdministratorModelAdapterOptions;
}());
var AdministratorService = /** @class */ (function (_super) {
    __extends(AdministratorService, _super);
    function AdministratorService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdministratorService.prototype.adaptModel = function (data, options) {
        return __awaiter(this, void 0, Promise, function () {
            var item;
            return __generator(this, function (_a) {
                item = new model_1["default"]();
                item.administratorId = +(data === null || data === void 0 ? void 0 : data.administrator_id);
                item.username = data === null || data === void 0 ? void 0 : data.username;
                item.passwordHash = data === null || data === void 0 ? void 0 : data.password_hash;
                item.isActive = +(data === null || data === void 0 ? void 0 : data.is_active) === 1;
                return [2 /*return*/, item];
            });
        });
    };
    AdministratorService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllFromTable("administrator", {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdministratorService.prototype.getById = function (administratorId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByIdFromTable("administrator", administratorId, {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdministratorService.prototype.add = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var passwordHash;
                        var _this = this;
                        return __generator(this, function (_a) {
                            passwordHash = bcrypt.hashSync(data.password, 11);
                            this.db.execute("INSERT administrator SET username = ?, password_hash = ?, is_active = 1;", [
                                data.username,
                                passwordHash,
                            ])
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var newAdministratorId, _a;
                                var _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            newAdministratorId = +((_b = res[0]) === null || _b === void 0 ? void 0 : _b.insertId);
                                            _a = resolve;
                                            return [4 /*yield*/, this.getById(newAdministratorId)];
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
    AdministratorService.prototype.edit = function (administratorId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var currentAdministrator, passwordHash;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getById(administratorId)];
                                case 1:
                                    currentAdministrator = _a.sent();
                                    if (currentAdministrator === null) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    passwordHash = bcrypt.hashSync(data.password, 11);
                                    this.db.execute("UPDATE administrator\n                 SET password_hash = ?, is_active = ?\n                 WHERE administrator_id = ?;", [
                                        passwordHash,
                                        data.isActive ? 1 : 0,
                                        administratorId,
                                    ])
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.getById(administratorId)];
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
    AdministratorService.prototype["delete"] = function (administratorId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.db.execute("DELETE FROM administrator WHERE administrator_id = ?;", [administratorId,])
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
    AdministratorService.prototype.getByUsername = function (username) {
        return __awaiter(this, void 0, Promise, function () {
            var administrators;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllByFieldNameFromTable("administrator", "username", username, {})];
                    case 1:
                        administrators = _a.sent();
                        if (!Array.isArray(administrators) || administrators.length === 0) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, administrators[0]];
                }
            });
        });
    };
    return AdministratorService;
}(BaseService_1["default"]));
exports["default"] = AdministratorService;
