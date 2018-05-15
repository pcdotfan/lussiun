"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./controller/UserController");
const CategoriesController_1 = require("./controller/CategoriesController");
/**
 * All application routes.
 */
exports.AppRoutes = [
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
        path: '/user',
        method: 'get',
        action: UserController_1.user
    },
    {
        path: '/user/update',
        method: 'post',
        action: UserController_1.update
    },
    {
        path: '/user/basicinfo',
        method: 'get',
        action: UserController_1.userBasicInfo
    },
    {
        path: '/logout',
        method: 'post',
        action: UserController_1.logout
    },
    {
        path: '/category/store',
        method: 'post',
        action: CategoriesController_1.store
    },
    {
        path: '/category/index',
        method: 'get',
        action: CategoriesController_1.index
    },
    {
        path: '/user/changepassword',
        method: 'post',
        action: UserController_1.changePassword
    },
    {
        path: '/category/destroy',
        method: 'post',
        action: CategoriesController_1.destroy
    }
];
