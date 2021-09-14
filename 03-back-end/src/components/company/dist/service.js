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
var BaseService_1 = require("../../common/BaseService");
var model_1 = require("./model");
var CompanyModelAdapterOptions = /** @class */ (function () {
    function CompanyModelAdapterOptions() {
        this.loadLocation = false;
    }
    return CompanyModelAdapterOptions;
}());
var CompanyService = /** @class */ (function (_super) {
    __extends(CompanyService, _super);
    function CompanyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompanyService.prototype.adaptModel = function (data, options) {
        return __awaiter(this, void 0, Promise, function () {
            var item, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        item = new model_1["default"]();
                        item.companyId = +(data === null || data === void 0 ? void 0 : data.company_id);
                        item.name = data === null || data === void 0 ? void 0 : data.name;
                        if (!options.loadLocation) return [3 /*break*/, 2];
                        _a = item;
                        return [4 /*yield*/, this.getLocationByCompanyId(item.locationId)];
                    case 1:
                        _a.location = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, item];
                }
            });
        });
    };
    CompanyService.prototype.getLocationByCompanyId = function (companyId) {
        return __awaiter(this, void 0, Promise, function () {
            var rows, location;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.execute("SELECT * FROM `location` WHERE company_id = ?;", [companyId,])];
                    case 1:
                        rows = (_a.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, null];
                        }
                        location = rows[0];
                        return [2 /*return*/, {
                                locationId: +(location === null || location === void 0 ? void 0 : location.location_id),
                                address: location === null || location === void 0 ? void 0 : location.address,
                                latitude: location === null || location === void 0 ? void 0 : location.latitude,
                                logitude: location === null || location === void 0 ? void 0 : location.longitude
                            }];
                }
            });
        });
    };
    CompanyService.prototype.getAll = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllFromTable("company", options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CompanyService.prototype.getById = function (companyId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByIdFromTable("company", companyId, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CompanyService.prototype.add = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var sql;
                        var _this = this;
                        return __generator(this, function (_a) {
                            sql = "INSERT company SET name = ?;";
                            this.db.execute(sql, [data.name])
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var insertInfo, newCompanyId, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            insertInfo = result[0];
                                            newCompanyId = +(insertInfo === null || insertInfo === void 0 ? void 0 : insertInfo.insertId);
                                            _a = resolve;
                                            return [4 /*yield*/, this.getById(newCompanyId)];
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
                        });
                    }); })];
            });
        });
    };
    CompanyService.prototype["delete"] = function (companyId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var sql = "DELETE FROM company WHERE company_id = ?;";
                        _this.db.execute(sql, [companyId])
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var deleteInfo, deletedRowCount;
                            return __generator(this, function (_a) {
                                deleteInfo = result[0];
                                deletedRowCount = +(deleteInfo === null || deleteInfo === void 0 ? void 0 : deleteInfo.affectedRows);
                                if (deletedRowCount === 1) {
                                    resolve({
                                        errorCode: 0,
                                        errorMessage: "One record is deleted!"
                                    });
                                }
                                else {
                                    resolve({
                                        errorCode: -1,
                                        errorMessage: "Record could not be deleted!"
                                    });
                                }
                                return [2 /*return*/];
                            });
                        }); })["catch"](function (error) {
                            resolve({
                                errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                            });
                        });
                    })];
            });
        });
    };
    CompanyService.prototype.edit = function (companyId, data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(companyId)];
                    case 1:
                        result = _a.sent();
                        if (result === null) {
                            return [2 /*return*/, null];
                        }
                        if (!(result instanceof model_1["default"])) {
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var sql;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    sql = "UPDATE company SET name = ? WHERE company_id=?;";
                                    this.db.execute(sql, [data.name, companyId])
                                        .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.getById(companyId, options)];
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
                                });
                            }); })];
                }
            });
        });
    };
    return CompanyService;
}(BaseService_1["default"]));
exports["default"] = CompanyService;
