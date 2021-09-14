"use strict";
var _a, _b, _c, _d, _e, _f;
exports.__esModule = true;
var dotenv = require("dotenv");
var fs_1 = require("fs");
var dotEnvResult = dotenv.config();
if (dotEnvResult.error)
    throw "Environment configuration file error: " + dotEnvResult.error;
var Config = {
    server: {
        port: 40080,
        static: {
            route: "/static",
            path: "./static/",
            cacheControl: false,
            dotfiles: "deny",
            etag: false,
            index: false,
            maxAge: 360000
        }
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "aplikacija",
        charset: "utf8",
        timezone: "+01:00"
    },
    fileUpload: {
        maxSize: 5 * 1024 * 1024,
        maxFiles: 5,
        timeout: 60000,
        temporaryDirectory: '../temp/',
        uploadDestinationDirectory: 'static/uploads/',
        photos: {
            limits: {
                minWidth: 320,
                minHeight: 200,
                maxWidth: 1920,
                maxHeight: 1440
            },
            resizes: [
                {
                    sufix: "-medium",
                    fit: "cover",
                    width: 800,
                    hieght: 600
                },
                {
                    sufix: "-small",
                    fit: "cover",
                    width: 400,
                    hieght: 300
                },
                {
                    sufix: "-thumb",
                    fit: "cover",
                    width: 250,
                    hieght: 200
                },
            ]
        }
    },
    mail: {
        hostname: (_a = process.env) === null || _a === void 0 ? void 0 : _a.MAIL_HOST,
        port: +((_b = process.env) === null || _b === void 0 ? void 0 : _b.MAIL_PORT),
        secure: ((_c = process.env) === null || _c === void 0 ? void 0 : _c.MAIL_SECURE) === "true",
        username: (_d = process.env) === null || _d === void 0 ? void 0 : _d.MAIL_USERNAME,
        password: (_e = process.env) === null || _e === void 0 ? void 0 : _e.MAIL_PASSWORD,
        fromEmail: (_f = process.env) === null || _f === void 0 ? void 0 : _f.MAIL_FROM,
        debug: true
    },
    auth: {
        user: {
            algorithm: "RS256",
            issuer: "localhost",
            auth: {
                duration: 60 * 2,
                public: fs_1.readFileSync("keystore/user-auth.public", "utf-8"),
                private: fs_1.readFileSync("keystore/user-auth.private", "utf-8")
            },
            refresh: {
                duration: 60 * 60 * 24 * 365,
                public: fs_1.readFileSync("keystore/user-refresh.public", "utf-8"),
                private: fs_1.readFileSync("keystore/user-refresh.private", "utf-8")
            }
        },
        administrator: {
            algorithm: "RS256",
            issuer: "localhost",
            auth: {
                duration: 60 * 60 * 24 * 7,
                public: fs_1.readFileSync("keystore/administrator-auth.public", "utf-8"),
                private: fs_1.readFileSync("keystore/administrator-auth.private", "utf-8")
            },
            refresh: {
                duration: 60 * 60 * 24 * 365,
                public: fs_1.readFileSync("keystore/administrator-refresh.public", "utf-8"),
                private: fs_1.readFileSync("keystore/administrator-refresh.private", "utf-8")
            }
        },
        allowRequestsEvenWithoutValidTokens: false
    }
};
exports["default"] = Config;
