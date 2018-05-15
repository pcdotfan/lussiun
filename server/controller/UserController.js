"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entity/User");
const bcrypt = require('bcrypt');
function get(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = context.request; // 拿到传入的参数
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        try {
            if (!body.id) {
                context.status = 400;
                context.body = { error: `无效的传入参数` };
                return;
            }
            let userExisted = yield userRepository.findOne({
                id: body.id
            }); // 同步处理
            if (userExisted) {
                context.status = 200;
                context.body = { userExisted };
            }
            else {
                context.status = 406;
                context.body = { message: '无效用户' };
            }
        }
        catch (error) {
            context.status = 500;
            context.body = { error: error };
        }
    });
}
exports.get = get;
function update(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = context.request; // 拿到传入的参数
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        try {
            if (!body.id) {
                context.status = 400;
                context.body = { error: `无效的传入参数` };
                return;
            }
            let userExisted = yield userRepository.findOne({
                id: body.id
            }); // 同步处理
            if (userExisted) {
                userExisted = Object.assign(userExisted, body);
                yield userRepository.save(userExisted);
                context.status = 200;
                context.body = { message: '更改成功' };
            }
            else {
                context.status = 406;
                context.body = { message: '无效用户' };
            }
        }
        catch (error) {
            context.status = 500;
            context.body = { error: error };
        }
    });
}
exports.update = update;
function register(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = context.request; // 拿到传入的参数
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        try {
            if (!body.username || !body.password || !body.email) {
                context.status = 400;
                context.body = { error: `无效的传入参数` };
                return;
            }
            body.password = yield bcrypt.hash(body.password, 5);
            const userExisted = yield userRepository.findOne({ username: body.username }); // 同步处理
            if (!userExisted) {
                const newUser = userRepository.create(body);
                yield userRepository.save(newUser);
                context.status = 200;
                context.body = { message: '注册成功', newUser };
            }
            else {
                context.status = 406;
                context.body = { message: '用户名已经存在' };
            }
        }
        catch (error) {
            context.status = 500;
            context.body = { error: error };
        }
    });
}
exports.register = register;
function login(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = 'vy1C%iZ8W+`]X9#vQl}:/78ul:,CjXcV5{%b-W|_Nty$tGbDnaRGRpJ]e_MkR+O0';
        const { body } = context.request; // 拿到传入的参数
        const userRepository = typeorm_1.getManager().getRepository(User_1.User);
        try {
            const userExisted = yield userRepository.findOne({ username: body.username });
            if (userExisted && (yield bcrypt.compare(body.password, userExisted.password))) {
                const token = jsonwebtoken_1.sign({ id: userExisted.id }, secret, { expiresIn: '1h' });
                context.status = 200;
                context.body = { token };
            }
            else {
                context.status = 401;
                context.body = { message: '用户名或密码错误' };
            }
        }
        catch (error) {
            console.log(error);
            context.throw(500);
        }
    });
}
exports.login = login;
function logout(context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            context.status = 200;
            context.body = {
                status: 'OK'
            };
        }
        catch (error) {
            context.throw(500);
        }
    });
}
exports.logout = logout;
function user(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.body = { user: { id: context.state.user.id } };
    });
}
exports.user = user;
function userBasicInfo(context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.body = { user: { id: context.state.user.id } };
    });
}
exports.userBasicInfo = userBasicInfo;
