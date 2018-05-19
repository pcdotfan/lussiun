"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriesController_1 = require("../controller/admin/CategoriesController");
/**
 * All application routes.
 */
exports.default = [
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
        path: '/category/destroy',
        method: 'post',
        action: CategoriesController_1.destroy
    }
];
