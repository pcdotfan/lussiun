"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
/**
 * All application routes.
 */
exports.default = [
    {
        path: '/user/update',
        method: 'post',
        action: UserController_1.update
    }
];
