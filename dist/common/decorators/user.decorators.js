"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../database/user.model");
exports.UserInfo = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=user.decorators.js.map