"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./route/auth");
const user_1 = require("./route/user");
const category_1 = require("./route/category");
const article_1 = require("./route/article");
/**
 * All application routes.
 */
const routes = [];
exports.AppRoutes = routes.concat(auth_1.default, category_1.default, user_1.default, article_1.default);
