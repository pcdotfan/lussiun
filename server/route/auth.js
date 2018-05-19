"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
const ArticlesController_1 = require("../controller/ArticlesController");
/**
 * All application routes.
 */
exports.default = [
    {
        path: '/register',
        method: 'post',
        action: UserController_1.register
    },
    {
        path: '/auth/login',
        method: 'post',
        action: UserController_1.login
    },
    {
        path: '/auth/user',
        method: 'get',
        action: UserController_1.user
    },
    {
        path: '/auth/user/basicinfo',
        method: 'get',
        action: UserController_1.userBasicInfo
    },
    {
        path: '/auth/logout',
        method: 'post',
        action: UserController_1.logout
    },
    {
        path: '/auth/user/changepassword',
        method: 'post',
        action: UserController_1.changePassword
    },
    {
        path: '/auth/mockdata',
        method: 'get',
        action: ArticlesController_1.mockData
    }
];
