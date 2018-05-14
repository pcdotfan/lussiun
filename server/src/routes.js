"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./controller/UserController");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: '/api/register',
        method: 'post',
        action: UserController_1.register
    },
    {
        path: '/api/login',
        method: 'post',
        action: UserController_1.login
    }
];
