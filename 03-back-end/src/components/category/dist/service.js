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
var CategoryModelAdapterOptions = /** @class */ (function () {
    function CategoryModelAdapterOptions() {
        this.loadParentCategory = false;
        this.loadSubcategories = false;
    }
    return CategoryModelAdapterOptions;
}());
var CategoryService = /** @class */ (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryService.prototype.adaptModel = function (row, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var item, data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = new model_1["default"]();
                        item.categoryId = +(row === null || row === void 0 ? void 0 : row.category_id);
                        item.name = row === null || row === void 0 ? void 0 : row.name;
                        item.imagePath = row === null || row === void 0 ? void 0 : row.image_path;
                        item.parentCategoryId = row === null || row === void 0 ? void 0 : row.parent__category_id;
                        if (!(options.loadParentCategory && item.parentCategoryId !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getById(item.parentCategoryId)];
                    case 1:
                        data = _a.sent();
                        if (data instanceof model_1["default"]) {
                            item.parentCategory = data;
                        }
                        _a.label = 2;
                    case 2:
                        if (!options.loadSubcategories) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getAllByParentCategoryId(item.categoryId, { loadSubcategories: true
                            })];
                    case 3:
                        data = _a.sent();
                        if (Array.isArray(data)) {
                            item.subCategories = data;
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, item];
                }
            });
        });
    };
    CategoryService.prototype.getAll = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllByFieldNameFromTable('category', 'parent__category_id', null, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CategoryService.prototype.getAllByParentCategoryId = function (parentCategoryId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllByFieldNameFromTable('category', 'parent__category_id', parentCategoryId, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CategoryService.prototype.getById = function (categoryId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getByIdFromTable("category", categoryId, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CategoryService.prototype.add = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var sql;
                        var _this = this;
                        var _a;
                        return __generator(this, function (_b) {
                            sql = "INSERT category SET name = ?, image_path = ?, parent_category_id = ?;";
                            this.db.execute(sql, [data.name, data.imagePath, (_a = data.parentCategoryId) !== null && _a !== void 0 ? _a : null])
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var insertInfo, newCategoryId, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            insertInfo = result[0];
                                            newCategoryId = +(insertInfo === null || insertInfo === void 0 ? void 0 : insertInfo.insertId);
                                            _a = resolve;
                                            return [4 /*yield*/, this.getById(newCategoryId)];
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
    CategoryService.prototype.edit = function (categoryId, data, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(categoryId)];
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
                                    sql = "UPDATE category SET name = ?, image_path = ? WHERE category_id=?;";
                                    this.db.execute(sql, [data.name, data.imagePath, categoryId])
                                        .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.getById(categoryId, options)];
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
    CategoryService.prototype["delete"] = function (categoryId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var sql = "DELETE FROM category WHERE category_id = ?;";
                        _this.db.execute(sql, [categoryId])
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var deleteInfo, deleteRowCount;
                            return __generator(this, function (_a) {
                                deleteInfo = result[0];
                                deleteRowCount = +(deleteInfo === null || deleteInfo === void 0 ? void 0 : deleteInfo.affectedRows);
                                if (deleteRowCount === 1) {
                                    resolve({
                                        errorCode: 0,
                                        errorMessage: "Record deleted"
                                    });
                                }
                                else {
                                    resolve({
                                        errorCode: -1,
                                        errorMessage: "This record can not be deleted."
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
    return CategoryService;
}(BaseService_1["default"]));
exports["default"] = CategoryService;
