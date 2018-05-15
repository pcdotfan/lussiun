"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
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
        path: '/login',
        method: 'post',
        action: UserController_1.login
    },
    {
        path: '/auth/user',
        method: 'get',
        action: UserController_1.user
    },
    {
        path: '/logout',
        method: 'post',
        action: UserController_1.logout
    },
    {
        path: '/auth/user/changepassword',
        method: 'post',
        action: UserController_1.changePassword
    }
];
