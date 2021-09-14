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
exports.CartModelAdapterOptions = void 0;
var BaseService_1 = require("../../common/BaseService");
var model_1 = require("./model");
var CartModelAdapterOptions = /** @class */ (function () {
    function CartModelAdapterOptions() {
        this.loadUser = false;
        this.loadFurnitures = false;
        this.loadOrder = false;
        this.furnitureModelAdapterOptions = {
            loadCategory: true,
            loadPrices: true,
            loadPhotos: true
        };
    }
    return CartModelAdapterOptions;
}());
exports.CartModelAdapterOptions = CartModelAdapterOptions;
var CartService = /** @class */ (function (_super) {
    __extends(CartService, _super);
    function CartService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartService.prototype.adaptModel = function (data, options) {
        return __awaiter(this, void 0, Promise, function () {
            var item, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        item = new model_1["default"]();
                        item.cartId = +(data === null || data === void 0 ? void 0 : data.cart_id);
                        item.createdAt = new Date(data === null || data === void 0 ? void 0 : data.created_at);
                        item.userId = +(data === null || data === void 0 ? void 0 : data.user_id);
                        if (!options.loadUser) return [3 /*break*/, 2];
                        _a = item;
                        return [4 /*yield*/, this.services.userService.getById(item.userId)];
                    case 1:
                        _a.user = (_d.sent());
                        _d.label = 2;
                    case 2:
                        if (!options.loadOrder) return [3 /*break*/, 4];
                        _b = item;
                        return [4 /*yield*/, this.getOrderByCartId(item.cartId)];
                    case 3:
                        _b.order = _d.sent();
                        _d.label = 4;
                    case 4:
                        if (!options.loadFurnitures) return [3 /*break*/, 6];
                        _c = item;
                        return [4 /*yield*/, this.getAllCartFurnituresByCartId(item.cartId, options.furnitureModelAdapterOptions)];
                    case 5:
                        _c.furnitures = _d.sent();
                        _d.label = 6;
                    case 6: return [2 /*return*/, item];
                }
            });
        });
    };
    CartService.prototype.getOrderByCartId = function (cartId) {
        return __awaiter(this, void 0, Promise, function () {
            var rows, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.execute("SELECT * FROM `order` WHERE cart_id = ?;", [cartId,])];
                    case 1:
                        rows = (_a.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, null];
                        }
                        order = rows[0];
                        return [2 /*return*/, {
                                orderId: +(order === null || order === void 0 ? void 0 : order.order_id),
                                createdAt: new Date(order === null || order === void 0 ? void 0 : order.created_at),
                                status: order === null || order === void 0 ? void 0 : order.status
                            }];
                }
            });
        });
    };
    CartService.prototype.getAllCartFurnituresByCartId = function (cartId, furnitureModelAdapterOptions) {
        return __awaiter(this, void 0, Promise, function () {
            var rows, items, _i, rows_1, row, data, furnitureId, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.db.execute("SELECT * FROM cart_furniture WHERE cart_id = ?;", [cartId,])];
                    case 1:
                        rows = (_d.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, []];
                        }
                        items = [];
                        _i = 0, rows_1 = rows;
                        _d.label = 2;
                    case 2:
                        if (!(_i < rows_1.length)) return [3 /*break*/, 5];
                        row = rows_1[_i];
                        data = row;
                        furnitureId = +(data === null || data === void 0 ? void 0 : data.furniture_id);
                        _b = (_a = items).push;
                        _c = {
                            cartFurnitureId: +(data === null || data === void 0 ? void 0 : data.cart_furniture_id),
                            furnitureId: furnitureId,
                            quantity: +(data === null || data === void 0 ? void 0 : data.quantity)
                        };
                        return [4 /*yield*/, this.services.furnitureService.getById(furnitureId, furnitureModelAdapterOptions)];
                    case 3:
                        _b.apply(_a, [(_c.furniture = (_d.sent()),
                                _c)]);
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, items];
                }
            });
        });
    };
    CartService.prototype.getById = function (cartId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.getByIdFromTable.call(this, "cart", cartId, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService.prototype.add = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.db.execute("INSERT cart SET user_id = ?;", [userId,])
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var insertData, newCartId, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            insertData = res[0];
                                            newCartId = +(insertData === null || insertData === void 0 ? void 0 : insertData.insertId);
                                            _a = resolve;
                                            return [4 /*yield*/, this.getById(newCartId, {
                                                    loadUser: true
                                                })];
                                        case 1:
                                            _a.apply(void 0, [_b.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) {
                                resolve({
                                    errorCode: err === null || err === void 0 ? void 0 : err.errno,
                                    errorMessage: err === null || err === void 0 ? void 0 : err.sqlMessage
                                });
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    CartService.prototype.getAllCartsByUserId = function (userId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.getAllByFieldNameFromTable.call(this, "cart", "user_id", userId, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService.prototype.getLatestCartByUserId = function (userId, options) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var rows, cartId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db.execute("SELECT\n                cart.*\n            FROM\n                cart\n            LEFT JOIN `order` ON `order`.cart_id = cart.cart_id\n            WHERE\n                cart.user_id = ?\n                AND `order`.order_id IS NULL\n            ORDER BY\n                cart.created_at DESC\n            LIMIT 1;", [userId,])];
                    case 1:
                        rows = (_b.sent())[0];
                        if (!(!Array.isArray(rows) || rows.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.add(userId)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        cartId = +((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.cart_id);
                        return [4 /*yield*/, this.getById(cartId, {
                                loadUser: true,
                                loadFurnitures: true
                            })];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    CartService.prototype.addFurnitureToLatestCartByUserId = function (userId, furnitureId, quantity) {
        return __awaiter(this, void 0, Promise, function () {
            var cart, filteredFurnitures;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLatestCartByUserId(userId, {
                            loadFurnitures: true
                        })];
                    case 1:
                        cart = _a.sent();
                        filteredFurnitures = cart.furnitures.filter(function (a) { return a.furnitureId === furnitureId; });
                        if (!(filteredFurnitures.length === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db.execute("UPDATE\n                    cart_furniture\n                SET\n                    quantity = quantity + ?\n                WHERE\n                    cart_id = ?\n                    AND furniture_id = ?;", [quantity, cart.cartId, furnitureId,])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.db.execute("INSERT\n                    cart_furniture\n                SET\n                    quantity = ?,\n                    cart_id = ?,\n                    furniture_id = ?;", [quantity, cart.cartId, furnitureId,])];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.getById(cart.cartId, {
                            loadFurnitures: true
                        })];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService.prototype.setFurnitureToLatestCartByUserId = function (userId, furnitureId, quantity) {
        return __awaiter(this, void 0, Promise, function () {
            var cart, filteredFurnitures;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLatestCartByUserId(userId, {
                            loadFurnitures: true
                        })];
                    case 1:
                        cart = _a.sent();
                        filteredFurnitures = cart.furnitures.filter(function (a) { return a.furnitureId === furnitureId; });
                        if (!(filteredFurnitures.length === 1)) return [3 /*break*/, 6];
                        if (!(quantity > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db.execute("UPDATE\n                        cart_furniture\n                    SET\n                        quantity = ?\n                    WHERE\n                        cart_id = ?\n                        AND furniture_id = ?;", [quantity, cart.cartId, furnitureId,])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.db.execute("DELETE FROM\n                        cart_furniture\n                    WHERE\n                        cart_id = ?\n                        AND furniture_id = ?;", [cart.cartId, furnitureId,])];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        if (!(quantity > 0)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.db.execute("INSERT\n                        cart_furniture\n                    SET\n                        quantity = ?,\n                        cart_id = ?,\n                        furnituree_id = ?;", [quantity, cart.cartId, furnitureId,])];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.getById(cart.cartId, {
                            loadFurnitures: true
                        })];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService.prototype.makeOrder = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var cart;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getLatestCartByUserId(userId, {
                                        loadFurnitures: true
                                    })];
                                case 1:
                                    cart = _a.sent();
                                    if (cart.furnitures.length === 0) {
                                        return [2 /*return*/, resolve({
                                                errorCode: -3011,
                                                errorMessage: "You cannot make an order with an empty cart."
                                            })];
                                    }
                                    this.db.execute("INSERT INTO `order` SET cart_id = ?;", [cart.cartId,])
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.getById(cart.cartId, {
                                                            loadFurnitures: true,
                                                            loadOrder: true,
                                                            loadUser: true
                                                        })];
                                                case 1:
                                                    _a.apply(void 0, [_b.sent()]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })["catch"](function (err) {
                                        resolve({
                                            errorCode: err === null || err === void 0 ? void 0 : err.errno,
                                            errorMessage: err === null || err === void 0 ? void 0 : err.sqlMessage
                                        });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    CartService.prototype.getAllOrdersByUserId = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var rows, items, _i, rows_2, row, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.db.execute("SELECT\n                cart.*\n            FROM\n                cart\n            INNER JOIN `order` ON `order`.cart_id = cart.cart_id\n            WHERE\n                cart.user_id = ?\n            ORDER BY\n                `order`.created_at DESC;", [userId])];
                    case 1:
                        rows = (_c.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, []];
                        }
                        items = [];
                        _i = 0, rows_2 = rows;
                        _c.label = 2;
                    case 2:
                        if (!(_i < rows_2.length)) return [3 /*break*/, 5];
                        row = rows_2[_i];
                        data = row;
                        _b = (_a = items).push;
                        return [4 /*yield*/, this.adaptModel(data, {
                                loadFurnitures: true,
                                loadOrder: true,
                                loadUser: true
                            })];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, items];
                }
            });
        });
    };
    CartService.prototype.getAllOrders = function () {
        return __awaiter(this, void 0, Promise, function () {
            var rows, items, _i, rows_3, row, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.db.execute("SELECT\n                cart.*\n            FROM\n                cart\n            INNER JOIN `order` ON `order`.cart_id = cart.cart_id\n            ORDER BY\n                `order`.created_at DESC;")];
                    case 1:
                        rows = (_c.sent())[0];
                        if (!Array.isArray(rows) || rows.length === 0) {
                            return [2 /*return*/, []];
                        }
                        items = [];
                        _i = 0, rows_3 = rows;
                        _c.label = 2;
                    case 2:
                        if (!(_i < rows_3.length)) return [3 /*break*/, 5];
                        row = rows_3[_i];
                        data = row;
                        _b = (_a = items).push;
                        return [4 /*yield*/, this.adaptModel(data, {
                                loadFurnitures: true,
                                loadOrder: true,
                                loadUser: true,
                                furnitureModelAdapterOptions: {
                                    loadCategory: true,
                                    loadPhotos: true,
                                    loadPrices: true
                                }
                            })];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, items];
                }
            });
        });
    };
    CartService.prototype.setOrderStatus = function (cartId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var cart;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getById(cartId, {
                                        loadOrder: true
                                    })];
                                case 1:
                                    cart = _a.sent();
                                    if (cart.order === null) {
                                        return [2 /*return*/, resolve({
                                                errorCode: -3022,
                                                errorMessage: "This cart has no order."
                                            })];
                                    }
                                    this.db.execute("UPDATE `order` SET `status` = ? WHERE order_id = ?;", [data.status, cart.order.orderId])
                                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _a = resolve;
                                                    return [4 /*yield*/, this.getById(cartId, {
                                                            loadOrder: true,
                                                            loadFurnitures: true,
                                                            loadUser: true
                                                        })];
                                                case 1:
                                                    _a.apply(void 0, [_b.sent()]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })["catch"](function (err) {
                                        resolve({
                                            errorCode: err === null || err === void 0 ? void 0 : err.errno,
                                            errorMessage: err === null || err === void 0 ? void 0 : err.sqlMessage
                                        });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return CartService;
}(BaseService_1["default"]));
exports["default"] = CartService;
