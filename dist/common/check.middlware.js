"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationRequestServer = exports.CheckRequest = void 0;
const common_1 = require("@nestjs/common");
const md5 = require("md5");
const config_service_1 = require("../shared/services/config.service");
function CheckRequest(req, res, next) {
    let { unittime, token, admin } = req.headers;
    let { url } = req;
    if (url.includes("/docs")) {
        return next();
    }
    if (admin == 'ADMIN') {
        return next();
    }
    if (!unittime || !token) {
        return res.status(401).json({
            code: 401,
            status: "error",
            message: "ERROR_AUTHEN"
        });
    }
    next();
}
exports.CheckRequest = CheckRequest;
;
let ValidationRequestServer = class ValidationRequestServer {
    constructor(configService) {
        this.configService = configService;
        this.TIME_EXPRIED = 1000 * 10;
    }
    async use(req, res, next) {
        const { unittime, secret, admin } = req.headers;
        if (admin == "ADMIN") {
            return next();
        }
        if (!unittime || !secret) {
            return res.status(409).json({
                code: 409,
                status: "error",
                message: "AUTHEN_SERVER_FAIL"
            });
        }
        if (Math.abs(Date.now() - unittime) > this.TIME_EXPRIED) {
            return res.status(409).json({
                code: 409,
                status: "error",
                message: "AUTHEN_SERVER_FAIL"
            });
        }
        const secretData = md5(unittime + this.configService.jwtSecret);
        if (secretData != secret) {
            return res.status(409).json({
                code: 409,
                status: "error",
                message: "AUTHEN_SERVER_FAIL"
            });
        }
        next();
    }
};
ValidationRequestServer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigServer])
], ValidationRequestServer);
exports.ValidationRequestServer = ValidationRequestServer;
//# sourceMappingURL=check.middlware.js.map