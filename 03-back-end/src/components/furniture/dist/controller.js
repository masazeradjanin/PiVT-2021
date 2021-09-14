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
var IAddFurniture_1 = require("./dto/IAddFurniture"); // ovo nzm sta ti je
var dev_1 = require("../../config/dev");
var uuid_1 = require("uuid");
var image_size_1 = require("image-size");
var path = require("path");
var sharp = require("sharp");
var IEditFurniture_1 = require("./dto/IEditFurniture");
var FurnitureController = /** @class */ (function (_super) {
    __extends(FurnitureController, _super);
    function FurnitureController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FurnitureController.prototype.getById = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                        if (id <= 0) {
                            res.sendStatus(400);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.services.furnitureService.getById(id, {
                                loadCategory: true,
                                loadPrices: true,
                                loadPhotos: true
                            })];
                    case 1:
                        item = _b.sent();
                        if (item === null) {
                            res.sendStatus(404);
                            return [2 /*return*/];
                        }
                        res.send(item);
                        return [2 /*return*/];
                }
            });
        });
    };
    FurnitureController.prototype.isPhotoValid = function (file) {
        try {
            var size = image_size_1["default"](file.tempFilePath);
            var limits = dev_1["default"].fileUpload.photos.limits;
            if (size.width < limits.minWidth) {
                return {
                    isOk: false,
                    message: "The ime must have a width of at least " + limits.minWidth + "px."
                };
            }
            if (size.height < limits.minHeight) {
                return {
                    isOk: false,
                    message: "The ime must have a height of at least " + limits.minHeight + "px."
                };
            }
            if (size.width > limits.maxWidth) {
                return {
                    isOk: false,
                    message: "The ime must have a width of at most " + limits.maxWidth + "px."
                };
            }
            if (size.height > limits.maxHeight) {
                return {
                    isOk: false,
                    message: "The ime must have a height of at most " + limits.maxHeight + "px."
                };
            }
            return {
                isOk: true
            };
        }
        catch (e) {
            return {
                isOk: false,
                message: 'Bad file format.'
            };
        }
    };
    FurnitureController.prototype.resizeUploadedPhoto = function (imagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var pathParts, directory, filename, extension, _i, _a, resizeSpecification, resizedImagePath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pathParts = path.parse(imagePath);
                        directory = pathParts.dir;
                        filename = pathParts.name;
                        extension = pathParts.ext;
                        _i = 0, _a = dev_1["default"].fileUpload.photos.resizes;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        resizeSpecification = _a[_i];
                        resizedImagePath = directory + "/" +
                            filename +
                            resizeSpecification.sufix +
                            extension;
                        return [4 /*yield*/, sharp(imagePath)
                                .resize({
                                width: resizeSpecification.width,
                                height: resizeSpecification.hieght,
                                fit: resizeSpecification.fit,
                                background: { r: 255, g: 255, b: 255, alpha: 1.0 },
                                withoutEnlargement: true
                            })
                                .toFile(resizedImagePath)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FurnitureController.prototype.uploadFiles = function (req, res) {
        return __awaiter(this, void 0, Promise, function () {
            var fileKeys, uploadedPhotos, _i, fileKeys_1, fileKey, file, result, randomString, originalName, now, imagePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.files || Object.keys(req.files).length === 0) {
                            res.status(400).send("You must upload at lease one and a maximum of " + dev_1["default"].fileUpload.maxFiles + " photos.");
                            return [2 /*return*/, []];
                        }
                        fileKeys = Object.keys(req.files);
                        uploadedPhotos = [];
                        _i = 0, fileKeys_1 = fileKeys;
                        _a.label = 1;
                    case 1:
                        if (!(_i < fileKeys_1.length)) return [3 /*break*/, 5];
                        fileKey = fileKeys_1[_i];
                        file = req.files[fileKey];
                        result = this.isPhotoValid(file);
                        if (result.isOk === false) {
                            res.status(400).send("Error with image " + fileKey + ": \"" + result.message + "\".");
                            return [2 /*return*/, []];
                        }
                        randomString = uuid_1.v4();
                        originalName = file === null || file === void 0 ? void 0 : file.name;
                        now = new Date();
                        imagePath = dev_1["default"].fileUpload.uploadDestinationDirectory +
                            (dev_1["default"].fileUpload.uploadDestinationDirectory.endsWith("/") ? "" : "/") +
                            now.getFullYear() + "/" +
                            ((now.getMonth() + 1) + "").padStart(2, "0") + "/" +
                            randomString + "-" + originalName;
                        return [4 /*yield*/, file.mv(imagePath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.resizeUploadedPhoto(imagePath)];
                    case 3:
                        _a.sent();
                        uploadedPhotos.push({
                            imagePath: imagePath
                        });
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, uploadedPhotos];
                }
            });
        });
    };
    FurnitureController.prototype.add = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var uploadedPhotos, data, result, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.uploadFiles(req, res)];
                    case 1:
                        uploadedPhotos = _b.sent();
                        if (uploadedPhotos.length === 0) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        data = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
                        if (!IAddFurniture_1.IAddFurnitureValidator(data)) {
                            res.status(400).send(IAddFurniture_1.IAddFurnitureValidator.errors);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.services.furnitureService.add(data, uploadedPhotos)];
                    case 3:
                        result = _b.sent();
                        res.send(result);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        res.status(400).send(e_1 === null || e_1 === void 0 ? void 0 : e_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FurnitureController.prototype.edit = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                        if (id <= 0) {
                            return [2 /*return*/, res.sendStatus(400)];
                        }
                        if (!IEditFurniture_1.IEditFurnitureValidator(req.body)) {
                            return [2 /*return*/, res.status(400).send(IEditFurniture_1.IEditFurnitureValidator.errors)];
                        }
                        return [4 /*yield*/, this.services.furnitureService.edit(id, req.body)];
                    case 1:
                        result = _b.sent();
                        if (result === null) {
                            return [2 /*return*/, res.sendStatus(404)];
                        }
                        res.send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    FurnitureController.prototype["delete"] = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, item, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        id = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                        if (id <= 0) {
                            return [2 /*return*/, res.sendStatus(400)];
                        }
                        return [4 /*yield*/, this.services.furnitureService.getById(id)];
                    case 1:
                        item = _d.sent();
                        if (item === null) {
                            res.sendStatus(404);
                            return [2 /*return*/];
                        }
                        _c = (_b = res).send;
                        return [4 /*yield*/, this.services.furnitureService["delete"](id)];
                    case 2:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    FurnitureController.prototype.deleteFurniturePhoto = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var furnitureId, photoId, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        furnitureId = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.aid);
                        photoId = +((_b = req.params) === null || _b === void 0 ? void 0 : _b.pid);
                        if (furnitureId <= 0 || photoId <= 0)
                            return [2 /*return*/, res.sendStatus(400)];
                        return [4 /*yield*/, this.services.furnitureService.deleteFurniturePhoto(furnitureId, photoId)];
                    case 1:
                        result = _c.sent();
                        if (result === null)
                            return [2 /*return*/, res.sendStatus(404)];
                        res.send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    FurnitureController.prototype.addFurniturePhotos = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var furnitureId, item, uploadedPhotos, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        furnitureId = +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                        if (furnitureId <= 0)
                            return [2 /*return*/, res.sendStatus(400)];
                        return [4 /*yield*/, this.services.furnitureService.getById(furnitureId)];
                    case 1:
                        item = _d.sent();
                        if (item === null)
                            return [2 /*return*/, res.sendStatus(404)];
                        return [4 /*yield*/, this.uploadFiles(req, res)];
                    case 2:
                        uploadedPhotos = _d.sent();
                        if (uploadedPhotos.length === 0) {
                            return [2 /*return*/];
                        }
                        _c = (_b = res).send;
                        return [4 /*yield*/, this.services.furnitureService.addFurniturePhotos(furnitureId, uploadedPhotos)];
                    case 3:
                        _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    FurnitureController.prototype.getAllByCategoryId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = +(req.params.id);
                        if (id <= 0)
                            return [2 /*return*/, res.status(400).send("Invalid category ID value.")];
                        _b = (_a = res).send;
                        return [4 /*yield*/, this.services.furnitureService.getAllByCategoryId(id)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    return FurnitureController;
}(BaseController_1["default"]));
exports["default"] = FurnitureController;
