"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriesController_1 = require("../controller/admin/CategoriesController");
/**
 * All application routes.
 */
exports.default = [
    {
        path: '/categories/store',
        method: 'post',
        action: CategoriesController_1.store
    },
    {
        path: '/categories',
        method: 'get',
        action: CategoriesController_1.index
    },
    {
        path: '/categories/:id',
        method: 'get',
        action: CategoriesController_1.show
    },
    {
        path: '/categories/destroy',
        method: 'post',
        action: CategoriesController_1.destroy
    }
];
