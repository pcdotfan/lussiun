"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArticlesController_1 = require("../controller/admin/ArticlesController");
/**
 * All application routes.
 */
exports.default = [
    {
        path: '/articles/',
        method: 'get',
        action: ArticlesController_1.index
    },
    {
        path: '/articles/:id',
        method: 'get',
        action: ArticlesController_1.show
    }
];
