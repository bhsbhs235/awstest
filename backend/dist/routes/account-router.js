"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_asyncify_1 = __importDefault(require("express-asyncify"));
const bcryptjs_1 = require("bcryptjs"); //암호를 암호화, 비교할 수 있는 모듈.
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization_1 = require("../authorization");
const user_service_1 = require("../services/user-service");
//라우터에서 비동기 함수를 사용할 수 있게 한다.
const router = (0, express_asyncify_1.default)(express_1.default.Router());
//유저 정보 요청.
router.use('/profile', authorization_1.verifyToken);
router.get('/profile', async (request, response) => {
    const userService = new user_service_1.UserService();
    try {
        let email = response.locals['email'];
        const user = await userService.read(email);
        if (!user) {
            //해당 유저 없음.
            response.status(400).send('user not exist');
            return;
        }
        response.status(200).send({ name: user.name });
    }
    catch (err) {
        response.status(400).send('user error');
    }
});
//유저 로그인 요청.
router.post('/login', async (request, response) => {
    const userService = new user_service_1.UserService();
    try {
        let email = request.body.email;
        let password = request.body.password;
        const user = await userService.read(email);
        if (!user) {
            //해당 이메일 주소 없음.
            response.status(400).send('email not exist');
            return;
        }
        const result = await (0, bcryptjs_1.compare)(password, user.password);
        if (!result) {
            //비밀번호 불일치.
            response.status(400).send('password incorrect');
            return;
        }
        //유저 정보를 가지고 토큰을 만들어낸다.
        const token = jsonwebtoken_1.default.sign({
            email: email,
            adminlevel: user.adminlevel,
        }, process.env.SECRET_KEY || 'secret_key', {
            expiresIn: '600m'
        });
        response.json({
            name: user.name,
            token: token,
        });
    }
    catch (err) {
        response.status(400).send('login error');
    }
});
//유저 가입 요청.
router.post('/register', async (request, response) => {
    const userService = new user_service_1.UserService();
    let user = request.body;
    //유저의 암호를 해쉬화한다.
    user.password = await (0, bcryptjs_1.hash)(user.password, 5);
    try {
        const data = await userService.create(user);
        if (data) {
            response.status(201).send('success');
        }
        else {
            response.status(400).send('register error');
        }
    }
    catch (err) {
        response.status(400).send('register error');
    }
});
module.exports = router;
//# sourceMappingURL=account-router.js.map