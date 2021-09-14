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
var BaseService = /** @class */ (function () {
    function BaseService(resources) {
        this.resources = resources;
    }
    Object.defineProperty(BaseService.prototype, "db", {
        get: function () {
            return this.resources.databaseConnection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseService.prototype, "services", {
        get: function () {
            return this.resources.services;
        },
        enumerable: false,
        configurable: true
    });
    BaseService.prototype.getAllFromTable = function (tableName, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var sql;
                        var _this = this;
                        return __generator(this, function (_a) {
                            sql = "SELECT * FROM " + tableName + ";";
                            this.db.execute(sql)
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var rows, lista, _i, rows_1, row, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            rows = result[0];
                                            lista = [];
                                            if (!Array.isArray(rows)) return [3 /*break*/, 4];
                                            _i = 0, rows_1 = rows;
                                            _c.label = 1;
                                        case 1:
                                            if (!(_i < rows_1.length)) return [3 /*break*/, 4];
                                            row = rows_1[_i];
                                            _b = (_a = lista).push;
                                            return [4 /*yield*/, this.adaptModel(row, options)];
                                        case 2:
                                            _b.apply(_a, [_c.sent()]);
                                            _c.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            resolve(lista);
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
    BaseService.prototype.getByIdFromTable = function (tableName, id, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var sql;
                        var _this = this;
                        return __generator(this, function (_a) {
                            sql = "SELECT * FROM " + tableName + " WHERE " + tableName + "_id =?;";
                            this.db.execute(sql, [id])
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var rows, columns, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            rows = result[0], columns = result[1];
                                            if (!Array.isArray(rows)) {
                                                resolve(null);
                                                return [2 /*return*/];
                                            }
                                            if (rows.length === 0) {
                                                resolve(null);
                                                return [2 /*return*/];
                                            }
                                            _a = resolve;
                                            return [4 /*yield*/, this.adaptModel(rows[0], options)];
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
    BaseService.prototype.getAllByFieldNameFromTable = function (tableName, fieldName, fieldValue, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var sql;
                        var _this = this;
                        return __generator(this, function (_a) {
                            sql = "SELECT * FROM " + tableName + " WHERE " + fieldName + " = ?;";
                            if (fieldValue === null) {
                                sql = "SELECT * FROM " + tableName + " WHERE " + fieldName + " IS NULL;";
                            }
                            this.db.execute(sql, [fieldValue])
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var rows, lista, _i, rows_2, row, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            rows = result[0];
                                            lista = [];
                                            if (!Array.isArray(rows)) return [3 /*break*/, 4];
                                            _i = 0, rows_2 = rows;
                                            _c.label = 1;
                                        case 1:
                                            if (!(_i < rows_2.length)) return [3 /*break*/, 4];
                                            row = rows_2[_i];
                                            _b = (_a = lista).push;
                                            return [4 /*yield*/, this.adaptModel(row, options)];
                                        case 2:
                                            _b.apply(_a, [_c.sent()]);
                                            _c.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4:
                                            resolve(lista);
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
    return BaseService;
}());
exports["default"] = BaseService;
