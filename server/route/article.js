"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArticlesController_1 = require("../controller/admin/ArticlesController");
/**
 * All application routes.
 */
exports.default = [
    {
        path: '/articles/index',
        method: 'get',
        action: ArticlesController_1.index
    },
    {
        path: '/articles/test',
        method: 'get',
        action: ArticlesController_1.test
    }
];
