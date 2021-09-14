"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var dev_1 = require("../config/dev");
var AuthMiddleware = /** @class */ (function () {
    function AuthMiddleware() {
    }
    AuthMiddleware.verifyAuthToken = function (req, res, next, allowedRoles) {
        if (dev_1["default"].auth.allowRequestsEvenWithoutValidTokens) {
            return next();
        }
        if (typeof req.headers.authorization !== "string") {
            return res.status(401).send("No auth token specified.");
        }
        var token = req.headers.authorization;
        var _a = token.trim().split(" "), tokenType = _a[0], tokenString = _a[1];
        if (tokenType !== "Bearer") {
            return res.status(401).send("Invalid auth token type specified.");
        }
        if (typeof tokenString !== "string" || tokenString.length === 0) {
            return res.status(401).send("Invalid auth token length.");
        }
        var userTokenValidation = this.validateTokenAsTokenByRole(tokenString, "user");
        var administratorTokenValidation = this.validateTokenAsTokenByRole(tokenString, "administrator");
        var result;
        if (userTokenValidation.isValid === false && administratorTokenValidation.isValid === false) {
            return res.status(401).send("Token validation error: " + JSON.stringify(userTokenValidation) + " " + JSON.stringify(administratorTokenValidation));
        }
        if (userTokenValidation.isValid) {
            result = userTokenValidation.data;
        }
        else {
            result = administratorTokenValidation.data;
        }
        if (typeof result !== "object") {
            return res.status(401).send("Bad auth token data.");
        }
        var data = result;
        if (!allowedRoles.includes(data.role)) {
            return res.status(403).send("Access denied to this role.");
        }
        req.authorized = data;
        next();
    };
    AuthMiddleware.validateTokenAsTokenByRole = function (tokenString, role) {
        try {
            var result = jwt.verify(tokenString, dev_1["default"].auth[role].auth.public);
            return {
                isValid: true,
                data: result
            };
        }
        catch (e) {
            return {
                isValid: false,
                data: e === null || e === void 0 ? void 0 : e.message
            };
        }
    };
    AuthMiddleware.getVerifier = function () {
        var _this = this;
        var allowedRoles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allowedRoles[_i] = arguments[_i];
        }
        return function (req, res, next) {
            _this.verifyAuthToken(req, res, next, allowedRoles);
        };
    };
    return AuthMiddleware;
}());
exports["default"] = AuthMiddleware;
