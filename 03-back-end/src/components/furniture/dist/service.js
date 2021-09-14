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
exports.FurnitureModelAdapterOptions = void 0;
var BaseService_1 = require("../../common/BaseService");
var model_1 = require("./model");
var fs = require("fs");
var dev_1 = require("../../config/dev");
var path = require("path");
var FurnitureModelAdapterOptions = /** @class */ (function () {
    function FurnitureModelAdapterOptions() {
        this.loadCategory = false;
        this.loadPrices = true;
        this.loadPhotos = false;
    }
    return FurnitureModelAdapterOptions;
}());
exports.FurnitureModelAdapterOptions = FurnitureModelAdapterOptions;
var FurnitureService = /** @class */ (function (_super) {
    __extends(FurnitureService, _super);
    function FurnitureService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FurnitureService.prototype.adaptModel = function (data, options) {
        return __awaiter(this, void 0, Promise, function () {
            var item, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        item = new model_1["default"]();
                        item.furnitureId = +(data === null || data === void 0 ? void 0 : data.furniture_id);
                        item.createdAt = new Date(data === null || data === void 0 ? void 0 : data.created_at);
                        item.title = data === null || data === void 0 ? void 0 : data.title;
                        item.description = data === null || data === void 0 ? void 0 : data.description;
                        item.descriptionCons = data === null || data === void 0 ? void 0 : data.descr_cons;
                        item.dimensions = data === null || data === void 0 ? void 0 : data.dimensions;
                        item.color = data === null || data === void 0 ? void 0 : data.color;
                        item.material = data === null || data === void 0 ? void 0 : data.material;
                        item.isAvailabe = +(data === null || data === void 0 ? void 0 : data.is_active) === 1;
                        item.categoryId = +(data === null || data === void 0 ? void 0 : data.category_id);
                        item.locationId = +(data === null || data === void 0 ? void 0 : data.locationId);
                        if (!options.loadPrices) return [3 /*break*/, 2];
                        _a = item;
                        return [4 /*yield*/, this.getAllPricesByFurnitureId(item.furnitureId)];
                    case 1:
                        _a.prices = _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!options.loadPhotos) return [3 /*break*/, 4];
                        _b = item;
                        return [4 /*yield*/, this.getAllPhotosByFurnitureId(item.furnitureId)];
                    case 3:
                        _b.photos = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/, item];
                }
            });
        });
    };
    FurnitureService.prototype.getAllPricesByFurnitureId = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        SELECT\n            furniture_price_id,\n            created_at,\n            price\n        FROM\n            furniture_price\n        WHERE\n            furniture_id = ?\n        ORDER BY\n            created_at ASC;";
                        return [4 /*yield*/, this.db.execute(sql, [furnitureId])];
                    case 1:
                        rows = (_a.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, rows.map(function (row) {
                                return {
                                    priceId: +(row === null || row === void 0 ? void 0 : row.furniture_price_id),
                                    createdAt: new Date(row === null || row === void 0 ? void 0 : row.created_at),
                                    price: +(row === null || row === void 0 ? void 0 : row.price)
                                };
                            })];
                }
            });
        });
    };
    FurnitureService.prototype.getAllPhotosByFurnitureId = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT photo_id, image_path FROM photo WHERE furniture_id = ?;";
                        return [4 /*yield*/, this.db.execute(sql, [furnitureId])];
                    case 1:
                        rows = (_a.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, rows.map(function (row) {
                                return {
                                    photoId: +(row === null || row === void 0 ? void 0 : row.photo_id),
                                    imagePath: row === null || row === void 0 ? void 0 : row.image_path
                                };
                            })];
                }
            });
        });
    };
    FurnitureService.prototype.getLatestPriceByFurnitureId = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var sql, rows, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT price FROM furniture_price WHERE furniture_id = ? ORDER BY created_at DESC LIMIT 1;";
                        return [4 /*yield*/, this.db.execute(sql, [furnitureId])];
                    case 1:
                        rows = (_a.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, 0];
                        }
                        data = rows[0];
                        return [2 /*return*/, +(data === null || data === void 0 ? void 0 : data.price)];
                }
            });
        });
    };
    FurnitureService.prototype.getById = function (furnitureId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getByIdFromTable("furniture", furnitureId, options)];
            });
        });
    };
    FurnitureService.prototype.add = function (data, uploadedPhotos) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.db.beginTransaction()
                            .then(function () {
                            _this.db.execute("\n                INSERT furniture\n                SET\n                    title = ?,\n                    description = ?,\n                    descr_cons   = ?,\n                    dimensions = ?,\n                    color = ?,\n                    material = ?,\n                    is_available = ?,\n                    category_id = ?,\n                    location_id = ?;\n                ", [
                                data.title,
                                data.description,
                                data.descriptionCons,
                                data.dimensions,
                                data.color,
                                data.material,
                                data.isAvailable ? 1 : 0,
                                data.categoryId,
                                data.locationId,
                            ])
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var newFurnitureId, promises, _i, uploadedPhotos_1, uploadedPhoto;
                                var _this = this;
                                var _a;
                                return __generator(this, function (_b) {
                                    newFurnitureId = +((_a = res[0]) === null || _a === void 0 ? void 0 : _a.insertId);
                                    promises = [];
                                    promises.push(this.db.execute("INSERT furniture_price SET price = ?, furniture_id = ?;", [data.price, newFurnitureId,]));
                                    for (_i = 0, uploadedPhotos_1 = uploadedPhotos; _i < uploadedPhotos_1.length; _i++) {
                                        uploadedPhoto = uploadedPhotos_1[_i];
                                        promises.push(this.db.execute("INSERT photo SET furniture_id = ?, image_path = ?;", [newFurnitureId, uploadedPhoto.imagePath,]));
                                    }
                                    Promise.all(promises)
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, this.db.commit()];
                                                case 1:
                                                    _b.sent();
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.services.furnitureService.getById(newFurnitureId, {
                                                            loadCategory: true,
                                                            loadPhotos: true,
                                                            loadPrices: true
                                                        })];
                                                case 2:
                                                    _a.apply(void 0, [_b.sent()]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.db.rollback()];
                                                case 1:
                                                    _a.sent();
                                                    resolve({
                                                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                                });
                            }); })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.db.rollback()];
                                        case 1:
                                            _a.sent();
                                            resolve({
                                                errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                                errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                    })];
            });
        });
    };
    FurnitureService.prototype.editFurniture = function (furnitureId, data) {
        return this.db.execute("UPDATE\n            furniture\n        SET\n        title = ?,\n        description = ?,\n        descr_cons   = ?,\n        dimensions = ?,\n        color = ?,\n        material = ?,\n        is_available = ?\n        WHERE\n            furniture_id = ?;", [
            data.title,
            data.color,
            data.material,
            data.isAvailable ? 1 : 0,
            furnitureId,
        ]);
    };
    FurnitureService.prototype.addFurniturePrice = function (furnitureId, newPrice) {
        return this.db.execute("INSERT\n            furniture_price\n        SET\n            furniture_id = ?,\n            price = ?;", [furnitureId, newPrice,]);
    };
    FurnitureService.prototype.edit = function (furnitureId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var currentFurniture, rollbackAndResolve;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getById(furnitureId, {})];
                                case 1:
                                    currentFurniture = _a.sent();
                                    if (currentFurniture === null) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    rollbackAndResolve = function (error) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.db.rollback()];
                                                case 1:
                                                    _a.sent();
                                                    resolve({
                                                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    this.db.beginTransaction()
                                        .then(function () {
                                        _this.editFurniture(furnitureId, data)["catch"](function (error) {
                                            rollbackAndResolve({
                                                errno: error === null || error === void 0 ? void 0 : error.errno,
                                                sqlMessage: "Part furniture: " + (error === null || error === void 0 ? void 0 : error.sqlMessage)
                                            });
                                        });
                                    })
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var currentPrice, newPrice;
                                        return __generator(this, function (_a) {
                                            currentPrice = currentFurniture.currentPrice.toFixed(2);
                                            newPrice = data.price.toFixed(2);
                                            if (currentPrice !== newPrice) {
                                                this.addFurniturePrice(furnitureId, data.price)["catch"](function (error) {
                                                    rollbackAndResolve({
                                                        errno: error === null || error === void 0 ? void 0 : error.errno,
                                                        sqlMessage: "Part price: " + (error === null || error === void 0 ? void 0 : error.sqlMessage)
                                                    });
                                                });
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); })
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            this.db.commit()["catch"](function (error) {
                                                rollbackAndResolve({
                                                    errno: error === null || error === void 0 ? void 0 : error.errno,
                                                    sqlMessage: "Part save changes: " + (error === null || error === void 0 ? void 0 : error.sqlMessage)
                                                });
                                            });
                                            return [2 /*return*/];
                                        });
                                    }); })
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.getById(furnitureId, {
                                                            loadCategory: true,
                                                            loadPhotos: true,
                                                            loadPrices: true
                                                        })];
                                                case 1:
                                                    _a.apply(void 0, [_b.sent()]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.db.rollback()];
                                                case 1:
                                                    _a.sent();
                                                    resolve({
                                                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype["delete"] = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var currentFurniture;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getById(furnitureId, {
                                        loadPhotos: true,
                                        loadPrices: true
                                    })];
                                case 1:
                                    currentFurniture = _a.sent();
                                    if (currentFurniture === null) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    this.db.beginTransaction()
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.deleteFurniturePrices(furnitureId)];
                                                case 1:
                                                    if (_a.sent())
                                                        return [2 /*return*/];
                                                    throw { errno: -1002, sqlMessage: "Could not delete furniture prices." };
                                            }
                                        });
                                    }); })
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.deleteFurnitureCartRecord(furnitureId)];
                                                case 1:
                                                    if (_a.sent())
                                                        return [2 /*return*/];
                                                    throw { errno: -1004, sqlMessage: "Could not delete furniture cart records." };
                                            }
                                        });
                                    }); })
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var filesToDelete;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.deleteFurniturePhotoRecords(furnitureId)];
                                                case 1:
                                                    filesToDelete = _a.sent();
                                                    if (filesToDelete.length !== 0)
                                                        return [2 /*return*/, filesToDelete];
                                                    throw { errno: -1005, sqlMessage: "Could not delete furniture photo records." };
                                            }
                                        });
                                    }); })
                                        .then(function (filesToDelete) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.deleteFurnitureRecord(furnitureId)];
                                                case 1:
                                                    if (_a.sent())
                                                        return [2 /*return*/, filesToDelete];
                                                    throw { errno: -1006, sqlMessage: "Could not delete the furniture records." };
                                            }
                                        });
                                    }); })
                                        .then(function (filesToDelete) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.db.commit()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/, filesToDelete];
                                            }
                                        });
                                    }); })
                                        .then(function (filesToDelete) {
                                        _this.deleteFurniturePhotosAndResizedVersion(filesToDelete);
                                    })
                                        .then(function () {
                                        resolve({
                                            errorCode: 0,
                                            errorMessage: "Furniture deleted!"
                                        });
                                    })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.db.rollback()];
                                                case 1:
                                                    _a.sent();
                                                    resolve({
                                                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype.deleteFurniturePrices = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.db.execute("DELETE FROM furniture_price WHERE furniture_id = ?;", [furnitureId])
                                .then(function () { return resolve(true); })["catch"](function () { return resolve(false); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype.deleteFurnitureCartRecord = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.db.execute("DELETE FROM cart_furniture WHERE furniture_id = ?;", [furnitureId])
                                .then(function () { return resolve(true); })["catch"](function () { return resolve(false); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype.deleteFurniturePhotoRecords = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var rows, filesToDelete;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.db.execute("SELECT image_path FROM photo WHERE furniture_id = ?;", [furnitureId])];
                                case 1:
                                    rows = (_a.sent())[0];
                                    if (!Array.isArray(rows) || rows.length === 0)
                                        return [2 /*return*/, resolve([])];
                                    filesToDelete = rows.map(function (row) { return row === null || row === void 0 ? void 0 : row.image_path; });
                                    this.db.execute("DELETE FROM photo WHERE furniture_id = ?;", [furnitureId])
                                        .then(function () { return resolve(filesToDelete); })["catch"](function () { return resolve([]); });
                                    resolve(filesToDelete);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype.deleteFurnitureRecord = function (furnitureId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.db.execute("DELETE FROM furniture WHERE furniture_id = ?;", [furnitureId])
                                .then(function () { return resolve(true); })["catch"](function () { return resolve(false); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype.deleteFurniturePhotosAndResizedVersion = function (filesToDelete) {
        try {
            for (var _i = 0, filesToDelete_1 = filesToDelete; _i < filesToDelete_1.length; _i++) {
                var fileToDelete = filesToDelete_1[_i];
                fs.unlinkSync(fileToDelete);
                var pathParts = path.parse(fileToDelete);
                var directory = pathParts.dir;
                var filename = pathParts.name;
                var extension = pathParts.ext;
                for (var _a = 0, _b = dev_1["default"].fileUpload.photos.resizes; _a < _b.length; _a++) {
                    var resizeSpecification = _b[_a];
                    var resizedImagePath = directory + "/" +
                        filename +
                        resizeSpecification.sufix +
                        extension;
                    fs.unlinkSync(resizedImagePath);
                }
            }
        }
        catch (e) { }
    };
    FurnitureService.prototype.deleteFurniturePhoto = function (furnitureId, photoId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var furniture, filteredPhotos, photo;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getById(furnitureId, {
                                        loadPhotos: true
                                    })];
                                case 1:
                                    furniture = _a.sent();
                                    if (furniture === null) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    filteredPhotos = furniture.photos.filter(function (p) { return p.photoId === photoId; });
                                    if (filteredPhotos.length === 0) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    photo = filteredPhotos[0];
                                    this.db.execute("DELETE FROM photo WHERE photo_id = ?;", [photo.photoId])
                                        .then(function () {
                                        _this.deleteFurniturePhotosAndResizedVersion([
                                            photo.imagePath
                                        ]);
                                        resolve({
                                            errorCode: 0,
                                            errorMessage: "Photo deleted."
                                        });
                                    })["catch"](function (error) { return resolve({
                                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype.addFurniturePhotos = function (furnitureId, uploadedPhotos) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var furniture;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getById(furnitureId, {
                                        loadPhotos: true
                                    })];
                                case 1:
                                    furniture = _a.sent();
                                    if (furniture === null) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    this.db.beginTransaction()
                                        .then(function () {
                                        var promises = [];
                                        for (var _i = 0, uploadedPhotos_2 = uploadedPhotos; _i < uploadedPhotos_2.length; _i++) {
                                            var uploadedPhoto = uploadedPhotos_2[_i];
                                            promises.push(_this.db.execute("INSERT photo SET furniture_id = ?, image_path = ?;", [furnitureId, uploadedPhoto.imagePath,]));
                                        }
                                        Promise.all(promises)
                                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, this.db.commit()];
                                                    case 1:
                                                        _b.sent();
                                                        _a = resolve;
                                                        return [4 /*yield*/, this.services.furnitureService.getById(furnitureId, {
                                                                loadCategory: true,
                                                                loadPhotos: true,
                                                                loadPrices: true
                                                            })];
                                                    case 2:
                                                        _a.apply(void 0, [_b.sent()]);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.db.rollback()];
                                                    case 1:
                                                        _a.sent();
                                                        resolve({
                                                            errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                                            errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                                        });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    })["catch"](function (error) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.db.rollback()];
                                                case 1:
                                                    _a.sent();
                                                    resolve({
                                                        errorCode: error === null || error === void 0 ? void 0 : error.errno,
                                                        errorMessage: error === null || error === void 0 ? void 0 : error.sqlMessage
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FurnitureService.prototype.getAllByCategoryId = function (categoryId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllByFieldNameFromTable("furniture", "category_id", categoryId, {
                            loadPhotos: true
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return FurnitureService;
}(BaseService_1["default"]));
exports["default"] = FurnitureService;
