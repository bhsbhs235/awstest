"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../model/user");
class UserService {
    async create(user) {
        let u = new user_1.UserModel(user);
        return await u.save();
    }
    async read(email) {
        const userData = await user_1.UserModel.findOne({ email: email });
        return userData;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map