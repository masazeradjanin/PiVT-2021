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
var IUserLogin_1 = require("./dto/IUserLogin");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var dev_1 = require("../../config/dev");
var IAdministratorLogin_1 = require("./dto/IAdministratorLogin");
var IRefreshToken_1 = require("./dto/IRefreshToken");
var AuthController = /** @class */ (function (_super) {
    __extends(AuthController, _super);
    function AuthController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthController.prototype.userLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, user, authTokenData, refreshTokenData, authToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!IUserLogin_1.IUserLoginValidator(req.body)) {
                            return [2 /*return*/, res.status(400).send(IUserLogin_1.IUserLoginValidator.errors)];
                        }
                        data = req.body;
                        return [4 /*yield*/, this.services.userService.getByEmail(data.email)];
                    case 1:
                        user = _a.sent();
                        if (user === null)
                            return [2 /*return*/, res.sendStatus(404)];
                        if (!user.isActive) {
                            return [2 /*return*/, res.status(403).send("User account inactive.")];
                        }
                        if (!!bcrypt.compareSync(data.password, user.passwordHash)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(403).send("Invalid user password.")];
                    case 3:
                        authTokenData = {
                            id: user.userId,
                            identity: user.email,
                            role: "user"
                        };
                        refreshTokenData = {
                            id: user.userId,
                            identity: user.email,
                            role: "user"
                        };
                        authToken = jwt.sign(authTokenData, dev_1["default"].auth.user.auth.private, {
                            algorithm: dev_1["default"].auth.user.algorithm,
                            issuer: dev_1["default"].auth.user.issuer,
                            expiresIn: dev_1["default"].auth.user.auth.duration
                        });
                        refreshToken = jwt.sign(refreshTokenData, dev_1["default"].auth.user.refresh.private, {
                            algorithm: dev_1["default"].auth.user.algorithm,
                            issuer: dev_1["default"].auth.user.issuer,
                            expiresIn: dev_1["default"].auth.user.refresh.duration
                        });
                        res.send({
                            authToken: authToken,
                            refreshToken: refreshToken
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.administratorLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, administrator, authTokenData, refreshTokenData, authToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!IAdministratorLogin_1.IAdministratorLoginValidator(req.body)) {
                            return [2 /*return*/, res.status(400).send(IAdministratorLogin_1.IAdministratorLoginValidator.errors)];
                        }
                        data = req.body;
                        return [4 /*yield*/, this.services.administratorService.getByUsername(data.username)];
                    case 1:
                        administrator = _a.sent();
                        if (administrator === null)
                            return [2 /*return*/, res.sendStatus(404)];
                        if (!administrator.isActive) {
                            return [2 /*return*/, res.status(403).send("Administrator account inactive.")];
                        }
                        if (!!bcrypt.compareSync(data.password, administrator.passwordHash)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(403).send("Invalid administrator password.")];
                    case 3:
                        authTokenData = {
                            id: administrator.administratorId,
                            identity: administrator.username,
                            role: "administrator"
                        };
                        refreshTokenData = {
                            id: administrator.administratorId,
                            identity: administrator.username,
                            role: "administrator"
                        };
                        authToken = jwt.sign(authTokenData, dev_1["default"].auth.administrator.auth.private, {
                            algorithm: dev_1["default"].auth.administrator.algorithm,
                            issuer: dev_1["default"].auth.administrator.issuer,
                            expiresIn: dev_1["default"].auth.administrator.auth.duration
                        });
                        refreshToken = jwt.sign(refreshTokenData, dev_1["default"].auth.administrator.refresh.private, {
                            algorithm: dev_1["default"].auth.administrator.algorithm,
                            issuer: dev_1["default"].auth.administrator.issuer,
                            expiresIn: dev_1["default"].auth.administrator.refresh.duration
                        });
                        res.send({
                            authToken: authToken,
                            refreshToken: refreshToken
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.userRefresh = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.refreshTokenByRole("user")(req, res);
                return [2 /*return*/];
            });
        });
    };
    AuthController.prototype.administratorRefresh = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.refreshTokenByRole("administrator")(req, res);
                return [2 /*return*/];
            });
        });
    };
    AuthController.prototype.refreshTokenByRole = function (role) {
        return function (req, res) {
            if (!IRefreshToken_1.IRefreshTokenValidator(req.body)) {
                return res.status(400).send(IRefreshToken_1.IRefreshTokenValidator.errors);
            }
            var tokenString = req.body.refreshToken;
            try {
                var existingData = jwt.verify(tokenString, dev_1["default"].auth[role].auth.public);
                var newTokenData = {
                    id: existingData.id,
                    identity: existingData.identity,
                    role: existingData.role
                };
                var authToken = jwt.sign(newTokenData, dev_1["default"].auth[role].auth.private, {
                    algorithm: dev_1["default"].auth[role].algorithm,
                    issuer: dev_1["default"].auth[role].issuer,
                    expiresIn: dev_1["default"].auth[role].auth.duration
                });
                res.send({
                    authToken: authToken,
                    refreshToken: null
                });
            }
            catch (e) {
                return res.status(400).send("Invalid refresh token: " + (e === null || e === void 0 ? void 0 : e.message));
            }
        };
    };
    AuthController.prototype.sendOk = function (req, res) {
        res.send("OK");
    };
    return AuthController;
}(BaseController_1["default"]));
exports["default"] = AuthController;
